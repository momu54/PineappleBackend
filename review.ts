import yesno from 'yesno';
import { database, ReviewMode } from './utils/database.ts';
import chalk from 'chalk';

const checkedOnly = await yesno({
	question: `Do you want to show unchecked owners only? (${chalk.redBright(
		'No'
	)} = checked only) (${chalk.greenBright('Yes')})`,
	defaultValue: true,
});

const mode = checkedOnly ? ReviewMode.Checked : ReviewMode.Unchecked;

const owners = await database.GetOwners(mode);
for (const owner of owners) {
	console.clear();

	console.log(`Owner: ${chalk.white.bold(owner.id)}`);
	console.log(`Link: https://www.youtube.com/@${chalk.white.bold(owner.id)}`);
	console.log(
		`Blocked: ${owner.blocked ? chalk.greenBright('Yes') : chalk.redBright('No')}`
	);
	const defaultValueTip = owner.blocked
		? chalk.greenBright('Yes')
		: chalk.redBright('No');
	const blocked = await yesno({
		question: owner.blocked
			? `Do you want to keep this owner blocked? (${defaultValueTip})`
			: `Do you want to block this owner? (${defaultValueTip})`,
		defaultValue: !!owner.blocked,
	});

	await database.MarkOwnerBlocked(owner.id, blocked);
	await database.MarkOwnerChecked(owner.id, true);
}

console.clear();
console.log(`${chalk.greenBright('All done!')} ✨ Have a nice day!`);
