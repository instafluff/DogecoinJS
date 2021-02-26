# DogecoinJS
![npm](https://img.shields.io/npm/v/dogecoinjs?style=flat-square) ![GitHub](https://img.shields.io/github/license/instafluff/dogecoinjs?style=flat-square) [![](https://data.jsdelivr.com/v1/package/npm/dogecoinjs/badge)](https://www.jsdelivr.com/package/npm/dogecoinjs)

**DogecoinJS** The Goodest Way to get Dogecoin info and events for the Web and NodeJS!

# DogecoinJS
We built this Dogecoin javascript library live on Twitch for the Comfy Corner!

## How To Use ##

#### Node
1. Install `dogecoinjs`
```bash
npm install dogecoinjs --save
```

2. Use DogecoinJS
```javascript
var Dogecoin = require( "dogecoinjs" );
Dogecoin.lookup( "DPsvmxqaJV15nqVnT9BiwYskVmQLozRKht", ( wallet ) => {
  console.log( wallet );
} );
Dogecoin.listen( "DPsvmxqaJV15nqVnT9BiwYskVmQLozRKht", ( address, amount, extra ) => {
  console.log( "Wallet balance update!", address, amount, extra );
});
```

3. More code examples in [example.js](example.js)

#### Browser
1. Download and add `dogecoinjs` from the `public` folder or include from the JSDelivr CDN:
```javascript
<script src="dogecoin.min.js"></script>
```
OR
```javascript
<script src="https://cdn.jsdelivr.net/npm/dogecoinjs@latest/public/dogecoin.min.js"></script>
```

2. Use DogecoinJS
```html
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/dogecoinjs@latest/public/dogecoin.min.js"></script>
  </head>
  <body>
    <script type="text/javascript">
      Dogecoin.lookup( "DPsvmxqaJV15nqVnT9BiwYskVmQLozRKht", ( wallet ) => {
        console.log( wallet );
      } );
      Dogecoin.listen( "DPsvmxqaJV15nqVnT9BiwYskVmQLozRKht", ( address, amount, extra ) => {
        console.log( "Wallet balance update!", address, amount, extra );
      });
    </script>
  </body>
</html>
```

3. More code examples in [example.html](public/example.html)

## Looking Up Dogecoin Wallets

You can lookup the balance of any dogecoin wallet by passing an address and a handler:
```javascript
Dogecoin.lookup( "DPsvmxqaJV15nqVnT9BiwYskVmQLozRKht", ( wallet ) => {
  console.log( wallet );
} );
```

Or by using async/await and getting the wallet info returned:
```javascript
let wallet = await Dogecoin.lookup( "DPsvmxqaJV15nqVnT9BiwYskVmQLozRKht" );
console.log( wallet );
```

## Getting a Dogecoin Wallet QR Code

Get the QR Code image of any dogecoin wallet by passing an address and a handler:
```javascript
Dogecoin.qrcode( "DPsvmxqaJV15nqVnT9BiwYskVmQLozRKht", ( data ) => {
  var image = document.getElementById( "qrcode" );
  image.src = URL.createObjectURL( data );
} );
```

Or by using async/await and getting the wallet QR code returned:
```javascript
let qrcode = await Dogecoin.qrcode( "DPsvmxqaJV15nqVnT9BiwYskVmQLozRKht" );
var image = document.getElementById( "qrcode" );
image.src = URL.createObjectURL( qrcode );
```

## Listening to a Dogecoin Wallet

Get notified of changes to a wallet balance in real-time:
```javascript
Dogecoin.listen( "DPsvmxqaJV15nqVnT9BiwYskVmQLozRKht", ( address, amount, extra ) => {
  console.log( "Wallet balance update!", address, amount, extra );
});
```

## Instafluff ##
> *Like these projects? The best way to support my open-source projects is by becoming a Comfy Sponsor on GitHub!*

> https://github.com/sponsors/instafluff

> *Come and hang out with us at the Comfiest Corner on Twitch!*

> https://twitch.tv/instafluff

> *Such coin. Much thanks!*

> DPsvmxqaJV15nqVnT9BiwYskVmQLozRKht

## Credits ##
Dogecoin blockchain data is available thanks to [DogeChain](https://dogechain.info/)!

Thank you to everyone who joined in during the creation of this project!

**LilyHazel, Instafriend, Instafluff, DevMerlin, aries4174599, That_MS_Gamer, generalgooglelos, aRandomTim, simrosie4u, Eclipse_Arc, Floydan, m_a_t_t_y___, mikenatsu24, venusslipper, theArtifacts, YourFriendTyler33, MisigaSan, ShadowNeverSeen, aisu_kurimu, durian_gray, d3m1g0d__, KanawanagasakiYoko, Masaki_tty, N3m1sys, DFluxk, nolanpfeiffersaiyan, iknowandidrinkthings, mrpotatodice, Shpoopdy, RafaelPaul, saramara79, lilsafbig, DutchGamer46, AnnaCodes, RiccaRomano, stabbykirby, JupiterZky, allie__, sparky_pugwash, Here_for_the_life_lessons, sethorizer, GanaXE, DvDty, GhosT_TanK83, Gawhisper, Wietlol, MerlinLeWizard, JamesMontemagno, Alca, one1lion, pathaan, hugthedumdum, TofuLock, definiteoptimist, Roxkstar74, Taugeshtu, Mheetu, ricardosexyboyy06, InSanityParty, nopogo_tv, eno_dev, AntiPixelated, hadouken11, seasidesandies, calhartill, NamasteGeek, Alphena, ShiDotMoe, Loganshogun, FuriousFur, Froggo1214, Hot_Zoomy, youcantescapefromme2, Ellenary, TheDankOreo, InvaderWaffles, churzaki, Longttran, DreamGardenPanda, Yuukez, holloway87**
