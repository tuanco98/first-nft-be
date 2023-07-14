
import { SERVER_CODE } from "../config";
import { GetJSONStringify } from "./utils";

const IS_DEBUG = false
export const genCodeName = (msg: string, add_msg?: string) =>
	`${SERVER_CODE}:${msg} ${ErrCodeMessage[SERVER_CODE + msg]} ${add_msg || ""}`;

export const ErrMsg = (msg: string, add_msg?: string) => {
	const gen = genCodeName(msg, add_msg);
	return new Error(gen);
};
export const validateMissing = (object: any) => {
	for (const el in object) {
		if (object[el] === null || object[el] === undefined || object[el] === "")
			throw ErrMsg(ERROR_CODE.MISSING_PARAMS, el);
	}
};

/**
 * Show the error and capture exception to Sentry
 * @param e error
 * @param args params of user
 * @param funcName Name of function
 */

export function ErrorHandler(e: any, args: any, funcName: string) {
	let { message } = e;
	if (!message) message = "";
	const params = args;
	params.password = undefined;
	if (message.startsWith(`${SERVER_CODE}:`)) {
		if (IS_DEBUG) {
			const errCode =
				message.substring(0, SERVER_CODE.length) +
				message.substring(SERVER_CODE.length + 1);
			console.log(
				"\n========================================================================================\n",
			);
			console.log(
				"\x1b[33m%s\x1b[0m",
				`⚠️  WARNING : EXPECTED ERROR HAPPENED!\n`,
			);
			console.log("Function:", funcName);
			console.log(`Argument:`, JSON.parse(GetJSONStringify(params)));
			console.log(
				`Message:`,
				ErrCodeMessage[errCode]
					? ErrCodeMessage[errCode]
					: message.substring(SERVER_CODE.length + 1),
			);
			console.log(`Stack:`, e.stack);
			console.log(
				"\n========================================================================================",
			);
		}
	} else {
		console.log(
			"\n========================================================================================\n",
		);
		console.log(
			"\x1b[31m%s\x1b[0m",
			`🔥  🔥  🔥  DANGER : UNEXPECTED ERROR HAPPENED!\n `,
		);
		console.log("Function:", funcName);
		console.log(`Argument:`, JSON.parse(GetJSONStringify(params)));
		console.log(`Stack:`, e?.stack);
		console.log(
			"\n========================================================================================",
		);
	}
	return {
		throwErr: () => {
			throw e;
		},
	};
}

const ErrCodeMessage = {
	FNFT000: "UNEXPECTED_ERROR",
	
	DEX400: "MISSING_PARAMS",
	DEX401: "INVALID_PAGE",
	DEX402: "INVALID_PAGESIZE",
	DEX403: "INVALID_PARAMS",
	DEX404: "ADDRESS_INVALID",
	
	FNFT501: "SERVER_MAINTAINED",
};

export const ERROR_CODE = {
	//==========UNEXPECTED ERROR==========
	UNEXPECTED_ERROR: "000",
	//==========AUTH==============

	//==========FETCH DATA==========

	//==========ON CHAIN==============

	//==========PARAMS==============
	MISSING_PARAMS: "400",
	INVALID_PAGE: "401",
	INVALID_PAGESIZE: "402",
	INVALID_PARAMS: "403",
	ADDRESS_INVALID: "404",
	//==========SERVER==============
	SERVER_MAINTAINED: "501",
	//==========BUSINESS==============
};

export const getErrorMessage = (error_code: string) => {
	const code_name = `${SERVER_CODE}${error_code}`;
	return ErrCodeMessage[code_name];
};
export const StandardResponse = (data: any, msg: string) => {
	return {
	  error: data ? false : true,
	  errorMessage: msg,
	  data,
	}
  }
