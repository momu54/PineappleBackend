import chalk from 'chalk';

export class Logger {
	constructor(module: string) {
		this.module = module;
		console.log(chalk.green(`[${module}] Logger initialized`));
	}

	public info(message: unknown, ...params: unknown[]) {
		console.log(`[${this.module}/${chalk.blueBright('info')}] ${message}`, ...params);
	}

	public warn(message: unknown, ...params: unknown[]) {
		console.log(
			`[${this.module}/${chalk.yellowBright('warn')}] ${chalk.yellowBright(
				message
			)}`,
			...params
		);
	}

	public error(errormessage: string | Error, ...params: unknown[]) {
		if (typeof errormessage === 'string') {
			console.error(
				`[${this.module}/${chalk.redBright}] ${chalk.redBright(errormessage)}`,
				...params
			);
			return;
		}
		console.error(
			chalk.red(`[${this.module}/error] ${errormessage.stack}`),
			...params
		);
	}

	public rawError(message: unknown, ...params: unknown[]) {
		console.error(
			`[${this.module}/${chalk.redBright('error')}] ${chalk.redBright(message)}`,
			...params
		);
	}

	private module: string;
}
