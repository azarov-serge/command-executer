import path from 'path';

export class FFMpegBuilder {
	private inputDir: string = '';
	private inputFile: string = '';
	private outputDir: string = '';
	private outputFile: string = '';
	private options: Map<string, string> = new Map();

	constructor() {
		this.options.set('-c:v', 'libx264');
	}

	public input(file: string, dir: string) {
		this.inputDir = dir;
		this.inputFile = file;

		return this;
	}

	public output(file: string, dir: string = this.inputDir) {
		this.outputDir = dir;
		this.outputFile = file;

		return this;
	}

	public setVideoSize(width: string, height: string) {
		this.options.set('-s', `${width}x${height}`);

		return this;
	}

	public build() {
		this.validate();

		const { inputDir, inputFile, outputDir, outputFile } = this;

		const inputPath = path.join(inputDir, inputFile);
		const outputPath = path.join(outputDir, outputFile);
		const args = ['-i', inputPath];

		this.options.forEach((value, key) => {
			args.push(key);
			args.push(value);
		});

		args.push(outputPath);

		return args;
	}

	private validate(): void {
		if (!this.inputFile) {
			throw new Error('Input file name is not exist');
		}

		if (!this.inputDir) {
			throw new Error('Input directory is not exist');
		}

		if (!this.outputDir) {
			throw new Error('Output directory is not exist');
		}

		if (!this.outputFile) {
			throw new Error('Output file name is not exist');
		}
	}
}
