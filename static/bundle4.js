/*
import Portis from './@portis/web3';
import Web3 from '/web3';
//import other necessary web3 libraries
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
const address4 = '0x096fF0b21a3523b574C92CC47875a888ff21757a';  //BSC_new
const address5 = '0xc8d3130d85107ba57DFBc87B65F5a77087A597EA';  //patreon rinkeby
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

//contract = new web3.eth.contract(abi,address)
function pay1(){

	jQuery(document).ready(function($){
		//open popup
		$('.btn-signin').on('click', function(event){
			event.preventDefault();
			$('.cd-popup').addClass('is-visible');
		});
		
		//close popup
		$('.cd-popup').on('click', function(event){
			if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
				event.preventDefault();
				$(this).removeClass('is-visible');
			}
		});
		//close popup when clicking the esc keyboard button
		$(document).keyup(function(event){
			if(event.which=='27'){
				$('.cd-popup').removeClass('is-visible');
			}
		});
	});

	
}
async function pay() {

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

        
        contract.methods.invest(1).send({
            from:accounts[0],
            value: 10000000000000000

        }) 


                
} 




async function pay1() {

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

    
    contract.methods.invest(30).send({
        from:accounts[0],
        value: 300000000000000000

    }) 


            
} 


async function pay2() {

    var web3=new Web3(window.ethereum)

    await window.ethereum.enable()
    

/*
const portis = new Portis('8327b253-e459-44fa-94bd-c9cc457bf5fb', 'rinkeby');
const web3 = new Web3(portis.provider);
*/
    contract = new web3.eth.Contract(abi,address6)

    /*
    not needed now
    var paymentAddress = document.getElementById("address").value;
    var weight = document.getElementById("weight").value;
    var category = document.getElementById("category").value;
*/
    const accounts = await web3.eth.getAccounts()

    
    contract.methods.invest(365).send({
        from:accounts[0],
        value: 3650000000000000000

    }) 


            
} 

