import fs from 'fs'
const json = fs.readFileSync('./firebase-admin-sdk.json')

// encode 
const encode = Buffer.from(json).toString('base64')

console.log(encode);