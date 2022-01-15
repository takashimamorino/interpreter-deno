type Token = {
	type: TokenType;
	literal: string;
};

type TokenType = typeof TOKEN_TYPE[keyof typeof TOKEN_TYPE];

const TOKEN_TYPE = {
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
