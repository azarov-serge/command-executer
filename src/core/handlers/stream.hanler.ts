import {ChildProcessWithoutNullStreams} from 'child_process';
import { IStreamLogger } from './stream-logger.interface';

export class StreamHanler {
	constructor(private logger: IStreamLogger) {}

	public processOutput(stream: ChildProcessWithoutNullStreams) {
		stream.stdout.on('data', (data: any) => {
			this.logger.log(data);
		});

		stream.stderr.on('data', (data: any) => {
			this.logger.error(data);
		});

		stream.on('close', () => {
			this.logger.end();
		})
	}
}
