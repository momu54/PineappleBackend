import { Logger } from '../utils/logger.ts';

const logger = new Logger('errorHandler');
const errorHandler: NodeJS.UncaughtExceptionListener &
	NodeJS.UnhandledRejectionListener = (error) => {
	if (error instanceof Error) {
		logger.error(error);
	} else {
		logger.rawError('An error occurred');
	}
};

process.on('uncaughtException', errorHandler);
process.on('unhandledRejection', errorHandler);
