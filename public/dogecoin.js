(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// DogecoinJS v0.1.1
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
		return "0.1.1";
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

},{"node-fetch":2,"ws":3}],2:[function(require,module,exports){
(function (global){(function (){
"use strict";

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
if (global.fetch) {
	exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
'use strict';

module.exports = function () {
  throw new Error(
    'ws does not work in the browser. Browser clients must use the native ' +
      'WebSocket object'
  );
};

},{}]},{},[1]);
