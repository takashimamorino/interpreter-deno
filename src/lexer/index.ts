import {
	type Token,
	type TokenType,
	TOKEN_TYPE,
	lookupIdent,
} from "../token/index.ts";

export class Lexer {
	input: string;
	position: number; // 現在の位置
	readPosition: number; // 次に読み込む位置
	ch: string; // 現在検査中の文字

	constructor(input: string) {
		this.input = input;
		this.readPosition = 0;
		this.position = 0;
		this.ch = "";

		this.readChar();
	}

	public nextToken(): Token {
		let tok: Token;

		switch (this.ch) {
			case "=":
				tok = this.newToken(TOKEN_TYPE["ASSIGN"], this.ch);
				break;
			case "+":
				tok = this.newToken(TOKEN_TYPE["PLUS"], this.ch);
				break;
			case ",":
				tok = this.newToken(TOKEN_TYPE["COMMA"], this.ch);
				break;
			case ";":
				tok = this.newToken(TOKEN_TYPE["SEMICOLON"], this.ch);
				break;
			case "(":
				tok = this.newToken(TOKEN_TYPE["LPAREN"], this.ch);
				break;
			case ")":
				tok = this.newToken(TOKEN_TYPE["RPAREN"], this.ch);
				break;
			case "{":
				tok = this.newToken(TOKEN_TYPE["LBRACE"], this.ch);
				break;
			case "}":
				tok = this.newToken(TOKEN_TYPE["RBRACE"], this.ch);
				break;
			case "let":
				tok = this.newToken(TOKEN_TYPE["LET"], this.ch);
				break;
			case "":
				tok = this.newToken(TOKEN_TYPE["EOF"], this.ch);
				break;

			default:
				if (this.isLetter(this.ch)) {
					const literal = this.readIdentifier();
					const type = lookupIdent(literal);
					return { type, literal };
				} else {
					tok = this.newToken(TOKEN_TYPE["ILLEGAL"], this.ch);
				}

				return { type: TOKEN_TYPE["EOF"], literal: this.ch };
		}

		this.readChar();
		return tok;
	}

	private readChar(): void {
		if (this.readPosition >= this.input.length) {
			this.ch = "";
		} else {
			this.ch = this.input[this.readPosition];
		}

		this.position = this.readPosition;
		this.readPosition += 1;
	}

	private newToken(tokenType: TokenType, ch: string): Token {
		return {
			type: tokenType,
			literal: ch,
		};
	}

	private isLetter(ch: string): boolean {
		return /[a-z]/i.test(ch);
	}

	private readIdentifier(): string {
		const position = this.position;

		while (this.isLetter(this.ch)) {
			this.readChar();
		}

		return this.input.slice(position, this.position);
	}
}
