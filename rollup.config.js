import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { uglify } from 'rollup-plugin-uglify';
import commonjs from '@rollup/plugin-commonjs';

console.log('process.env.BUILD ', process.env.BUILD)
export default {
	input: 'src/index.js',
	external: ['mapbox-gl'],
	output: [
		{ file: 'dist/map-report.cjs.js',	format: 'cjs', exports: 'auto' },
		{ file: 'dist/map-report.esm.js',	format: 'esm' },
		{ file: 'dist/map-report.iife.js',	format: 'iife',	name: 'MapReport', globals: {'mapbox-gl': 'mapboxgl'} },
		{ file: 'dist/map-report.amd.js',	format: 'amd' },
		{ file: 'dist/map-report.umd.js',	format: 'umd',	name: 'MapReport', globals: {'mapbox-gl': 'mapboxgl'} },
	],
	plugins: [
		resolve(),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
			babelHelpers: 'bundled'
		}),
		postcss({
			extract: 'map-report.css',
			extensions: ['.scss','.css'],
			minimize: process.env.BUILD === 'production'
		}),
		process.env.BUILD === 'production' && uglify(),
	]
};