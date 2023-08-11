"use strict";
import alfy from "alfy";
import utilities from "./lib/utilities.json" assert { type: "json" };
import { docsMap } from "./lib/docsMap.js";

const query = alfy.input;

function output() {
	const matches = utilities[query] || [];
	if (!matches.length) {
		return [
			{
				title: "🥺 No Matches Found",
				subtitle: "Try a different query",
				valid: false,
			},
		];
	}
	return matches.map(([tw, css]) => {
		return {
			title: tw,
			subtitle: Object.entries(css)
				.map(([key, value]) => `${key}: ${value}`)
				.join("; "),
			arg: tw,
			mods: {
				cmd: {
					subtitle: "🌐 Open Docs in Browser",
					arg: `https://tailwindcss.com/docs/${docsMap[query] || query}`,
				},
			},
		};
	});
}

alfy.output(output());
