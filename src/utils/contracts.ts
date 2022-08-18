import {
  BaseContract,

  
} from "ethers";
import {ethers,utils } from "ethers";
import KeenFactoryArtifacts from "../artifacts/contracts/KeenFactory.sol/KeenFactory.json";
import KeenRouterArtifacts from "../artifacts/contracts/KeenRouter.sol/KeenRouter.json";
import KeenConfigArtifacts from "../artifacts/contracts/KeenConfig.sol/KeenConfig.json";
import KeenUserArtifacts from "../artifacts/contracts/KeenUser.sol/KeenUser.json";
import DateTimeArtifacts from "../artifacts/contracts/DateTime.sol/DateTime.json";
import KeenPairArtifacts from "../artifacts/contracts/KeenFactory.sol/KeenPair.json";
import ERC20Artifacts from "../artifacts/contracts/WKEEN.sol/WKEEN.json";
import { KeenFactory,KeenRouter,KeenPair, WKEEN as ERC20} from "../types"
import keenLogo from '../images/token/keen.jpg';
import usdtLogo from '../images/token/usdt.png';
import tcpLogo from '../images/token/tcp.jpg';
type ContractsInfo = {
  name: string,
  address: string,
  network: string,
  chainId: number,
  type:'main'|'pairs'|'erc20'
  abi:any,
  readContract:BaseContract,
  writeContract:BaseContract,
};
type ERC20Info = {
  name: string,
  address: string,
  network: string,
  chainId: number,
  type:'erc20'
  abi:any,
  readContract:ERC20,
  writeContract:ERC20,
};
type ParisInfo = {
  name: string,
  address: string,
  network: string,
  chainId: number,
  type:'pairs'
  abi:any,
  readContract:KeenPair,
  writeContract:KeenPair,
  token0:ERC20Info,
  token1:ERC20Info
};

export const contractsInfo:ContractsInfo[] =[
  {
    name: "KeenFactory",
    address: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
    network: 'test',
    chainId: 1337,
    type:'main',
    abi:KeenFactoryArtifacts.abi,
    readContract:null,
    writeContract:null,
  },
  {
    name: "KeenRouter",
    address: "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
    network: 'test',
    chainId: 1337,
    type:'main',
    abi:KeenRouterArtifacts.abi,
    readContract:null,
    writeContract:null,
  },
  {
    name: "KeenConfig",
    address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    network: 'test',
    chainId: 1337,
    type:'main',
    abi:KeenConfigArtifacts.abi,
    readContract:null,
    writeContract:null,
  },
  {
    name: "KeenUser",
    address: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
    network: 'test',
    chainId: 1337,
    type:'main',
    abi:KeenUserArtifacts.abi,
    readContract:null,
    writeContract:null,
  },
  {
    name: "KeenFactory",
    address: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
    network: 'bsc',
    chainId: 56,
    type:'main',
    abi:KeenFactoryArtifacts.abi,
    readContract:null,
    writeContract:null,
  },
  {
    name: "KeenRouter",
    address: "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
    network: 'bsc',
    chainId: 56,
    type:'main',
    abi:KeenRouterArtifacts.abi,
    readContract:null,
    writeContract:null,
  },
  {
    name: "KeenConfig",
    address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    network: 'bsc',
    chainId: 56,
    type:'main',
    abi:KeenConfigArtifacts.abi,
    readContract:null,
    writeContract:null,
  },
  {
    name: "KeenUser",
    address: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
    network: 'bsc',
    chainId: 56,
    type:'main',
    abi:KeenUserArtifacts.abi,
    readContract:null,
    writeContract:null,
  },

]

export const pairsContracts: ParisInfo[] = [];



// request access to the user's MetaMask account
async function requestAccount() {
  if (window.ethereum?.request)
    return window.ethereum.request({ method: "eth_requestAccounts" });

  throw new Error(
    "Missing install Metamask. Please access https://metamask.io/ to install extension on your browser"
  );
}

// request access to the user's MetaMask account


