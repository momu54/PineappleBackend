import Fastify, { RequestGenericInterface } from 'fastify';
import { readFile } from 'fs/promises';
import { Logger } from './utils/logger.ts';
import { env } from 'process';
import 'dotenv/config';
import cors from '@fastify/cors';

import './modules/errorHandler.ts';
import { database } from './utils/database.ts';

const logger = new Logger('app');
export const fastify = Fastify({
	http2: true,
	https: {
		key: await readFile('certs/key.pem'),
		cert: await readFile('certs/cert.pem'),
	},
});
await fastify.register(cors, {
	origin: 'https://www.youtube.com',
});

fastify.get('/api/ping', async () => {
	return { pong: 'it worked!' };
});

interface OwnerGeneric extends RequestGenericInterface {
	Body: {
		owner: string;
	};
	Reply: {
		blocked: boolean;
	};
}
fastify.post<OwnerGeneric>('/api/owner', async (request, reply) => {
	const { owner } = request.body;
	logger.info(`Checking owner ${owner}`);

	const exists = await database.GetOwner(owner);
	if (!exists) {
		await database.AddOwner(owner);
		return reply.send({
			blocked: false,
		});
	}

	return reply.send({
		blocked: !!exists.blocked,
	});
});

try {
	const part = parseInt(env.PORT ?? '3000');
	await fastify.listen({ port: part, host: '::' });
	logger.info(`Server started at port ${part}`);
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
