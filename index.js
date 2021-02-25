// DogecoinJS v@VERSION
var fetch = require( "node-fetch" );
// var NodeSocket = require( "ws" );
//
// async function pubsubConnect( channel, password ) {
// 	const heartbeatInterval = 1000 * 60; //ms between PING's
// 	const reconnectInterval = 1000 * 3; //ms to wait before reconnect
// 	let heartbeatHandle;
//
// 	password = password.replace( "oauth:", "" );
//
// 	let validation = await fetch( "https://id.twitch.tv/oauth2/validate", {
// 		headers: {
// 			"Authorization": `OAuth ${password}`
// 		}
// 	}).then( r => r.json() );
//
// 	if( !validation.client_id || !validation.scopes.includes( "channel:read:redemptions" ) || !validation.scopes.includes( "user:read:email" ) ) {
// 		console.error( "Invalid Password or Permission Scopes (channel:read:redemptions, user:read:email)" );
// 		return;
// 	}
//
// 	let userInfo = await fetch( "https://api.twitch.tv/helix/users?login=" + channel, {
// 		headers: {
// 			"Client-ID": validation.client_id,
// 			"Authorization": `Bearer ${password}`
// 		}
// 	}).then( r => r.json() );
// 	let channelId = userInfo.data[ 0 ].id;
//
// 	let ws;
// 	if( typeof window !== "undefined" ) {
// 		ws = new WebSocket( "wss://pubsub-edge.twitch.tv" );
// 	}
// 	else {
// 		ws = new NodeSocket( "wss://pubsub-edge.twitch.tv" );
// 	}
// 	ws.onopen = function( event ) {
// 		ws.send( JSON.stringify( { type: 'PING' } ) );
//         heartbeatHandle = setInterval( () => {
// 			ws.send( JSON.stringify( { type: 'PING' } ) );
// 		}, heartbeatInterval );
//
// 		// Listen to channel points topic
// 		let message = {
// 	        type: "LISTEN",
// 	        nonce: nonce( 15 ),
// 	        data: {
// 	            topics: [ `channel-points-channel-v1.${channelId}` ],
// 	            auth_token: password
// 	        }
// 	    };
// 		ws.send( JSON.stringify( message ) );
//     };
//     ws.onerror = function( error ) {
// 		console.error( error );
//     };
//     ws.onmessage = function( event ) {
//         message = JSON.parse( event.data );
// 		switch( message.type ) {
// 			case "RESPONSE":
// 				if( message.error === "ERR_BADAUTH" ) {
// 					console.error( "PubSub Authentication Failure" );
// 				}
// 				break;
// 			case "RECONNECT":
// 	            setTimeout( () => {
// 					pubsubConnect( channel, password )
// 				}, reconnectInterval );
// 				break;
// 			case "MESSAGE":
// 				if( message.data.topic.startsWith( "channel-points-channel" ) ) {
// 					let messageData = JSON.parse( message.data.message );
// 					if( messageData.type === "reward-redeemed" ) {
// 						let redemption = messageData.data.redemption;
// 						// console.log( redemption );
// 						var extra = {
// 				          channelId: redemption.channel_id,
// 				          reward: redemption.reward,
// 				          rewardFulfilled: redemption.status === "FULFILLED",
// 				          userId: redemption.user.id,
// 				          username: redemption.user.login,
// 				          displayName: redemption.user.display_name,
// 				          customRewardId: redemption.id,
// 				          timestamp: redemption.redeemed_at,
// 				        };
// 						comfyJS.onReward(
// 							redemption.user.display_name || redemption.user.login,
// 							redemption.reward.title,
// 							redemption.reward.cost,
//                             redemption.user_input || "",
// 							extra
// 						);
// 					}
// 					// console.log( messageData );
// 				}
// 				break;
// 		}
//     };
//     ws.onclose = function() {
//         clearInterval( heartbeatHandle );
//         setTimeout( () => {
// 			pubsubConnect( channel, password )
// 		}, reconnectInterval );
//     };
// }



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
};

// Expose everything, for browser and Node..
if( typeof module !== "undefined" && module.exports ) {
	module.exports = dogecoinJS;
}

if( typeof window !== "undefined" ) {
	window.Dogecoin = dogecoinJS;
}
