# EBMStats

A JavaScript port of the statistics calculator maintained by the Knowledge Translation Program at St. Michael’s Hospital.

The original calculator was designed as a supplementary tool for the book *Evidence-Based Medicine: How to practice and teach it* by Straus, Richardson, Glasziou, & Haynes.

The statistics calculator was created for your own personal use and testing purposes. It is to be used as a guide only. Medical decisions should not be based solely on the results of this program. Although this program has been tested, the accuracy of the information cannot be guaranteed.

© St. Michael’s Hospital

## How to install

```
npm install ebmstats --save
```

## How to use

```
var ebmstats = require('ebmstats');

var a = 1;
var b = 2;
var c = 3;
var d = 4;

// set values
ebmstats.updateValues(a, b, c, d);

// run tests
ebmstats.getRct()               // returns json
ebmstats.getCaseControlStudy()  // returns json
ebmstats.getDiagnosticTest()    // returns json
ebmstats.getProspectiveStudy()  // returns json
```

## How to plot a Post-test Probability Graph

```
ebmstats.plotGraph(svgTemplate, lrPlus, lrMinus, canvasObject);
```

See below for an explanation of the parameters required by the function. lrPlus and lrMinus should be self-explanatory.

### svgTemplate

ebmstats requires an svg template that it can manipulate when processing the lrPlus and lrMinus values, upon which it will draw the position and negative probability curves. A sample template appears below:

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 403 404" enable-background="new 0 0 403 404">
    <path fill="#fff" stroke="#000" stroke-miterlimit="10" d="M363.5 389.7H39.2c-14.6 0-26.5-11.9-26.5-26.5V38.8c0-14.6 11.9-26.5 26.5-26.5h324.3c14.6 0 26.5 11.9 26.5 26.5v324.3c0 14.7-11.9 26.6-26.5 26.6zM350.1 338.3H53.5"/>
    <g fill="none" stroke="#A3A3A3" stroke-miterlimit="10">
        <path d="M83.2 338.3v-.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M83.2 336.8v-294"/>
        <path d="M83.2 42.3v-.5"/>
        <path d="M112.8 338.3v-.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M112.8 336.8v-294"/>
        <path d="M112.8 42.3v-.5"/>
        <path d="M142.5 338.3v-.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M142.5 336.8v-294"/>
        <path d="M142.5 42.3v-.5"/>
        <path d="M172.1 338.3v-.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M172.1 336.8v-294"/>
        <path d="M172.1 42.3v-.5"/>
        <path d="M201.8 338.3v-.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M201.8 336.8v-294"/>
        <path d="M201.8 42.3v-.5"/>
        <path d="M231.4 338.3v-.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M231.4 336.8v-294"/>
        <path d="M231.4 42.3v-.5"/>
        <path d="M261.1 338.3v-.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M261.1 336.8v-294"/>
        <path d="M261.1 42.3v-.5"/>
        <path d="M290.8 338.3v-.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M290.8 336.8v-294"/>
        <path d="M290.8 42.3v-.5"/>
        <path d="M320.4 338.3v-.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M320.4 336.8v-294"/>
        <path d="M320.4 42.3v-.5"/>
        <path d="M350.1 338.3v-.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M350.1 336.8v-294"/>
        <path d="M350.1 42.3v-.5"/>
        <path d="M53.5 71.5h.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M55 71.5h294.1"/>
        <path d="M349.6 71.5h.5"/>
        <path d="M53.5 101.1h.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M55 101.1h294.1"/>
        <path d="M349.6 101.1h.5"/>
        <path d="M53.5 41.8h.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M55 41.8h294.1"/>
        <path d="M349.6 41.8h.5"/>
        <path d="M53.5 130.8h.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M55 130.8h294.1"/>
        <path d="M349.6 130.8h.5"/>
        <path d="M53.5 160.4h.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M55 160.4h294.1"/>
        <path d="M349.6 160.4h.5"/>
        <path d="M53.5 190.1h.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M55 190.1h294.1"/>
        <path d="M349.6 190.1h.5"/>
        <path d="M53.5 219.7h.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M55 219.7h294.1"/>
        <path d="M349.6 219.7h.5"/>
        <path d="M53.5 249.4h.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M55 249.4h294.1"/>
        <path d="M349.6 249.4h.5"/>
        <path d="M53.5 279h.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M55 279h294.1"/>
        <path d="M349.6 279h.5"/>
        <path d="M53.5 308.7h.5"/>
        <path stroke-dasharray="1.0018,1.0018" d="M55 308.7h294.1"/>
        <path d="M349.6 308.7h.5"/>
    </g>
    <g>
        <text transform="translate(248.333 35)" font-family="'Helvetica'" font-size="12">
            Post-test Probability
        </text>
        <text transform="translate(265.333 374)" font-family="'Helvetica'" font-size="12">
            negative (-)
        </text>
        <text transform="translate(36.334 41.822)" font-family="'Helvetica'" font-size="10.982">
            1.0
        </text>
        <text transform="translate(36.334 101.126)" font-family="'Helvetica'" font-size="10.982">
            0.8
        </text>
        <text transform="translate(36.334 160.43)" font-family="'Helvetica'" font-size="10.982">
            0.6
        </text>
        <text transform="translate(36.334 219.733)" font-family="'Helvetica'" font-size="10.982">
            0.4
        </text>
        <text transform="translate(36.334 279.037)" font-family="'Helvetica'" font-size="10.982">
            0.2
        </text>
        <text transform="translate(105.888 350.421)" font-family="'Helvetica'" font-size="10.982">
            0.2
        </text>
        <text transform="translate(165.191 350.421)" font-family="'Helvetica'" font-size="10.982">
            0.4
        </text>
        <text transform="translate(224.495 350.421)" font-family="'Helvetica'" font-size="10.982">
            0.6
        </text>
        <text transform="translate(283.799 350.421)" font-family="'Helvetica'" font-size="10.982">
            0.8
        </text>
        <text transform="translate(343.103 350.421)" font-family="'Helvetica'" font-size="10.982">
            1.0
        </text>
        <text transform="translate(36.334 350.421)" font-family="'Helvetica'" font-size="10.982">
            0.0
        </text>
        <text transform="translate(172.333 374)" font-family="'Helvetica'" font-size="12">
            positive (+)
        </text>
    </g>
    <path fill="none" stroke="#00f" stroke-width="2" stroke-miterlimit="10" d="M233 371h24"/>
    <path fill="none" stroke="#f00" stroke-width="2" stroke-miterlimit="10" d="M326 371h24"/>
    <g transform="translate(53.5, 42)">
        <rect x="0" y="0" width="297" height="296" stroke="black" fill="transparent" stroke-width="1"/>
        <path fill="none" stroke="#f00" stroke-width="2" stroke-miterlimit="10" d="{{red}}"/>
        <path fill="none" stroke="#00f" stroke-width="2" stroke-miterlimit="10" d="{{blue}}"/>
    </g>
