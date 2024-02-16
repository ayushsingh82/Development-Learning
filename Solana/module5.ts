import {Connection, PublicKey} from "@solana/web3.js"
import * as borsh from "@project-serum/borsh"

const programId=new PublicKey("HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf");
// const [pda,bump]=PublicKey.findProgramAddressSync([Buffer.from("GLOBAL_STATE")],programId);

// console.log(pda.toBase58())
// console.log("bump =" +bump)

// const pda2=PublicKey.createProgramAddressSync([Buffer.from("GLOBAL_STATE"),Buffer.from([253])],programId);
// console.log("is on curve "+PublicKey.isOnCurve(pda2));
// console.log(pda2.toBase58());

// const userPK =new PublicKey("BTFPPfg5jiuUud8iYguoV7EriZZhXwr8e9usS9qNQPHc");

// const [pda3,bump3]=PublicKey.findProgramAddressSync([Buffer.from("USER_DATA"),userPK.toBuffer()],programId);
// console.log(pda3.toBase58());
// console.log("bump3 =" +bump3)

//same seed so same pda


const  borshAccountSchema=borsh.struct([
    borsh.bool('intialised'),
    borsh.str('str1'),
    borsh.str('str2')
])

async function main(){
const connection=new Connection("https://api.devnet.solana.com");
const accounts=await connection.getProgramAccounts(programId).then(accounts=>{
    accounts.forEach(({pubkey,account})=>{
                console.log('Account',pubkey.toBase58());
                console.log('Data buffer',account.data);

                const {intialised,str1,str2}=borshAccountSchema.decode(account.data)
                console.log(intialised)
                console.log(str1)
                console.log(str2)
            
    })
})
}

main()


