import {createWalletClient,custom,createPublicClient,parseEther,defineChain,formatEther} from "https://esm.sh/viem"
import {contractAddress,coffeeAbi} from  "./constants-js.js"

const connectButton=document.getElementById("connectButton");
const fundButton=document.getElementById("fundButton");
const ethAmountInput=document.getElementById("ethAmount")
const balanceButton=document.getElementById("balanceButton")
const withdrawButton=document.getElementById("withdrawButton")


let walletClient
let publicClient

//链接钱包
async  function connect(){
    

   if (typeof window.ethereum!=="undefined"){
        walletClient= createWalletClient({
          transport: custom(window.ethereum)
        })
        await walletClient.requestAddresses()
        connectButton.innerHTML="connected!"
   }
   else{
        connectButton.innerHTML="please install metamask"
   }
}

//买咖啡
async function fund(){
     const ethAmount =ethAmountInput.value
     console.log(`Funding with${ethAmount}...`)

      if (typeof window.ethereum!=="undefined"){
        walletClient= createWalletClient({
          transport: custom(window.ethereum)
        })
       
        const [connectedAccount]=await walletClient.requestAddresses()
        const currentChain=await getCurrentChain(walletClient)

       publicClient = createPublicClient({
          transport:custom(window.ethereum)
       })
       //console.log(parseEther(ethAmount))
       const {request } = await publicClient.simulateContract({
          address:contractAddress,
          abi:coffeeAbi,
          functionName:"fund",
          account: connectedAccount,              
          chain:currentChain,
          value:parseEther(ethAmount),    //1->10000000000000000000
          
       })
       const hash = await walletClient.writeContract(request)
       console.log(hash)
   }
   else{
        connectButton.innerHTML="please install metamask"
   }
}

//获取余额
async function getbalance(){
     if (typeof window.ethereum!=="undefined"){
        publicClient= createPublicClient({
          transport: custom(window.ethereum)
        })
        await walletClient.requestAddresses()
        const balance =await publicClient.getBalance({
          address:contractAddress
        })
        console.log(formatEther(balance))      //10000000000000000->1

        }
   
}

//提现
async function withdraw(){
     console.log("withdrawing funds...");
     if (typeof window.ethereum!=="undefined"){
          walletClient=createWalletClient({
               transport:custom(window.ethereum),
          });
          const [connectedAccount]=await walletClient.requestAddresses();
          const currentChain=await getCurrentChain(walletClient);
          publicClient=createPublicClient({
               transport:custom(window.ethereum),
          })
          const {request}=await publicClient.simulateContract({
               address:contractAddress,
               abi:coffeeAbi,
               functionName:"withdraw",
               account:connectedAccount,
               chain:currentChain,
          })
          const hash=await walletClient.writeContract(request);
          console.log("Withdrawal transaction hash:", hash);
     }
     else{
          connectButton.innerHTML="please install metamask";
     }
}

//获取chain
async function getCurrentChain(client){
     const chainId=await client.getChainId()
     const currentChain=defineChain({
          id:chainId,
          name:"Custom Chain",
          nativeCurrency:{
               name:"Ether",
               symbol:"ETH",
               decimals:18
          },
          rpcUrls:{
               default:{
                    http:["http://localhost:8545"]
               },
          },
     })
     return currentChain
}

//按钮写着获取资助金额的地址
//getAddressToAmountFunded函数
//买咖啡的时候跟踪地址



connectButton.onclick=connect
fundButton.onclick=fund
balanceButton.onclick=getbalance
withdrawButton.onclick=withdraw