export async function buildContracts() {
  let [account] = await requestAccount();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { name,chainId,ensAddress } = await provider.getNetwork();
  console.log("name",name)
  console.log("chainId",chainId)
  console.log("ensAddress",ensAddress)
  const signer = provider.getSigner();

  const readProvider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/bsc");
  for (let index = 0; index < contractsInfo.length; index++) {
    const item = contractsInfo[index];
    
    const contract = new ethers.Contract(
      item.address,
      item.abi,
      signer
    );
    item.writeContract = contract;

    if(item.chainId == 56){
      
      item.readContract = new ethers.Contract(
        item.address,
        item.abi,
        readProvider
      );
    }else{
      item.readContract = item.writeContract;
    }

    if(item.name == 'KeenFactory' && item.chainId == chainId){
      let keenFactory = item.readContract as KeenFactory;
      let length = await keenFactory.allPairsLength();

      for (let index = 0; index < length.toNumber(); index++) {
        let pairsAddress = await keenFactory.allPairs(index);

        let token0:ERC20Info = {
          name: null,
          address: null,
          network: item.network,
          chainId: item.chainId,
          type:'erc20',
          abi:ERC20Artifacts.abi,
          readContract:null,
          writeContract:null,
        }
        let token1:ERC20Info = {
          name: null,
          address: null,
          network: item.network,
          chainId: item.chainId,
          type:'erc20',
          abi:ERC20Artifacts.abi,
          readContract:null,
          writeContract:null,
        }
        
        let pairContract:ParisInfo = {
          name: "KeenPairs",
          address: pairsAddress,
          network: item.network,
          chainId: item.chainId,
          type:'pairs',
          abi:KeenPairArtifacts.abi,
          writeContract:null,
          readContract:null,
          token0,
          token1
        };
        let keenPair = new ethers.Contract(
          pairContract.address,
          pairContract.abi,
          signer
        ) as KeenPair
        pairContract.writeContract = keenPair;
        pairContract.readContract = pairContract.writeContract;
        if(pairContract.chainId == 56){
          pairContract.readContract = new ethers.Contract(
            pairContract.address,
            pairContract.abi,
            readProvider
          ) as KeenPair;
        }
        pairsContracts.push(pairContract);


        let keenPairContract = pairContract.readContract;
        let stackToken = await keenPairContract.stackToken();

        let token0Address =  await keenPairContract.token0();
        let token1Address =  await keenPairContract.token1();
        pairContract.token0.address = token0Address == stackToken ? token1Address : token0Address;
        pairContract.token1.address = token0Address == stackToken ? token0Address : token1Address;



        let token0Contract = new ethers.Contract(
          pairContract.token0.address,
          ERC20Artifacts.abi,
          signer
        ) as ERC20;
        let token1Contract = new ethers.Contract(
          pairContract.token1.address,
          ERC20Artifacts.abi,
          signer
        ) as ERC20;

        pairContract.token0.writeContract = token0Contract;
        pairContract.token1.writeContract = token1Contract;
        pairContract.token0.readContract = token0Contract;
        pairContract.token1.readContract = token1Contract;
        if(pairContract.chainId == 56){
          pairContract.token0.readContract = new ethers.Contract(
            pairContract.token0.address,
            ERC20Artifacts.abi,
            readProvider
          ) as ERC20;
          pairContract.token1.readContract = new ethers.Contract(
            pairContract.token1.address,
            ERC20Artifacts.abi,
            readProvider
          ) as ERC20;
        }

        pairContract.token0.name = await token0Contract.name();
        pairContract.token1.name = await token1Contract.name();

        let name = pairContract.token0.address == stackToken ? pairContract.token1.name+"/"+pairContract.token0.name:pairContract.token0.name+"/"+pairContract.token1.name;
        pairContract.name = name;
      }
    }
  }
}

export function getContract(query: Partial<ContractsInfo>): ContractsInfo {
  
  const found = contractsInfo.find(contract =>
    Object.keys(query).every(
      key =>
        query[key as keyof ContractsInfo]?.toString().toLowerCase() ===
        contract[key as keyof ContractsInfo]?.toString().toLowerCase()
    )
  ) as ContractsInfo;
  // if (!found) {
  //   throw new Error(`Contract not found, query=${JSON.stringify(query)}`)
  // }
  return found
}


export function getTokenLogo(name:string){
  if(name.toLocaleLowerCase() === 'usdt'){
    return usdtLogo;
  }else if(name.toLocaleLowerCase() === 'keen'){
    return keenLogo;
  }else if(name.toLocaleLowerCase() === 'tcp'){
    return tcpLogo;
  }
}
