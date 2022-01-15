export type Token = {
	type: TokenType;
	literal: string;
};

export type TokenType = typeof TOKEN_TYPE[keyof typeof TOKEN_TYPE];

export const TOKEN_TYPE = {
	ILLEGAL: "ILLEGAL",
	EOF: "EOF",

	// 識別子 + リテラル
	IDENT: "IDENT", // add, foobar, x, y, ...
	INT: "INT", // 1343456

	// 演算子
	ASSIGN: "=",
	PLUS: "+",

	// 区切り文字
	COMMA: ",",
	SEMICOLON: ";",

	LPAREN: "(",
	RPAREN: ")",
	LBRACE: "{",
	RBRACE: "}",

	// キーワード
	FUNCTION: "FUNCTION",
	LET: "LET",
} as const;

const keywords: {
	[k: string]: KEYWORDS;
} = {
	fn: TOKEN_TYPE["FUNCTION"],
	let: TOKEN_TYPE["LET"],
};

type KEYWORDS = typeof TOKEN_TYPE["FUNCTION"] | typeof TOKEN_TYPE["LET"];

export const lookupIdent = (ident: string): TokenType => {
	if (keywords[ident]) {
		return keywords[ident];
	}

	return TOKEN_TYPE.IDENT;
};
