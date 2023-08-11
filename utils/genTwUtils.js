import { numbersFirst, getUtilities, numbersLast } from "./getUtilities.js";
import corePlugins from "tailwindcss/lib/corePlugins.js";
import * as fs from "fs";

const plugins = [
	"accentColor",
	"alignContent",
	"alignItems",
	"alignSelf",
	"appearance",
	"aspectRatio",
	{
		backdropBlur: {
			filterRules: ([utility]) => utility !== ".backdrop-blur-0",
			transformProperties: ({ properties }) => {
				return {
					"backdrop-filter": properties["--tw-backdrop-blur"],
				};
			},
		},
	},
	{
		backdropBrightness: {
			transformProperties: ({ properties }) => {
				return {
					"backdrop-filter": properties["--tw-backdrop-brightness"],
				};
			},
		},
	},
	{
		backdropContrast: {
			transformProperties: ({ properties }) => {
				return {
					"backdrop-filter": properties["--tw-backdrop-contrast"],
				};
			},
		},
	},
	{
		backdropGrayscale: {
			transformProperties: ({ properties }) => {
				return {
					"backdrop-filter": properties["--tw-backdrop-grayscale"],
				};
			},
		},
	},
	{
		backdropHueRotate: {
			transformProperties: ({ properties }) => {
				return {
					"backdrop-filter": properties["--tw-backdrop-hue-rotate"],
				};
			},
		},
	},
	{
		backdropInvert: {
			transformProperties: ({ properties }) => {
				return {
					"backdrop-filter": properties["--tw-backdrop-invert"],
				};
			},
		},
	},
	{
		backdropOpacity: {
			transformProperties: ({ properties }) => {
				return {
					"backdrop-filter": properties["--tw-backdrop-opacity"],
				};
			},
		},
	},
	{
		backdropSaturate: {
			transformProperties: ({ properties }) => {
				return {
					"backdrop-filter": properties["--tw-backdrop-saturate"],
				};
			},
		},
	},
	{
		backdropSepia: {
			transformProperties: ({ properties }) => {
				return {
					"backdrop-filter": properties["--tw-backdrop-sepia"],
				};
			},
		},
	},
	"backgroundAttachment",
	"backgroundBlendMode",
	"backgroundClip",
	{
		backgroundColor: {
			transformProperties: ({ selector, properties }) => {
				delete properties["--tw-bg-opacity"];
				Object.keys(properties).forEach((key) => {
					properties[key] = properties[key].replace(
						" / var(--tw-bg-opacity)",
						"",
					);
				});
				return properties;
			},
		},
	},
	"backgroundImage",
	"backgroundOrigin",
	"backgroundPosition",
	"backgroundRepeat",
	"backgroundSize",
	{
		blur: {
			filterRules: ([utility]) => utility !== ".blur-0",
			transformProperties: ({ properties }) => {
				return {
					filter: properties["--tw-blur"],
				};
			},
		},
	},
	"borderCollapse",
	{
		borderColor: {
			transformProperties: ({ selector, properties }) => {
				delete properties["--tw-border-opacity"];
				Object.keys(properties).forEach((key) => {
					properties[key] = properties[key].replace(
						" / var(--tw-border-opacity)",
						"",
					);
				});
				return properties;
			},
		},
	},
	"borderRadius",
	{
		borderSpacing: {
			sort: (classes) => numbersFirst(classes),
			transformProperties: ({ properties }) => {
				let x = properties["--tw-border-spacing-x"];
				let y = properties["--tw-border-spacing-y"];
				return {
					"border-spacing": `${x || "var(--tw-border-spacing-x)"} ${
						y || "var(--tw-border-spacing-y)"
					}`,
				};
			},
		},
	},
	"borderStyle",
	"borderWidth",
	"boxDecorationBreak",
	{
		boxShadowColor: {
			filterProperties: (property) => property !== "--tw-shadow",
		},
	},
	{
		boxShadow: {
			transformProperties: ({ properties }) => {
				return {
					"box-shadow": properties["--tw-shadow"],
				};
			},
		},
	},
	"boxSizing",
	"breakAfter",
	"breakBefore",
	"breakInside",
	{
		brightness: {
			transformProperties: ({ properties }) => {
				return {
					filter: properties["--tw-brightness"],
				};
			},
		},
	},
	"captionSide",
	"caretColor",
	"clear",
	"columns",
	{
		content: {
			utilities: {
				"content-none": { content: "none" },
			},
		},
	},
	{
		contrast: {
			transformProperties: ({ properties }) => {
				return {
					filter: properties["--tw-contrast"],
				};
			},
		},
	},
	"cursor",
	"display",
	{
		divideColor: {
			transformSelector: (selector) =>
				selector
					.split(">")
					.shift()
					.trim()
					.replace(/^\./, "")
					.replace(/\\/g, "") + `> * + *`,
			transformProperties: ({ selector, properties }) => {
				delete properties["--tw-divide-opacity"];
				Object.keys(properties).forEach((key) => {
					properties[key] = properties[key].replace(
						" / var(--tw-divide-opacity)",
						"",
					);
				});
				return properties;
			},
		},
	},
	{
		divideStyle: {
			transformSelector: (selector) =>
				selector
					.split(">")
					.shift()
					.trim()
					.replace(/^\./, "")
					.replace(/\\/g, "") + `> * + *`,
		},
	},
	{
		divideWidth: {
			transformSelector: (selector) =>
				selector
					.split(">")
					.shift()
					.trim()
					.replace(/^\./, "")
					.replace(/\\/g, "") + `> * + *`,
			transformProperties: ({ selector, properties }) => {
				if (!selector.includes("reverse")) {
					delete properties["--tw-divide-y-reverse"];
					delete properties["--tw-divide-x-reverse"];
				}
				Object.keys(properties).forEach((key) => {
					properties[key] = properties[key].replace(
						/calc\((\d+px) \* var\(.*\)\)/,
						"0px",
					);
					properties[key] = properties[key].replace(
						/calc\((\d+px) \* calc\(.*\)\)/,
						"$1",
					);
				});
				return properties;
			},
		},
	},
	{
		dropShadow: {
			transformProperties: ({ properties }) => {
				return {
					filter: properties["--tw-drop-shadow"],
				};
			},
		},
	},
	"fill",
	"flexBasis",
	"flexDirection",
	{
		flexGrow: {
			utilities: {
				".grow": { "flex-grow": "1" },
				".grow-0": { "flex-grow": "0" },
			},
		},
	},
	{
		flexShrink: {
			utilities: {
				".shrink": { "flex-shrink": "1" },
				".shrink-0": { "flex-shrink": "0" },
			},
		},
	},
	"flexWrap",
	"flex",
	"float",
	"fontFamily",
	"fontSize",
	"fontSmoothing",
	"fontStyle",
	{
		fontVariantNumeric: {
			utilities: {
				".normal-nums": { "font-variant-numeric": "normal" },
				".ordinal": { "font-variant-numeric": "ordinal" },
				".slashed-zero": { "font-variant-numeric": "slashed-zero" },
				".lining-nums": { "font-variant-numeric": "lining-nums" },
				".oldstyle-nums": { "font-variant-numeric": "oldstyle-nums" },
				".proportional-nums": { "font-variant-numeric": "proportional-nums" },
				".tabular-nums": { "font-variant-numeric": "tabular-nums" },
				".diagonal-fractions": { "font-variant-numeric": "diagonal-fractions" },
				".stacked-fractions": { "font-variant-numeric": "stacked-fractions" },
			},
		},
	},
	"fontWeight",
	{
		gap: {
			sort: numbersFirst,
		},
	},
	"gradientColorStops",
	{
		grayscale: {
			transformProperties: ({ properties }) => {
				return {
					filter: properties["--tw-grayscale"],
				};
			},
		},
	},
	"gridAutoColumns",
	"gridAutoFlow",
	"gridAutoRows",
	"gridColumn",
	"gridColumnStart",
	"gridColumnEnd",
	"gridRow",
	"gridRowStart",
	"gridRowEnd",
	"gridTemplateColumns",
	"gridTemplateRows",
	{
		height: {
			sort: numbersFirst,
		},
	},
	{
		hueRotate: {
			transformProperties: ({ properties }) => {
				return {
					filter: properties["--tw-hue-rotate"],
				};
			},
		},
	},
	"hyphens",
	{
		invert: {
			transformProperties: ({ properties }) => {
				return {
					filter: properties["--tw-invert"],
				};
			},
		},
	},
	"isolation",
	"justifyContent",
	"justifyItems",
	"justifySelf",
	"letterSpacing",
	"lineClamp",
	"lineHeight",
	"listStyleImage",
	"listStylePosition",
	"listStyleType",
	{
		margin: {
			sort: (classes) => numbersFirst(classes),
		},
	},
	{
		maxHeight: {
			sort: numbersFirst,
		},
	},
	{
		maxWidth: {
			sort: numbersFirst,
		},
	},
	"minHeight",
	"minWidth",
	"mixBlendMode",
	"objectFit",
	"objectPosition",
	"opacity",
	"order",
	"outlineColor",
	"outlineOffset",
	"outlineStyle",
	"outlineWidth",
	"overflow",
	"overscrollBehavior",
	"padding",
	"placeContent",
	"placeItems",
	"placeSelf",
	"pointerEvents",
	"position",
	"resize",
	{
		ringColor: {
			transformProperties: ({ selector, properties }) => {
				delete properties["--tw-ring-opacity"];
				Object.keys(properties).forEach((key) => {
					properties[key] = properties[key].replace(
						" / var(--tw-ring-opacity)",
						"",
					);
				});
				return properties;
			},
		},
	},
	{
		ringOffsetColor: {
			transformProperties: ({ selector, properties }) => {
				properties[
					"box-shadow"
				] = `0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow)`;
				return properties;
			},
		},
	},
	{
		ringOffsetWidth: {
			transformProperties: ({ selector, properties }) => {
				properties[
					"box-shadow"
				] = `0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow)`;
				return properties;
			},
		},
	},
	{
		ringWidth: {
			filterRules: ([selector]) => {
				return selector.startsWith(".");
			},
			transformProperties: ({ selector, properties }) => {
				if (selector === ".ring-inset") {
					return { "--tw-ring-inset": "inset" };
				}
				delete properties["--tw-ring-inset"];
				delete properties["--tw-ring-offset-width"];
				delete properties["--tw-ring-offset-color"];
				delete properties["--tw-ring-color"];
				delete properties["--tw-ring-offset-shadow"];
				delete properties["box-shadow"];
				properties["box-shadow"] = properties["--tw-ring-shadow"];
				delete properties["--tw-ring-shadow"];
				return properties;
			},
			sort: (classes) => {
				return [...classes].sort((a, b) => {
					a = a === ".ring" ? ".ring-3" : a;
					b = b === ".ring" ? ".ring-3" : b;
					if (a < b) return -1;
					if (b < a) return 1;
					return 0;
				});
			},
		},
	},
	{
		rotate: {
			transformProperties: ({ properties }) => {
				return {
					transform: `rotate(${properties["--tw-rotate"]})`,
				};
			},
		},
	},
	{
		saturate: {
			transformProperties: ({ properties }) => {
				return {
					filter: properties["--tw-saturate"],
				};
			},
		},
	},
	{
		scale: {
			sort: numbersFirst,
			transformProperties: ({ properties }) => {
				let x = properties["--tw-scale-x"];
				let y = properties["--tw-scale-y"];
				return {
					transform:
						x && y ? `scale(${x})` : x ? `scaleX(${x})` : `scaleY(${y})`,
				};
			},
		},
	},
	"accessibility",
	"scrollBehavior",
	{
		scrollMargin: {
			sort: (classes) => numbersFirst(classes),
		},
	},
	{
		scrollPadding: {
			sort: (classes) => numbersFirst(classes),
		},
	},
	"scrollSnapAlign",
	"scrollSnapStop",
	"scrollSnapType",
	{
		sepia: {
			transformProperties: ({ properties }) => {
				return {
					filter: properties["--tw-sepia"],
				};
			},
		},
	},
	{
		skew: {
			sort: (classes) => numbersFirst(classes),
			transformProperties: ({ properties }) => {
				let x = properties["--tw-skew-x"];
				let y = properties["--tw-skew-y"];
				return {
					transform: `skew${x ? "X" : "Y"}(${x || y})`,
				};
			},
		},
	},
	{
		space: {
			sort: (classes) => numbersFirst(classes),
			transformSelector: (selector) =>
				selector
					.split(">")
					.shift()
					.trim()
					.replace(/^\./, "")
					.replace(/\\/g, "") + `> * + *`,
			transformProperties: ({ properties }) => {
				for (let prop in properties) {
					if (prop.startsWith("--")) {
						if (Object.keys(properties).length > 1) {
							delete properties[prop];
						}
					} else {
						properties[prop] =
							properties[prop].match(/([\d.]+[a-z]+) /)?.[1] ||
							properties[prop];
					}
				}
				// `right` and `bottom` margins are only used when
				// "reverse" is enabled
				delete properties["margin-right"];
				delete properties["margin-bottom"];
				return properties;
			},
		},
	},
	"strokeWidth",
	"stroke",
	"tableLayout",
	"textAlign",
	{
		textColor: {
			transformProperties: ({ selector, properties }) => {
				delete properties["--tw-text-opacity"];
				Object.keys(properties).forEach((key) => {
					properties[key] = properties[key].replace(
						" / var(--tw-text-opacity)",
						"",
					);
				});
				return properties;
			},
		},
	},
	"textDecorationColor",
	"textDecorationStyle",
	{
		textDecorationThickness: {
			sort: (classes) => numbersLast(classes),
		},
	},
	"textDecoration",
	{
		textIndent: {
			sort: (classes) => numbersFirst(classes),
		},
	},
	{
		textOverflow: {
			utilities: {
				truncate: {
					overflow: "hidden",
					"text-overflow": "ellipsis",
					"white-space": "nowrap",
				},
				"text-ellipsis": { "text-overflow": "ellipsis" },
				"text-clip": { "text-overflow": "clip" },
			},
		},
	},
	"textTransform",
	{
		textUnderlineOffset: {
			sort: (classes) => numbersLast(classes),
		},
	},
	{
		inset: {
			sort: (classes) => numbersFirst(classes),
		},
	},
	{
		touchAction: {
			utilities: {
				".touch-auto": { "touch-action": "auto" },
				".touch-none": { "touch-action": "none" },
				".touch-pan-x": { "touch-action": "pan-x" },
				".touch-pan-left": { "touch-action": "pan-left" },
				".touch-pan-right": { "touch-action": "pan-right" },
				".touch-pan-y": { "touch-action": "pan-y" },
				".touch-pan-up": { "touch-action": "pan-up" },
				".touch-pan-down": { "touch-action": "pan-down" },
				".touch-pinch-zoom": { "touch-action": "pinch-zoom" },
				".touch-manipulation": { "touch-action": "manipulation" },
			},
		},
	},
	"transformOrigin",
	"transitionDelay",
	"transitionDuration",
	"transitionProperty",
	"transitionTimingFunction",
	{
		translate: {
			sort: (classes) => numbersFirst(classes),
			transformProperties: ({ properties }) => {
				let x = properties["--tw-translate-x"];
				let y = properties["--tw-translate-y"];
				return {
					transform: `translate${x ? "X" : "Y"}(${x || y})`,
				};
			},
		},
	},
	"userSelect",
	"verticalAlign",
	"visibility",
	"whitespace",
	{
		width: {
			sort: numbersFirst,
		},
	},
	"willChange",
	"wordBreak",
	"zIndex",
];

