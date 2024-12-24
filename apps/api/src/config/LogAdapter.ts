import {
	red,
	bgRed,
	yellow,
	bgYellow,
	green,
	bgGreen,
} from 'console-log-colors';

export class LogAdapter {
	static error(...msgs: string[]): void {
		console.log(bgRed(msgs[0]), red(msgs.slice(1)));
	}

	static warning(...msgs: string[]): void {
		console.log(bgYellow(msgs[0]), yellow(msgs.slice(1)));
	}

	static success(...msgs: string[]): void {
		console.log(bgGreen(msgs[0]), green(msgs.slice(1)));
	}
}