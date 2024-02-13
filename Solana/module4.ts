import * as borsh from "@project-serum/borsh"

const equipPlayerSchema=borsh.struct([
    borsh.u8('variant'),
    borsh.u16('playerId'),
    borsh.u128('itemId'),
])

const buffer=Buffer.alloc(1000)

// equipPlayerSchema.encode({variant:2,playerId:1435,itemId:7374},buffer)

// const instructionBuffer= buffer.slice(0,equipPlayerSchema.getSpan(buffer))

console.log(equipPlayerSchema.getSpan(buffer))