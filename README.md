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

