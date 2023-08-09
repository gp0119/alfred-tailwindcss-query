"use strict";
import alfy from "alfy";
import tailwindJson from "./tailwindcss.json" assert { type: "json" };

// 截取最后两个参数
const [query, step] = process.argv.slice(-2);

const cssPorperties = Object.keys(tailwindJson);

const orginalInput = query;
const input = orginalInput.toLowerCase().replace(/-/g, " ");

const matches = alfy.matches(input, cssPorperties);

function generateItems(key) {
	if (Number(step) === 1) {
		return matches.map((key) => ({
			title: key.toLowerCase(),
			subtitle: "press enter",
			arg: key.toLowerCase(),
			mods: {
				cmd: {
					subtitle: "open in browser",
					arg: `https://tailwindcss.com/docs/${key
						.toLowerCase()
						.split(" ")
						.join("-")}`,
				},
			},
		}));
	} else {
		const newKey = key
			.split(" ")
			.map((item) => item.replace(/^\S/, (s) => s.toUpperCase()))
			.join(" ");
		const twObj = tailwindJson[newKey] || {};
		return Object.keys(twObj).reduce((acc, tw) => {
			acc.push({
				title: tw,
				subtitle: `.${tw}: { ${Object.keys(twObj[tw])
					.map((css) => `${css}: ${twObj[tw][css]}`)
					.join("; ")} }`,
				arg: tw,
				mods: {
					cmd: {
						subtitle: "open in browser",
						arg: `https://tailwindcss.com/docs/${key
							.toLowerCase()
							.split(" ")
							.join("-")}`,
					},
				},
			});
			return acc;
		}, []);
	}
}

alfy.output(generateItems(query));
