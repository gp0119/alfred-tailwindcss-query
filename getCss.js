"use strict";
import alfy from "alfy";
import Fuse from "fuse.js";
import utilities from "./lib/utilities.json" assert { type: "json" };
import { docsMap } from "./lib/docsMap.js";

const query = alfy.input;

function getCssPorperties() {
	return alfy.cache.get("cssPorperties") || Object.keys(utilities);
}

function getFuseCssPorperties() {
	return new Fuse(getCssPorperties(), { threshold: 0.4 });
}

function output() {
	let matches = getCssPorperties();
	if (query) {
		const fuse = getFuseCssPorperties();
		matches = fuse.search(query).map((item) => item.item);
	}
	if (!matches.length) {
		return [
			{
				title: "🥺 No Matches Found",
				subtitle: "Try a different query",
				valid: false,
			},
		];
	}
	return matches.map((key) => ({
		uid: key,
		title: key,
		subtitle: "👉 Press Enter to See All Classes",
		arg: key,
		mods: {
			cmd: {
				subtitle: "🌐 Open Docs in Browser",
				arg: `https://tailwindcss.com/docs/${docsMap[key] || key}`,
			},
		},
	}));
}

alfy.output(output());
