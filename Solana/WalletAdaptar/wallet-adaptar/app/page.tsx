
import { NextPage } from "next";
import { useMemo } from "react";
import { AppBar } from "./AppBar";
import WalletContextProvider from "./WalletContextProvider";

import { FC, ReactNode } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import Head from "next/head";


export const Home: NextPage = (props) => {
  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);

  return (
    // <ConnectionProvider endpoint={endpoint}>
    //   <WalletProvider wallets={wallets}>
    //     <p>Put the rest of your app here</p>
    //   </WalletProvider>
    // </ConnectionProvider>
    <div>
      <Head>
      <title>Wallet-Adapter Example</title>
      </Head>
      <WalletContextProvider>
        <AppBar/>
      </WalletContextProvider>
    </div>
  );
};