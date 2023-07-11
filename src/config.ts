import { config } from "dotenv";
config()

if(!process.env?.PORT_SERVER) throw new Error('PORT_SERVER requirement')
export const PORT_SERVER = Number(process.env.PORT_SERVER)
if(!process.env?.MONGO_URI) throw new Error('MONGO_URI requirement')
export const MONGO_URI = process.env.MONGO_URI
if(!process.env?.WEB3_PROVIDER) throw new Error('WEB3_PROVIDER requirement')
export const WEB3_PROVIDER = process.env.WEB3_PROVIDER