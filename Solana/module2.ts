import * as web3 from "@solana/web3.js";
import { Keypair ,
    PublicKey,
    SystemProgram,
    Transaction,
    clusterApiUrl,Connection,
    sendAndConfirmTransaction,
    TransactionInstruction,
     LAMPORTS_PER_SOL} from "@solana/web3.js";
import fs from "fs";




// const secret=JSON.parse(fs.readFileSync("ephkey.json").toString()) as number[]
// const secretKey=Uint8Array.from(secret)
// const keypairFromSecretKey=Keypair.fromSecretKey(secretKey);
// console.log(keypairFromSecretKey)

// const ownerKeypair=web3.Keypair.generate()
const ownerKeypair=Keypair.generate()

// const publicKey=ownerKeypair.publicKey;
// console.log(publicKey.toBase58());

// const pk=new PublicKey('DNt46fpRF7CvDgJb6KwuMZtxUma6LFCXftKVawQzmsXK');
// console.log(pk.toBase58());

// console.log(ownerKeypair.secretKey.toString());



//Transaction Learning

async function main() {
    

const transaction=new Transaction()

const recipient=new PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN');

const sendSolInstruction=SystemProgram.transfer({
    fromPubkey:ownerKeypair.publicKey,
    toPubkey:recipient,
    lamports:web3.LAMPORTS_PER_SOL*0.1
})

transaction.add(sendSolInstruction);

const connection=new Connection(clusterApiUrl("devnet"))
// const airdropSignature=await connection.requestAirdrop(ownerKeypair.publicKey,1*LAMPORTS_PER_SOL);

const lamports=BigInt(LAMPORTS_PER_SOL*0.1);
const instructionData:Buffer=Buffer.alloc(4+8);
//4 bytes for instruction and 8 bytes for lamports
instructionData.writeUInt32LE(2,0);
instructionData.writeBigUint64LE(lamports,4);

const manualInstruction=new TransactionInstruction({
 keys:[
    {
        pubkey:ownerKeypair.publicKey,
        isSigner:true,
        isWritable:true
    },
    {
        pubkey:recipient,
        isSigner:false,
        isWritable:true
    },
 ],
 programId:SystemProgram.programId,
 data:instructionData
});
transaction.add(manualInstruction);
console.log(transaction)


const signature=await sendAndConfirmTransaction(
    connection,
    transaction,
    [ownerKeypair]
)
console.log(signature)
 }

main()
