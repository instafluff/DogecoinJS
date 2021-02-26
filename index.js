// DogecoinJS v@VERSION
var fetch = require( "node-fetch" );
var NodeSocket = require( "ws" );

let listeners = {};
let ws = null;
let wsCommandQueue = [];
async function getSocket() {
	return new Promise( ( res ) => {
		if( typeof window !== "undefined" ) {
			ws = new WebSocket( "wss://ws.dogechain.info/inv" );
		}
		else {
			ws = new NodeSocket( "wss://ws.dogechain.info/inv" );
		}

		const heartbeatInterval = 1000 * 60; //ms between PING's
		let heartbeatHandle;
		ws.onopen = function( event ) {
			heartbeatHandle = setInterval( () => {
				ws.send( JSON.stringify( { op: "ping_block" } ) );
			}, heartbeatInterval );
			wsCommandQueue.forEach( c => {
				ws.send( JSON.stringify( c ) );
			});
	    };

		ws.onerror = function( error ) {
			console.error( error );
	    };

		ws.onmessage = function( event ) {
	        message = JSON.parse( event.data );
			// console.log( message );
			switch( message.op ) {
				case "status":
					break;
				case "utx":
					// Unconfirmed transaction
					Object.keys( listeners ).forEach( addr => {
						if( listeners[ addr ].listen ) {
							// Check inputs
							message.x.inputs.forEach( input => {
								if( input.prev_out && input.prev_out.addr === addr ) {
									// This wallet is sending
									let amount = input.prev_out.value / 100000000;
									listeners[ addr ].listen( addr, -amount, {
										id: message.x.hash,
										data: message.x
									} );
								}
							});
							// Check outputs
							message.x.outputs.forEach( output => {
								if( output.addr === addr ) {
									// This wallet is receiving
									let amount = output.value / 100000000;
									listeners[ addr ].listen( addr, amount, {
										id: message.x.hash,
										data: message.x
									} );
								}
							});
						}
					});
					break;
			}
	    };
	    ws.onclose = function() {
			clearInterval( heartbeatHandle );
			console.log( "closed" );
	    };

		res( ws );
	});
}

var dogecoinJS = {
	isDebug: false,
	version: function() {
		return "@VERSION";
	},
	lookup: async function( address, handler = null ) {
		let promise = fetch( `https://my.dogechain.info/api/v2/get_address_balance/DOGE/${address}` ).then( r => r.json() );
		if( handler ) {
			handler( await promise );
		}
		else {
			return promise;
		}
	},
	qrcode: async function( address, handler = null ) {
		let promise = fetch( `https://dogechain.info/api/v1/address/qrcode/${address}` ).then( r => r.blob() );
		if( handler ) {
			handler( await promise );
		}
		else {
			return promise;
		}
	},
	listen: async function( address, handler ) {
		let socket = ws || await getSocket();
		let addresses = [ address ];
		if( Array.isArray( address ) ) {
			addresses = address;
		}
		addresses.forEach( addr => {
			listeners[ addr ] = listeners[ addr ] || {};
			listeners[ addr ].listen = handler;
			if( !socket.readyState ) {
				wsCommandQueue.push( {
					op: "addr_sub",
					addr: addr
				});
			}
			else {
				socket.send( JSON.stringify( {
					op: "addr_sub",
					addr: addr
				} ) );
			}
		});
	},
};

// Expose everything, for browser and Node..
if( typeof module !== "undefined" && module.exports ) {
	module.exports = dogecoinJS;
}

if( typeof window !== "undefined" ) {
	window.Dogecoin = dogecoinJS;
}
