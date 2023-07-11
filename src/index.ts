import { connectServer } from "./Server/fastify"
import { connectMongoDb } from "./infra/database/connect"

(async() => {
    try {
        // init connect 
        await Promise.all([
            connectMongoDb()
        ])
        // init server
        await connectServer()
    } catch (error) {
        throw error
    }
})()