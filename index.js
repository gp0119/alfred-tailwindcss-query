'use strict';
import alfy from "alfy";
import tailwindJson from './tailwindcss.json' assert { type: "json" };

const cssPorperties = Object.keys(tailwindJson);

const matches = alfy.matches(alfy.input, cssPorperties);


const items = matches.reduce((acc, porperty) => {
	const twObj = tailwindJson[porperty];
	Object.keys(twObj).forEach((tw) => {
		acc.push({
			title: `${tw}: ${Object.keys(twObj[tw]).map(css => `${css}: ${twObj[tw][css]}`).join('; ')}`,
		})
	})
	return acc;
}, []);

alfy.output(items);
