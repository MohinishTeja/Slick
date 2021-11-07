 /* eslint-disable */
 /* eslint-disable */
 (function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
      module.exports = factory();
    else if (typeof define === 'function' && define.amd)
      define("IPFS", [], factory);
    else if (typeof exports === 'object')
      exports["IPFS"] = factory();
    else
      root["IPFS"] = factory();
  })(this, function() {
    return /******/ (function(modules) { // webpackBootstrap
      /******/ // The module cache
      /******/
      var installedModules = {};
      /******/
      /******/ // The require function
      /******/
      function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/
        if (installedModules[moduleId])
          /******/
          return installedModules[moduleId].exports;
        /******/
        /******/ // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,
          /******/
          l: false,
          /******/
          exports: {}
          /******/
        };
        /******/
        /******/ // Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/
        module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/
        return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/
      __webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/
      __webpack_require__.c = installedModules;
      /******/
      /******/ // identity function for calling harmory imports with the correct context
      /******/
      __webpack_require__.i = function(value) {
        return value;
      };
      /******/
      /******/ // define getter function for harmory exports
      /******/
      __webpack_require__.d = function(exports, name, getter) {
        /******/
        Object.defineProperty(exports, name, {
          /******/
          configurable: false,
          /******/
          enumerable: true,
          /******/
          get: getter
          /******/
        });
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/
      __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/
      __webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/
      return __webpack_require__(__webpack_require__.s = 1);
      /******/
    })
    /************************************************************************/
    /******/
    ([
      /* 0 */
      /***/
      function(module, exports) {
 
        "use strict";
        "use strict";
 
        var XMLHttpRequest = window.XMLHttpRequest; // eslint-disable-line
 
        module.exports = XMLHttpRequest;
 
        /***/
      },
      /* 1 */
      /***/
      function(module, exports, __webpack_require__) {
 
        "use strict";
        'use strict';
 
        var XMLHttpRequest = __webpack_require__(0);
 
        module.exports = IPFS;
 
        /**
         * The constructor object
         * @param {Object} `provider` the provider object
         * @return {Object} `ipfs` returns an IPFS instance
         * @throws if the `new` flag is not used
         */
        function IPFS(provider) {
          if (!(this instanceof IPFS)) {
            throw new Error('[ipfs-mini] IPFS instance must be instantiated with "new" flag (e.g. var ipfs = new IPFS("http://localhost:8545");).');
          }
 
          var self = this;
          self.setProvider(provider || {});
        }
 
        /**
         * Sets the provider of the IPFS instance
         * @param {Object} `provider` the provider object
         * @throws if the provider object is not an object
         */
        IPFS.prototype.setProvider = function setProvider(provider) {
          if (typeof provider !== 'object') {
            throw new Error('[ifpsjs] provider must be type Object, got \'' + typeof provider + '\'.');
          }
          var self = this;
          var data = self.provider = Object.assign({
            host: '127.0.0.1',
            pinning: true,
            port: '5001',
            protocol: 'http',
            base: '/api/v0'
          }, provider || {});
          self.requestBase = String(data.protocol + '://' + data.host + ':' + data.port + data.base);
        };
 
        /**
         * Sends an async data packet to an IPFS node
         * @param {Object} `opts` the options object
         * @param {Function} `cb` the provider callback
         * @callback returns an error if any, or the data from IPFS
         */
        IPFS.prototype.sendAsync = function sendAsync(opts, cb) {
          var self = this;
          var request = new XMLHttpRequest(); // eslint-disable-line
          var options = opts || {};
          var callback = cb || function emptyCallback() {};
 
          request.onreadystatechange = function() {
            if (request.readyState === 4 && request.timeout !== 1) {
              if (request.status !== 200) {
                callback(new Error('[ipfs-mini] status ' + request.status + ': ' + request.responseText), null);
              } else {
                try {
                  callback(null, options.jsonParse ? JSON.parse(request.responseText) : request.responseText);
                } catch (jsonError) {
                  callback(new Error('[ipfs-mini] while parsing data: \'' + String(request.responseText) + '\', error: ' + String(jsonError) + ' with provider: \'' + self.requestBase + '\'', null));
                }
              }
            }
          };
 
          var pinningURI = self.provider.pinning && opts.uri === '/add' ? '?pin=true' : '';
 
          if (options.payload) {
            request.open('POST', '' + self.requestBase + opts.uri + pinningURI);
          } else {
            request.open('GET', '' + self.requestBase + opts.uri + pinningURI);
          }
 
          if (options.accept) {
            request.setRequestHeader('accept', options.accept);
          }
 
          if (options.payload && options.boundary) {
            request.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + options.boundary);
            request.send(options.payload);
          } else {
            request.send();
          }
        };
 
        /**
         * creates a boundary that isn't part of the payload
         */
        function createBoundary(data) {
          while (true) {
            var boundary = '----IPFSMini' + Math.random() * 100000 + '.' + Math.random() * 100000;
            if (data.indexOf(boundary) === -1) {
              return boundary;
            }
          }
        }
 
        /**
         * Add an string or buffer to IPFS
         * @param {String|Buffer} `input` a single string or buffer
         * @param {Function} `callback` a callback, with (error, ipfsHash String)
         * @callback {String} `ipfsHash` returns an IPFS hash string
         */
        IPFS.prototype.add = function addData(input, callback) {
          var data = typeof input === 'object' && input.isBuffer ? input.toString('binary') : input;
          var boundary = createBoundary(data);
          var payload = '--' + boundary + '\r\nContent-Disposition: form-data; name="path"\r\nContent-Type: application/octet-stream\r\n\r\n' + data + '\r\n--' + boundary + '--';
 
          var addCallback = function addCallback(err, result) {
            return callback(err, !err ? result.Hash : null);
          };
          this.sendAsync({
            jsonParse: true,
            accept: 'application/json',
            uri: '/add',
            payload: payload,
            boundary: boundary
          }, addCallback);
        };
 
        /**
         * Add an JSON object to IPFS
         * @param {Object} `jsonData` a single JSON object
         * @param {Function} `callback` a callback, with (error, ipfsHash String)
         * @callback {String} `ipfsHash` returns an IPFS hash string
         */
        IPFS.prototype.addJSON = function addJson(jsonData, callback) {
          var self = this;
          self.add(JSON.stringify(jsonData), callback);
        };
 
        /**
         * Get an object stat `/object/stat` for an IPFS hash
         * @param {String} `ipfsHash` a single IPFS hash String
         * @param {Function} `callback` a callback, with (error, stats Object)
         * @callback {Object} `stats` returns the stats object for that IPFS hash
         */
        IPFS.prototype.stat = function cat(ipfsHash, callback) {
          var self = this;
          self.sendAsync({
            jsonParse: true,
            uri: '/object/stat/' + ipfsHash
          }, callback);
        };
 
        /**
         * Get the data from an IPFS hash
         * @param {String} `ipfsHash` a single IPFS hash String
         * @param {Function} `callback` a callback, with (error, stats Object)
         * @callback {String} `data` returns the output data
         */
        IPFS.prototype.cat = function cat(ipfsHash, callback) {
          var self = this;
          self.sendAsync({
            uri: '/cat/' + ipfsHash
          }, callback);
        };
 
        /**
         * Get the data from an IPFS hash that is a JSON object
         * @param {String} `ipfsHash` a single IPFS hash String
         * @param {Function} `callback` a callback, with (error, json Object)
         * @callback {Object} `data` returns the output data JSON object
         */
        IPFS.prototype.catJSON = function cat(ipfsHash, callback) {
          var self = this;
          self.cat(ipfsHash, function(jsonError, jsonResult) {
            // eslint-disable-line
            if (jsonError) {
              return callback(jsonError, null);
            }
 
            try {
              callback(null, JSON.parse(jsonResult));
            } catch (jsonParseError) {
              callback(jsonParseError, null);
            }
          });
        };
 
        /***/
      }
      /******/
    ])
  });;
  //# sourceMappingURL=ipfs-mini.js.map
 
 
  function base64ArrayBuffer(arrayBuffer) {
    let base64 = '';
    const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
 
    const bytes = new Uint8Array(arrayBuffer);
    const byteLength = bytes.byteLength;
    const byteRemainder = byteLength % 3;
    const mainLength = byteLength - byteRemainder;
 
    let a;
    let b;
    let c;
    let d;
    let chunk;
 
    // Main loop deals with bytes in chunks of 3
    for (let i = 0; i < mainLength; i += 3) {
      // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
 
      // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
      d = chunk & 63; // 63       = 2^6 - 1
 
      // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }
 
    // Deal with the remaining bytes and padding
    if (byteRemainder === 1) {
      chunk = bytes[mainLength];
 
      a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
 
      // Set the 4 least significant bits to zero
      b = (chunk & 3) << 4; // 3   = 2^2 - 1
 
      base64 += `${encodings[a]}${encodings[b]}==`;
    } else if (byteRemainder === 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
 
      a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
 
      // Set the 2 least significant bits to zero
      c = (chunk & 15) << 2; // 15    = 2^4 - 1
 
      base64 += `${encodings[a]}${encodings[b]}${encodings[c]}=`;
    }
 
    return base64;
  }
 
  function initialize() {
    return new IPFS({
      host: 'ipfs.infura.io',
      protocol: 'https'
    });
  }
 
  const ipfs = initialize();
 
  function upload() {
    const reader = new FileReader();
    reader.onloadend = function() {
 
 
      const photo = document.getElementById("photo");
      const fileType = photo.files[0].type;
 
      const prefix = `data:${fileType};base64,`;
      const buf = buffer.Buffer(reader.result);
      const base64buf = prefix + base64ArrayBuffer(buf);
      // Convert data into buffer
      ipfs.add(base64buf, (err, result) => { // Upload buffer to IPFS
        if (err) {
          console.error(err)
          return
        }
 
        let url = `https://ipfs.io/ipfs/${result}`
        let hashBtn = document.getElementById("type111");
        hashBtn.value = url;
        console.log(`Url --> ${url}`)
      })
    }
    const photo = document.getElementById("photo");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
  }
 
 
  function download(hash,imageElement) {
      let url=hash;
      console.log(url);

    /*let hashBtn = document.getElementById("hash") || this;*/
    /*let url = hashBtn.innerHTML;*/

    /*let url = "https://ipfs.io/ipfs/QmTxGDtkJdbeiFFZ6Jqu8CfjJ9fKQDAHGr2G7pB7BSoai9";*/
    if (!url) return;
 
 
    const req = new XMLHttpRequest();
    req.responseType = "text/html";
 
    req.onload = function(e) {
      var img = new Image();
      /*img.onload = function onload() {
        document.getElementById("x").appendChild(img);
      };
      */
      imageElement.src = this.response;
    }
 
    req.open('GET', url, true);
    req.send();
  }
 







  var firebaseConfig = {
    apiKey: "AIzaSyB0e91-xnuUQKG0-6yzSw9eQQYl7tKfWOg",
    authDomain: "spygeon-fda23.firebaseapp.com",
    databaseURL: "https://spygeon-fda23.firebaseio.com",
    projectId: "spygeon-fda23",
    storageBucket: "spygeon-fda23.appspot.com",
    messagingSenderId: "330301951588",
    appId: "1:330301951588:web:a238b2942a4e6505095971"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
const database = firebase.firestore();

const postscollection = database.collection('block');


const db = firebase.firestore();


let postCollection = document.querySelector("#posts-collection");
function createPost(hash,info) {
//console.log(address);
    let bodyElement = document.body;
    //The document.createElement() method create html elements specified by tagName
    let mainp = document.createElement('div');
    let bodyp = document.createElement('div');
    
    let mediap = document.createElement('div');
    let mediapl = document.createElement('div');
    let mediab = document.createElement('div');
    let postb = document.createElement('div');
    let btnb = document.createElement('div');


    let imageElementn = document.createElement('img');
    let unamep = document.createElement('p');
    let imageElement = document.createElement('img');
    let likesp = document.createElement('p');
    let captionp = document.createElement('p');
    let buttonb=document.createElement('button');
    let btnElement = document.createElement('a');
  let row=document.getElementById("rows");
  rows.className="rows";


    //The ClassName property gets and sets the value of the class attribute of the spefified element
    mainp.className="main panel panel-default z-depth-4";
    bodyp.className = "panel-body";
    mediap.className = "media";
    mediapl.className = "media-left";
    mediab.className = "media-body";
    postb.id="post";
    imageElement.className = "not";
    imageElementn.className="media-object circle";
    unamep.className="nothing";
    likesp.className = "iconsec";
    captionp.className = "caption";
    buttonb.className="button_submit";
    btnElement.className = "btn";
    
buttonb.innerHTML="Support";
/*
buttonb.addEventListener('click',async function(){
    send(address);
})
*/
    download(hash,imageElement);

/*
if(name=="Spiderman"){
  imageElementn.src="img/spider_prof.jpg"
}

else if(name=="Alex"){
  imageElementn.src="img/alex_prof.jpg"
}

if(name=="Lahari"){
  imageElementn.src="img/lahari_prof.jpg"
}
if(name=="Boult"){
  imageElementn.src="img/boult.jpg"
}
if(name=="Mohinish"){
  imageElementn.src="img/mohinish.jpg"
}
*/

    /*btnElement.setAttribute("href", hash);*/
    /*imageElement.setAttribute("alt", "Image from Unsplash");*/


    unamep.innerText = "Mr Beast";
    captionp.innerHTML=info;
    imageElementn.src="img/mrbeast.jpg";
    row.appendChild(mainp);
    mainp.append(bodyp);
    
    bodyp.append(mediap,postb);
    mediap.append(mediapl,mediab);
    mediapl.append(imageElementn);
    mediab.append(unamep);
    postb.append(imageElement,likesp,captionp,buttonb);

  }

  

function getPosts() {
    db.collection("datreon")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(docs => {
          createPost(
            docs.data().ahash,
            docs.data().ainfo
          );
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  getPosts();
/*

//////////////////////////////////////////////////////////////////
var firebaseConfig = {
    apiKey: "AIzaSyB0e91-xnuUQKG0-6yzSw9eQQYl7tKfWOg",
    authDomain: "spygeon-fda23.firebaseapp.com",
    databaseURL: "https://spygeon-fda23.firebaseio.com",
    projectId: "spygeon-fda23",
    storageBucket: "spygeon-fda23.appspot.com",
    messagingSenderId: "330301951588",
    appId: "1:330301951588:web:a238b2942a4e6505095971"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
const database = firebase.firestore();

const postscollection = database.collection('datreon');


const db = firebase.firestore();


const info = document.getElementById('type');

const link=document.getElementById("type111")

btn1.addEventListener('click', e => {
  e.preventDefault();
  const ID = postscollection.doc();
  ID.set({
    
    ainfo: info.value,
    ahash:link.value
  })
    .then(response => alert("Post Uploaded check feed!"))
    .catch(error => console.error('Error!', error.message))
});

*/


var web3
/*
window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            initPayButton()
            }
        catch (err) {
            $('#status').html('User denied account access', err)
            }
        } 
    else if (window.web3) {
            web3 = new Web3(web3.currentProvider)
            initPayButton()
    }
    else {
        $('#status').html('No Metamask (or other Web3 Provider) installed')
    }
})*/

const address  = '0xb4fae488e7C0c00735Fc062b792B7Da45c023e12';  //rinkeby_old
const address1 = '0x921F95fe57D033408559DEC71772DDe2E95D6488';  //rinkeby
const address2 = '0xD1A9A8ecb4CF084a761fcf2b6670B6229CD5df41';  //matic
const address3 = '0x785ca3057f4319c80a0444f1025e89aFdAE8A150';  //BSC
const address4 = '0x096fF0b21a3523b574C92CC47875a888ff21757a';
const address5 = '0xc8d3130d85107ba57DFBc87B65F5a77087A597EA';
const address6 = '0x999Bac5989ee84997cC8C89fba447aB65d471911'; //patreon matic
const abi =[
	{
		"constant": true,
		"inputs": [],
		"name": "getAddrs",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "numberOfDays",
				"type": "uint256"
			}
		],
		"name": "invest",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	}
]




async function pay2() {

    var web3=new Web3(window.ethereum)

    await window.ethereum.enable()
    

/*
const portis = new Portis('8327b253-e459-44fa-94bd-c9cc457bf5fb', 'rinkeby');
const web3 = new Web3(portis.provider);
*/
    contract = new web3.eth.Contract(abi,address6)

    /*
    var paymentAddress = document.getElementById("address").value;
    var weight = document.getElementById("weight").value;
    var category = document.getElementById("category").value;
*/
    const accounts = await web3.eth.getAccounts()

    
    var x =await contract.methods.getAddrs().call({
        from:accounts[0]

    }) 
    console.log(x);
    if(x==true){
        
      document.getElementById("locked").style.display="";
      document.getElementById("unlocked").style.display="block";
    }
    else if(x==false){
      alert("No active subscription. Please Join us to unlock the contnet.");
      document.getElementById("locked").style.display="block";
      document.getElementById("unlocked").style.display="";
    }

            
} 


document.getElementById("locked").style.display="block";
document.getElementById("unlocked").style.display="";