import * as web3 from "@solana/web3.js";
import { PublicKey ,Connection,clusterApiUrl,LAMPORTS_PER_SOL} from "@solana/web3.js";

async function getBalanceUsingWeb3(address:PublicKey):Promise<number>{
    const connection =new Connection(clusterApiUrl('devnet'));
    return connection.getBalance(address);
}

const publicKey =new PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN')
getBalanceUsingWeb3(publicKey).then(balance=>{
    console.log(balance/LAMPORTS_PER_SOL+"SOL ");
})

console.log(LAMPORTS_PER_SOL);




//Method-2



// async function getBalanceUsingJSONRPC(address:string):Promise<number>{
//     const url=clusterApiUrl('devnet')
//     console.log(url);
//     return  fetch(url,{
//         method:'POST',
//         headers:{'Content-Type':'application/json'},
//         body:JSON.stringify({
//               "jsonrpc":"2.0",
//               "id":1,
//               "method":"getBalance",
//               "params":[
//                 address
//               ]
//         })
//     }).then(response=>response.json())
//     .then(json=>{
//         if(json.error){
//             throw json.error
//         }
//         console.log(json)

//         return json['result']['value'] as number;
//     }).catch(error=>{
//         throw error
//     })
// }