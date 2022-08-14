import { PromptService } from './core/prompt/prompt.service';
export class App {
	public async run() {
		console.log('Run app');
		const res = await new PromptService().input<number>(
			'Enter width',
			'number'
		);

		console.log(res);
	}
}

const app = new App();

app.run();
