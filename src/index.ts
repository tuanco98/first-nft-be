import { connectServer } from "./Server/fastify"
import { cronService } from "./cron"
import { connectMongo } from "./infra/database/mongo"

(async() => {
    try {
        // init connect 
        await Promise.all([
            connectMongo()
        ])
        // init cron
        cronService.blockChain()
        // init server
        await connectServer()
    } catch (error) {
        throw error
    }
})()