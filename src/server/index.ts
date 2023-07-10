import Fastify from "fastify";

const fastify = Fastify({ logger: true });
const version = "v0";
fastify.addHook("preHandler", (req, res, done) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	const isPreflight = /options/i.test(req.method);
	if (isPreflight) {
		return res.send();
	}

	done();
});
// fastify.addHook("preValidation", (req, res, done) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "*");
// 	done();
// });

// fastify.addHook("onSend", (request, reply, payload, done) => {
// 	const err = null;
// 	reply.header("Access-Control-Allow-Origin", "*");
// 	reply.header("Access-Control-Allow-Headers", "*");
// 	done(err, payload);
// });

// fastify.addHook("onResponse", (request, reply, done) => {
// 	const err = null;
// 	reply.header("Access-Control-Allow-Origin", "*");
// 	reply.header("Access-Control-Allow-Headers", "*");
// 	done();
// });

// fastify.register(cors, {
// 	hook: "preHandler",
// 	delegator: (req, callback) => {
// 		const corsOptions = {
// 			// This is NOT recommended for production as it enables reflection exploits
// 			origin: true,
// 		};

// 		// do not include CORS headers for requests from localhost
// 		if (/^localhost$/m.test(req?.headers?.origin || "")) {
// 			corsOptions.origin = false;
// 		}

// 		// callback expects two parameters: error and options
// 		callback(null, corsOptions);
// 	},
// });
fastify.register(
	(fastify, opts, done) => {
		done();
	},
	{ prefix: "v0" },
);


export const startFastifyServer = async () => {
	try {
		const server = await fastify.listen({
			port: FASTIFY_PORT,
			host: "0.0.0.0",
		});
		console.log(`🚀 ${SERVER_NAME} fastify ready at ${server}`);
	} catch (err) {
		fastify.log.error(err);
	}
};
