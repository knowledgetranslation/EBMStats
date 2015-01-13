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

### Diagnostic Test

The diagnostic test accepts the following JSON object:

```
var testValues = {
  "testPositiveDisease":1,
  "testPositiveNoDisease":2,
  "testNegativeDisease":3,
  "testNegativeNoDisease":4
}
```
Calling
```
ebmstats.getDiagnosticTest(testValues);
```
Returns
```
{
  "graph":true,
  "sensitivity":0.333,
  "sensitivityLowerLimit":0.061,
  "sensitivityUpperLimit":0.792,
  "specificity":0.571,
  "specificityLowerLimit":0.25,
  "specificityUpperLimit":0.842,
  "ppv":0.25,
  "ppvLowerLimit":0.046,
  "ppvUpperLimit":0.699,
  "npv":0.667,
  "npvLowerLimit":0.3,
  "npvUpperLimit":0.903,
  "lrPlus":0.778,
  "lrPlusLowerLimit":0.127,
  "lrPlusUpperLimit":4.774,
  "lrMinus":1.167,
  "lrMinusLowerLimit":0.418,
  "lrMinusUpperLimit":3.254
}
```

### Prospective Test

The prospective test accepts the following JSON object:

```
var testValues = {
  "treatedDisease":1,
  "treatedNoDisease":2,
  "notTreatedDisease":3,
  "notTreatedNoDisease":4
}
```
Calling
```
ebmstats.getProspectiveTest(testValues);
```
Returns
```
{
  "chiSquared":0.179,
  "pValue":0.673,
  "rr":0.778,
  "rrLowerLimit":0.127,
  "rrUpperLimit":4.774,
  "arr":0.095,
  "arrLowerLimit":-0.437,
  "arrUpperLimit":0.516,
  "nnt":10,
  "nntLowerLimit":-2.3,
  "nntUpperLimit":1.9
}
```

### Case-Control Study

The case-control study accepts the following JSON object:

```
var testValues = {
  "caseExposed":1,
  "caseNotExposed":2,
  "controlExposed": 3,
  "controlNotExposed": 4
}
```
Calling
```
ebmstats.getProspectiveTest(testValues);
```
Returns
```
{
  "chiSquared":0.179,
  "pValue":0.673,
  "or":0.667,
  "orLowerLimit":0.039,
  "orUpperLimit":11.285
}
```

### Randomized Control Study

The randomized control study accepts the following JSON object:

```
var testValues = {
  "experimentalOutcome":1,
  "experimentalNoOutcome":2,
  "controlOutcome":3,
  "controlNoOutcome":4
}
```
Calling
```
ebmstats.getProspectiveTest(testValues);
```
Returns
```
{
  "chiSquared":0.179,
  "pValue":0.673,
  "rrr":0.222,
  "rrrLowerLimit":-3.774,
  "rrrUpperLimit":0.873,
  "arr":0.095,
  "arrLowerLimit":-0.437,
  "arrUpperLimit":0.516,
  "nnt":10,
  "nntLowerLimit":-2.3,
  "nntUpperLimit":1.9
}
```