var Dogecoin = require( "./index" );
( async () => {
	// Lookup a wallet
	Dogecoin.lookup( "DPsvmxqaJV15nqVnT9BiwYskVmQLozRKht", ( wallet ) => {
		console.log( wallet );
	} );

	// Lookup a wallet with async/await
	let wallet = await Dogecoin.lookup( "DPsvmxqaJV15nqVnT9BiwYskVmQLozRKht" );
	console.log( wallet );

	// Get a wallet QR Code
	Dogecoin.qrcode( "DPsvmxqaJV15nqVnT9BiwYskVmQLozRKht", ( data ) => {
		console.log( "got qr code!", data );
	});

	// Get a wallet QR Code with async/await
	let qrcode = await DogeCoin.qrcode( "DPsvmxqaJV15nqVnT9BiwYskVmQLozRKht" );
})();
