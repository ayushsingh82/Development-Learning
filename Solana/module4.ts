import * as borsh from "@project-serum/borsh"
import * as web3 from "@solana/web3.js";
const BN=require('bn.js')
var a=BN('737498',10)

const equipPlayerSchema=borsh.struct([
    borsh.u8('variant'),
    borsh.u16('playerId'),
    borsh.u128('itemId'),
])

const buffer=Buffer.alloc(1000)

equipPlayerSchema.encode({variant:2,playerId:1435,itemId:new BN('737498',10)},buffer)

const instructionBuffer= buffer.subarray(0,equipPlayerSchema.getSpan(buffer))

console.log(equipPlayerSchema.getSpan(buffer))

const endpoint=web3.clusterApiUrl('devnet')
const connection=new web3.Connection(endpoint)

const transaction=new web3.Transaction()
const instruction = new web3.TransactionInstruction({
    keys: [
      {
        pubkey: player.publicKey, // Assuming player is a valid PublicKey object
        isSigner: true,
        isWritable: false,
      },
      {
        pubkey: playerInfoAccount, // Assuming playerInfoAccount is a valid PublicKey object
        isSigner: false,
        isWritable: true,
      }
    ],
    data:instructionBuffer,
    programId:PROGRAM_ID
  });
  
  transaction.add(instruction)