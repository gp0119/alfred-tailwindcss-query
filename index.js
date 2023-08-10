"use strict";
import alfy from "alfy";
import Fuse from "fuse.js";
import utilities from "./utilities.json" assert { type: "json" };

const queryTw = process.env.query_tw;
const query = process.argv[process.argv.length - 1];
const cssPorperties = alfy.cache.get("cssPorperties") || Object.keys(utilities);
const docsMap = {
	"grid-column-start": "grid-column",
	"grid-column-end": "grid-column",
	"grid-row-start": "grid-row",
	"grid-row-end": "grid-row",
	accessibility: "screen-readers",
	inset: "top-right-bottom-left",
};
const fuse = new Fuse(cssPorperties, {});
let output;
if (!queryTw) {
	const result = fuse.search(query);
	let matches;
	if (!query) {
		matches = cssPorperties;
	} else {
		matches = result.map((item) => item.item);
	}
	output = matches.map((key) => ({
		title: key,
		subtitle: "press enter to see all classes",
		arg: key,
		mods: {
			cmd: {
				subtitle: "Open docs in browser",
				arg: `https://tailwindcss.com/docs/${docsMap[key] || key}`,
			},
		},
	}));
} else {
	const index = cssPorperties.indexOf(query);
	cssPorperties.splice(index, 1);
	cssPorperties.unshift(query);
	alfy.cache.set("cssPorperties", cssPorperties);
	const twArray = utilities[query] || [];
	output = twArray.map(([tw, css]) => {
		return {
			title: tw,
			subtitle: Object.entries(css)
				.map(([key, value]) => `${key}: ${value}`)
				.join("; "),
			arg: tw,
			mods: {
				cmd: {
					subtitle: "Open docs in browser",
					arg: `https://tailwindcss.com/docs/${docsMap[query] || query}`,
				},
			},
		};
	});
}

alfy.output(output);
