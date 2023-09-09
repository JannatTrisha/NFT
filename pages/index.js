"use client"
import { useEffect,useState } from "react";
import Header from "./components/Header";
import contractabi from "./abi/abi.json";
import {ethers} from "ethers";

export default function Home() {
  const [address,setAddress] =useState(null);
  const [balance,setBalance] =useState(0);
  const [contract,setContract] =useState(null);
  

  useEffect(()=>{
    async function initialize(){
      if(typeof window.ethereum!=="undefined"){
        const provider= new ethers.providers.Web3Provider(window.ethereum)
        const signer=provider.getSigner();
        const address = await signer.getAddress();
        const balance=await provider.getBalance(address);
        setAddress(address);
        setBalance(ethers.utils.parseEther(balance))
        mycontractaddress="0xa147741D864f065c3704D1875Fa4b7732624B834"
        const contract = new ethers.contract(mycontractaddress,contractabi,signer)
        setContract(contract)
    }
  }
  initialize();
  },[])
  

  return (
    <>
    <div>
     <Header/>
     <div className="text-center">
     <p className=" text-md text-blue-400 lg:text-3xl">Hi,{address?.slice(0,10)}...{address?.slice(-10)}
     </p>
     </div>
    </div>
    </>
  )}