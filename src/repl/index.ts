import { Lexer } from "../lexer/index.ts";
import { TOKEN_TYPE } from "../token/index.ts";

const PROMPT = ">> ";

export const start = async () => {
	while (true) {
		const buf = new Uint8Array(1024);
		await Deno.stdout.write(new TextEncoder().encode(PROMPT));
		const n = await Deno.stdin.read(buf);
		const input = new TextDecoder().decode(buf.subarray(0, n as number));
		const l = new Lexer(input);

		console.log(PROMPT);
		const tok = l.nextToken();
		if (tok.type === TOKEN_TYPE["EOF"]) {
			console.error(`Unexpected ${input}`);
			break;
		}
		console.log(tok);
	}
};
