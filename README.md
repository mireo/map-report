# Mireo Report a Map Problem Plugin

**Easy to use, Mapbox GL JS compatible UI control for reporting map problems**

## Table of Contents

- [About](#about)
    - [How does it work](#how-does-it-work) 
- [How to use it](#how-to-use-it)
    - [HTML with UMD build](#html-with-umd-build)
- [Congifuration](#configuration)
    - [Configuration parameters](#configuration-parameters)
- [How it is made?](#how-it-is-made)
    - [Browser compatibility](#browser-compatibility)
- [Building from source](#building-from-source)
- [MapLibre GL JS Support](#maplibre-gl-js-support)
- [Credits](#credits)
- [Licence](#licence)

## About

`MapReport` is an easy-to-use and cross-framework JS plugin Mapbox GL JS **Interface Control** ([IControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#icontrol)) designed for extremely quick and easy end-user **improving and reporting issues in digital map data**, such as missing or incorrect objects in a digital map. 

It's catered to any map data vendor using Mapbox GL JS, MapLibre GL JS  or similar map rendering SDKs to facilitate the reporting of map errors and improving the map data.

It's a framework-agnostic plugin built using pure JavaScript ([ECECMAScript 9](https://en.wikipedia.org/wiki/ECMAScript#9th_Edition_–_ECMAScript_2018)) and works across all modern browsers. Supported output builds are: [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), [CommonJS](https://en.wikipedia.org/wiki/CommonJS), [UMD](https://github.com/umdjs/umd#umd-universal-module-definition), [AMD](https://requirejs.org/docs/whyamd.html) and  Standard ES9.

The main advantages of the plugin are:
- it enables reporting on multiple clients' installations with different map data sources
- bypasses client's interaction with end users reporting incorrect map data
- quick and easy integration
- it seamlessly connects with the client's map instance, so the end user doesn't leave the current web page
- doesn't track nor collect map content or end user activity

### How does it work
`MapReport` Interface Control works similarly to any other tool for reporting map problems.

It's represented with the `Report a problem on the map` button and, by default, placed in the bottom right corner of the map. 

Once the end user clicks the button, the pop-up dialog with the map and list of error types opens, and the pop-up map center matches the main map's center. The user selects a type of error and, if required, moves the location marker to pinpoint the problematic location and submits the error to the map vendor's server.

Technically, `MapReport` Interface Control is initialized and added to the existing Mapbox GL JS map object. As any other ([Interface Control](https://docs.mapbox.com/mapbox-gl-js/api/markers/#icontrol)), the `MapReport` Interface Control has access to the Mapbox's [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/#map) object and uses it solely to track the current map center and to determine the closest road selected.

## How to use it

The easiest option is to download and include the latest release in the project. Alternatively, check out the [building from source](#building-from-source) section and load the corresponding JS and CSS.

Use the `MapReport` interface control the same way as any Mapbox GL JS [IControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#icontrol).
### HTML with UMD build
Download the latest release link directly from [unpkg](https://www.unpkg.com/map-report) or [build the control from the source](#building-from-source) and load the corresponding JS and CSS:

```
<script src="./map-report.umd.min.js"></script>
<link rel="stylesheet" href="./map-report.css">
```

This will iclude the `MapReport` as an UMD module and output `MapReport` as a global variable. `MapReport` is now ready to be used in the source code and controlled with JavaScript, just like any other Mapbox GL JS Interface Control.

Add the corresponding DOM element for the map and initialize the map.
```
<div id="map"></div>
```
```
var mgl = new mapboxgl.Map({
    container: 'map',
    style: <MAP STYLE ENDPOINT>,
});
```

Add `MapReport` IControl to the map.

```
mgl.addControl(new MapReport({ service: <REPORT SERVICE ENDPOINT> }), 'bottom-right');
```
alternatively, add control after the map load
```
mgl.on('load', () => {
    mgl.addControl(new MapReport({ 
        locale: 'hr', 
        service: '<REPORTING_SERVICE_ENDPOINT>',
        referer: 'referer ID',
        bounds: null,
        }), 'bottom-right');
    });
</script>
```
## Configuration
### Configuration parameters

| Name  | Type  | Default   | Description   |
|-  |-  |-  |-  |
| `service`    | string    | **mandatory**   | Server endpoint that receives and stores end user's issue reports.   |
| `locale`    | string    | `'hr'`     | [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) localization language, available options are `hr` for Croatian, `en` for English. Defaults to `hr` (Croatian).   |
| `referer`    | string    |  '' |  Referer's arbitrary identification parameter; useful for identifying client's map server and map data version. If unset defaults to the web page's current URL, or precisely [window.location.href](https://developer.mozilla.org/en-US/docs/Web/API/Location/href) property.    |
| `bounds`    | [LngLatBoundsLike](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatboundslike) object | `[[13.45, 42.37], [19.47, 46.57]]` | A geographical bounding box, used to limit the reporting area.<br /> If the bounding box contains the current map center, the Interface Control will open the dialog for reporting errors in the map data. Setting the bounding box parameter explicitly to `null` has the same effect. By default, if the bounding box doesn't contain the current map's center, the Interface Control will open in the new tab the link to the [OpenStreetMap](https://www.openstreetmap.org/about) edit page.<br /> The bounding box is defined by its southwest and northeast points in longitude and latitude. |
|`position` | string | `'bottom-right'` | Position on the map to which the control will be added.<br/> Valid values are  `'bottom-left'`, and  `'bottom-right'`.|

## How it is made
The `MapReport` is a framework-agnostic plugin built using pure JavaScript ([ECECMAScript 9](https://en.wikipedia.org/wiki/ECMAScript#9th_Edition_–_ECMAScript_2018)) and works across all modern browsers.
The `MapReport` Interface Control is built using [Rollup](https://rollupjs.org/guide/en/) as a JavaScript module bundler.
Supported output builds are
- [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) Immediately Invoked Function Expression
- Standard ES6
- [CommonJS](https://en.wikipedia.org/wiki/CommonJS) for Node.js
- [UMD](https://github.com/umdjs/umd#umd-universal-module-definition) Universal Module Definition
- [AMD](https://requirejs.org/docs/whyamd.html) Asynchronous Module Definition

### Browser compatibility
The `MapReport` is a framework-agnostic plugin built using pure JavaScript ([ECECMAScript 9](https://en.wikipedia.org/wiki/ECMAScript#9th_Edition_–_ECMAScript_2018)) and works across all modern browsers.

However, be aware of the browser compatibilities of the selected client-side map rendering library.

## Building from source
A step-by-step series of examples to get the development environment running:

```
# Clone existing repository
git clone https://github.com/mireo/map-report.git

# Install Node.js https://nodejs.org/en/download/

# install dependencies
npm install

# start the development server with hot reload at http://localhost:4500 and without the JS and CSS minification
npm run dev

# build for production
# produces a production-ready bundle in the dist/ directory, with minification for JS/CSS
npm run build

```
The library build will output the following:
- `dist/map-report.common.js` - a [CommonJS](https://en.wikipedia.org/wiki/CommonJS) bundle for consuming via bundlers
- `dist/map-report.umd.js`: a [UMD](https://github.com/umdjs/umd#umd-universal-module-definition) bundle for consuming directly in browsers or with AMD loaders
- `dist/map-report.umd.min.js`: minified version of the UMD build
- `dist/map-report.css`: extracted CSS file


**Note on mapboxgl dependancy**

The resulting bundle expects that the Mapbox GL JS `mapboxgl` object is already present in the project.

## MapLibre GL JS Support
[MapLibre GL JS](https://github.com/maplibre/maplibre-gl-js) is an open-source map rendering library. It originated as an open-source fork of [mapbox-gl-js](https://github.com/mapbox/mapbox-gl-js), before their switch to a non-OSS license in December 2020. The library is intended to be a drop-in replacement for the Mapbox’s version with additional functionality.

Refer to MapLibre's [Migration from mapbox-gl-js](https://github.com/maplibre/maplibre-gl-js#migrating-from-mapbox-gl) to adjust the plugin. If the project depends on mapbox-gl directly, in most of the cases, one can simply replace `mapbox-gl` with `maplibre-gl` in `package.json`.

## Credits
Maintained and sponsored by [Mireo](#https://www.mireo.com)

Founded in 2001, Mireo is a software development company that designs and develops location data solutions for Mobility of the Future. Mireo designs and develops a broad portfolio of location solutions, from the World's most advanced automotive-grade white-label GPS navigation systems to Connected Car Data monetization frameworks.

[<img height="90" alt="Mireo" src="https://www.mireo.com/img/assets/mireo-logo.svg">](https://www.mireo.hr/)