const utilities = {};
plugins.forEach((plugin) => {
	let pluginName = plugin;
	let pluginConfig = {
		transformSelector: (x) => x.replace(/^\./g, "").replace(/\\/g, ""),
	};
	if (typeof plugin === "object") {
		pluginName = Object.keys(plugin)[0];
		pluginConfig = {
			...pluginConfig,
			...plugin[pluginName],
		};
	}

	let pluginValue = [];
	let utils;
	if (pluginConfig.utilities) {
		utils = pluginConfig.utilities;
	} else {
		utils = getUtilities(corePlugins.corePlugins[pluginName]);
	}
	if (pluginConfig.filterRules) {
		utils = Object.fromEntries(
			Object.entries(utils).filter(pluginConfig.filterRules),
		);
	}
	let classes = Object.keys(utils);
	if (pluginConfig.sort) {
		classes = pluginConfig.sort(classes);
	}

	classes.forEach((cls) => {
		const newKey = pluginConfig.transformSelector(cls);
		let properties = utils[cls];
		if (pluginConfig.transformProperties) {
			properties = pluginConfig.transformProperties({
				selector: cls,
				properties,
			});
		}
		properties = Object.keys(properties).reduce((acc, key) => {
			const v = properties[key] || {};
			if (/^[\d.]+rem$/.test(v)) {
				acc[key] = v + ` /* ${parseFloat(v) * 16}px */`;
			} else {
				acc[key] = v;
			}
			return acc;
		}, {});
		pluginValue.push([newKey, properties]);
	});
	utilities[
		pluginName
			.split(/(?=[A-Z])/)
			.map((item) => item.toLowerCase())
			.join("-")
	] = pluginValue;
});

fs.writeFileSync("../lib/utilities.json", JSON.stringify(utilities), "utf8");