</svg>
```

Note the two paths at the bottom of the file. Each path contains a placeholder, either {{red}} or {{blue}}. These placeholders will be replaced with the curve the the code generates.

### canvas

The function also requires a canvas object, so it knows how large to draw the curves. A sample canvas is shown below:

```
var canvas = {
  "width": 297,
  "height": 296
}
```

### Sample application of ebmstats.plotGraph

This code will output the svg of a graph which plots the probability of curves determined by the provided lrPlus and lrMinus, on an svg template, with a graph of width 297 and height 296.

```
var ebmstats = require('ebmstats');

var fs = require("fs");
var fileName = "template/graph.svg"; // path to svgTemplate

fs.exists(fileName, function(exists) {
  if (exists) {
    fs.stat(fileName, function(error, stats) {
      fs.open(fileName, "r", function(error, fd) {
        var buffer = new Buffer(stats.size);

        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
          var data = buffer.toString("utf8", 0, buffer.length);

          fs.close(fd);

          var canvas = {
            "width":297,
            "height":296
          }

          var lrPlus = 0.01;
          var lrMinus = 100;

          console.log(ebmstats.plotGraph(data, lrPlus, lrMinus, canvas));
        });
      });
    });
  }
});
```

Ideal use would be to serve the svg output as part of a web service, but for testing purposes, saved to its own file and run with node, this file's output can be piped to an svg file.

```
node sample.js > myGraph.svg
```