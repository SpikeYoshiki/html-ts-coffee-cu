import { 
  createWalletClient, 
  custom, 
  createPublicClient, 
  parseEther, 
  defineChain, 
  formatEther,
  WalletClient,
  PublicClient,
  Chain,
  Address
} from "viem"
import "viem/window"
import { contractAddress, coffeeAbi } from "./constants-ts"

const connectButton = document.getElementById("connectButton") as HTMLButtonElement;
const fundButton = document.getElementById("fundButton") as HTMLButtonElement;
const ethAmountInput = document.getElementById("ethAmount") as HTMLInputElement;
const balanceButton = document.getElementById("balanceButton") as HTMLButtonElement;
const withdrawButton = document.getElementById("withdrawButton") as HTMLButtonElement;

console.log("hi");
let walletClient: WalletClient;
let publicClient;

//链接钱包
async function connect(): Promise<void> {
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum)
    });
    await walletClient.requestAddresses();
    connectButton.innerHTML = "connected!";
  } else {
    connectButton.innerHTML = "please install metamask";
  }
}

//买咖啡
async function fund(): Promise<void> {
  const ethAmount = ethAmountInput.value;
  console.log(`Funding with ${ethAmount}...`);

  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum)
    });

    const [connectedAccount] = await walletClient.requestAddresses();
    const currentChain = await getCurrentChain(walletClient);

    publicClient = createPublicClient({
      transport: custom(window.ethereum)
    });
    //交易模拟
    const { request } = await publicClient.simulateContract({
      address: contractAddress as Address,
      abi: coffeeAbi,
      functionName: "fund",
      account: connectedAccount,
      chain: currentChain,
      value: parseEther(ethAmount), // 1->10000000000000000000
    });
    //执行交易
    const hash = await walletClient.writeContract(request);
    console.log(hash);
  } else {
    connectButton.innerHTML = "please install metamask";
  }
}

//显示合约余额
async function getbalance(): Promise<void> {
  if (typeof window.ethereum !== "undefined") {
    publicClient = createPublicClient({
      transport: custom(window.ethereum)
    });
    
    const balance = await publicClient.getBalance({
      address: contractAddress as Address
    });
    console.log(formatEther(balance)); // 10000000000000000->1
  }
}

//提取所有余额
async function withdraw(): Promise<void> {
  console.log("withdrawing funds...");
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
    const [connectedAccount] = await walletClient.requestAddresses();
    const currentChain = await getCurrentChain(walletClient);
    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    });
    const { request } = await publicClient.simulateContract({
      address: contractAddress as Address,
      abi: coffeeAbi,
      functionName: "withdraw",
      account: connectedAccount,
      chain: currentChain,
    });
    const hash = await walletClient.writeContract(request);
    console.log("Withdrawal transaction hash:", hash);
  } else {
    connectButton.innerHTML = "please install metamask";
  }
}

//构建chain
async function getCurrentChain(client: WalletClient): Promise<Chain> {
  const chainId = await client.getChainId();
  const currentChain = defineChain({
    id: chainId,
    name: "Custom Chain",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: {
      default: {
        http: ["http://localhost:8545"]
      },
    },
  });
  return currentChain;
}


connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getbalance;
withdrawButton.onclick = withdraw;


