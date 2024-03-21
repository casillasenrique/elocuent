import { createWriteStream } from "fs";
import { spawn } from "child_process";
import { createInterface } from 'readline';
import { globSync } from "glob";

import parseLine from "./parse-line.js";
import defaults from "./defaults.js";



export default async function (options = {}) {

	options = Object.assign({}, defaults, options);
	let input = options.input ?? `{${options.dirs}}/**/*.{${options.types}}`;
	console.log(input);
	let out = options.output;

	// Read input files
	const files = globSync(input);

	if (files.length === 0) {
		console.error("No files found");
		process.exit(1);
	}

	const indent = options.spaces ? " ".repeat(options.spaces === true ? 2 : options.spaces) : "\t";

	const stream = createWriteStream(out);
	let wroteHeader = false;
	let totalLines = 0;

	for (let i=0; i<files.length; i++) {
		const file = files[i];
		const gitBlame = spawn('git', ['blame', file]);
		const rl = createInterface({ input: gitBlame.stdout });

		// Line number
		let index = 1;
		let fileType = file.split(".").pop();
		let type = fileType;

		for await (let line of rl) {
			totalLines++;
			let context = {index: index++, fileType, type, indent};
			let info = parseLine(line, context);
			type = context.type;

			if (!wroteHeader) {
				stream.write(Object.keys(info).join(",") + "\n");
				wroteHeader = true;
			}

			stream.write(Object.values(info).join(",") + "\n");
		}

		gitBlame.kill();
	}

	console.info(`Analyzed a total of ${totalLines} lines of code in ${files.length} files. Results written to ${out}`);

	stream.end();
}