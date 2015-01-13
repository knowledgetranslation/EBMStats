var should = require('chai').should(),
    ebmstats = require('../index');

describe('Rct Test', function() {
  it('returns expected value', function() {

    var expectedValue = {
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
    };

    JSON.stringify(ebmstats.getRct({"experimentalOutcome":1, "experimentalNoOutcome":2, "controlOutcome":3, "controlNoOutcome":4})).should.equal(JSON.stringify(expectedValue));
  })
})

describe('Diagnostic Test', function() {
  it('returns expected value', function() {
    var expectedValue = {
      "graph":true,
      "sensitivity":0.25,
      "sensitivityLowerLimit":0.046,
      "sensitivityUpperLimit":0.699,
      "specificity":0.667,
      "specificityLowerLimit":0.3,
      "specificityUpperLimit":0.903,
      "ppv":0.333,
      "ppvLowerLimit":0.061,
      "ppvUpperLimit":0.792,
      "npv":0.571,
      "npvLowerLimit":0.25,
      "npvUpperLimit":0.842,
      "lrPlus":0.75,
      "lrPlusLowerLimit":0.098,
      "lrPlusUpperLimit":5.768,
      "lrMinus":1.125,
      "lrMinusLowerLimit":0.505,
      "lrMinusUpperLimit":2.504
    };

    JSON.stringify(ebmstats.getDiagnosticTest({"testPositiveDisease": 1, "testPositiveNoDisease": 2, "testNegativeDisease": 3, "testNegativeNoDisease": 4})).should.equal(JSON.stringify(expectedValue));
  })
})

describe('Case Control Study Test', function() {
  it('returns expected value', function() {
    var expectedValue = {
      "chiSquared":0.179,
      "pValue":0.673,
      "or":0.667,
      "orLowerLimit":0.039,
      "orUpperLimit":11.285
    };

    JSON.stringify(ebmstats.getCaseControlStudy({"caseExposed":1, "caseNotExposed":2, "controlExposed": 3, "controlNotExposed": 4})).should.equal(JSON.stringify(expectedValue));
  })
})

describe('Prospective Study Test', function() {
  it('returns expected values', function() {
    var expectedValue = {
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
    };

    JSON.stringify(ebmstats.getProspectiveStudy({"treatedDisease":1, "treatedNoDisease":2, "notTreatedDisease":3, "notTreatedNoDisease":4})).should.equal(JSON.stringify(expectedValue));
  })
})