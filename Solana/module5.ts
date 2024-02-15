import {PublicKey} from "@solana/web3.js"

const programId=new PublicKey("HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf");
const [pda,bump]=PublicKey.findProgramAddressSync([Buffer.from("GLOBAL_STATE")],programId);

console.log(pda.toBase58())
console.log("bump =" +bump)

const pda2=PublicKey.createProgramAddressSync([Buffer.from("GLOBAL_STATE"),Buffer.from([253])],programId);
console.log("is on curve "+PublicKey.isOnCurve(pda2));
console.log(pda2.toBase58());

const userPK =new PublicKey("BTFPPfg5jiuUud8iYguoV7EriZZhXwr8e9usS9qNQPHc");

const [pda3,bump3]=PublicKey.findProgramAddressSync([Buffer.from("USER_DATA"),userPK.toBuffer()],programId);
console.log(pda3.toBase58());
console.log("bump3 =" +bump3)



