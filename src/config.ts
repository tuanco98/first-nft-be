import { config } from "dotenv";
config()

if(!process.env?.PORT_SERVER) throw new Error('PORT_SERVER requirement')
export const PORT_SERVER = Number(process.env.PORT_SERVER)
if(!process.env?.MONGO_URI) throw new Error('MONGO_URI requirement')
export const MONGO_URI = process.env.MONGO_URI