import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import pkg from './package.json';
const inputFileName = 'src/main.js';
const buildFolder = 'dist/';
const plugins = [peerDepsExternal(), json(), resolve(), commonjs({
	// Has to use rollup-plugin-commonjs to handle packages that export as cjs format
	namedExports: {
		'node_modules/lodash/lodash.js': [
			'floor'
		]
	}
})];
const packageName = pkg.name.replace('@nl/', '');

const cjs = {
	input: inputFileName,
	output: {
		file: `${buildFolder}bundle-cjs.js`,
		format: 'cjs'
	},
	plugins: plugins,
};
const esm = {
	input: inputFileName,
	output: {
		file: `${buildFolder}bundle-esm.js`,
		format: 'es'
	},
	plugins: plugins,
};
const umd = {
	input: inputFileName,
	output: {
		file: `${buildFolder}bundle-umd.js`,
		format: 'umd',
		name: packageName,
	},
	plugins: plugins,
};

export default [cjs, esm, umd];
// export default [esm];
