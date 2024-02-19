import {Connection, PublicKey} from "@solana/web3.js";
import * as borsh from "@project-serum/borsh";


async function main(){
    const tokenMint=new PublicKey("FfhUm8jdyPywSX539bKcWwiExqtoomkCN1q2xB4zfFtT");

    const programId=new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
    
    const seeds=[Buffer.from("metadata"),programId.toBytes(),tokenMint.toBytes()]
    
    const [metadataPDA,bump]=PublicKey.findProgramAddressSync(seeds,programId);
    
    const connection =new Connection("https://api.mainnet-beta.solana.com");

    const accountInfo=await connection.getAccountInfo(metadataPDA);

    const borshmetadataLayout=borsh.struct([
        borsh.u8("key"),
        borsh.publicKey("updateAuthority"),
        borsh.publicKey("mint"),
        borsh.str("name"),
        borsh.str('symbol'),
        borsh.str('uri'),
        borsh.u16('sellerFeeBasisPoints'),
    ])

    if(accountInfo){
        const metadata=borshmetadataLayout.decode(accountInfo.data);
        console.log(metadata);
        console.log(metadata.mint.toBase58());
        console.log(metadata.sellerFeeBasisPoints);
    }
}

main()