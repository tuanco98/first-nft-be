import { connectServer } from "./Server/fastify"
import { cronService } from "./cron"
import { initRedis } from "./infra/cache/redis"
import { connectMongo } from "./infra/database/mongo"

(async() => {
    try {
        // init connect 
        await Promise.all([
            initRedis(),
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