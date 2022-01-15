import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import { type TokenType, TOKEN_TYPE } from "../token/index.ts";
import { Lexer } from "./index.ts";

type ExpectedToken = {
	expectedType: TokenType;
	expectedLiteral: string;
};

Deno.test({
	name: "next token",
	fn(): void {
		const input = "=+(){},;let";

		const tests: ExpectedToken[] = [
			{ expectedType: TOKEN_TYPE["ASSIGN"], expectedLiteral: "=" },
			{ expectedType: TOKEN_TYPE["PLUS"], expectedLiteral: "+" },
			{ expectedType: TOKEN_TYPE["LPAREN"], expectedLiteral: "(" },
			{ expectedType: TOKEN_TYPE["RPAREN"], expectedLiteral: ")" },
			{ expectedType: TOKEN_TYPE["LBRACE"], expectedLiteral: "{" },
			{ expectedType: TOKEN_TYPE["RBRACE"], expectedLiteral: "}" },
			{ expectedType: TOKEN_TYPE["COMMA"], expectedLiteral: "," },
			{ expectedType: TOKEN_TYPE["SEMICOLON"], expectedLiteral: ";" },
			{ expectedType: TOKEN_TYPE["LET"], expectedLiteral: "let" },
			{ expectedType: TOKEN_TYPE["EOF"], expectedLiteral: "" },
		];

		const l = new Lexer(input);

		tests.map((test) => {
			const tok = l.nextToken();
			assertEquals(tok.type, test.expectedType);
			assertEquals(tok.literal, test.expectedLiteral);
		});
	},
});
