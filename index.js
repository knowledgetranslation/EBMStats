var chiSquared = require('chi-squared');
var decimalAdjust = require('decimal-adjust');

var z = 1.959964;

var a = 0;
var b = 0;
var c = 0;
var d = 0;

var lrPlus = 0;
var lrMinus = 0;

var nr1 = 0;
var nr2 = 0;

var nc1 = 0;
var nc2 = 0;

var bigN = 0;


(function(){
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();


function updateValues(newA, newB, newC, newD, newLrPlus, newLrMinus) {
  // check which values have changed
  var aChanged        = (a !== newA);
  var bChanged        = (b !== newB);
  var cChanged        = (c !== newC);
  var dChanged        = (d !== newD);

  var lrPlusChanged   = (lrPlus !== lrPlusChanged);
  var lrMinusChanged  = (lrMinus !== lrMinusChanged);

  a = newA;
  b = newB;
  c = newC;
  d = newD;

  lrPlus = newLrPlus;
  lrMinus = newLrMinus;

  if (aChanged || bChanged) {
    nr1 = a + b;
  }
  if (aChanged || cChanged) {
    nc1 = a + c;
  }
  if (cChanged || dChanged) {
    nc2 = b + d;
  }
  if (cChanged || dChanged) {
    nr2 = c + d;
  }

  bigN = a + b + c + d;
}

function toString() {
  console.log(a + " " + b + " " + c + " " + d + " " + lrPlus + " " + lrMinus + " " + nr1 + " " + nr2 + " " + nc1 + " " + nc2);
}

function getDiagnosticTest() {

  var sensitivity, sensitivityConfidence;
  var specificity, specificityConfidence;
  var ppv, ppvConfidence;
  var npv, npvConfidence;
  var lrPlus, lrPlusLowerLimit, lrPlusUpperLimit;
  var lrMinus, lrMinusLowerLimit, lrMinusUpperLimit;

  if (nc1 === 0 || nc2 === 0 || nr1 === 0 || nr2 === 0) {
    return false;
  }

  sensitivity = a / nc1;
  sensitivityConfidence = _getDiagnosticTestConfidence(a, c, nc1);

  if (typeof sensitivity !== 'number' || isNaN(sensitivity) || typeof sensitivityConfidence !== "object" || sensitivityConfidence === null) {
    return false;
  }

  specificity = d / nc2;
  specificityConfidence = _getDiagnosticTestConfidence(d, b, nc2);

  if (typeof specificity !== 'number' || isNaN(specificity) || typeof specificityConfidence !== "object" || specificityConfidence === null) {
    return false;
  }

  ppv = a / nr1;
  ppvConfidence = _getDiagnosticTestConfidence(a, b, nr1);

  if (typeof ppv !== 'number' || isNaN(ppv) || typeof ppvConfidence !== "object" || ppvConfidence === null) {
    return false;
  }

  npv = d / nr2;
  npvConfidence = _getDiagnosticTestConfidence(d, c, nr2);

  if (typeof ppv !== 'number' || isNaN(ppv) || typeof ppvConfidence !== "object" || ppvConfidence === null) {
    return false;
  }

  if ((1 - specificity) === 0 || specificity === 0 || nc1 * b === 0 || a * nc1 === 0 || b * nc2 === 0 || nc1 * d === 0 || c * nc1 === 0 || d * nc2 === 0) {
    return false;
  }

  lrPlus = sensitivity / (1 - specificity);
  lrPlusLowerLimit = Math.exp(Math.log((nc2 * a) / (nc1 * b)) - (z * Math.sqrt((c / (a * nc1)) + (d / (b * nc2)))));
  lrPlusUpperLimit = Math.exp(Math.log((nc2 * a) / (nc1 * b)) + (z * Math.sqrt((c / (a * nc1)) + (d / (b * nc2)))));

  if (typeof lrPlus !== 'number' || isNaN(lrPlus)) {
    return false;
  }

  if (typeof lrPlusLowerLimit !== 'number' || isNaN(lrPlusLowerLimit)) {
    return false;
  }

  if (typeof lrPlusUpperLimit !== 'number' || isNaN(lrPlusUpperLimit)) {
    return false;
  }

  lrMinus = (1 - sensitivity) / specificity;
  lrMinusLowerLimit = Math.exp(Math.log((nc2 * c) / (nc1 * d)) - (z * Math.sqrt((a / (c * nc1)) + (b / (d * nc2)))));
  lrMinusUpperLimit = Math.exp(Math.log((nc2 * c) / (nc1 * d)) + (z * Math.sqrt((a / (c * nc1)) + (b / (d * nc2)))));

  if (typeof lrMinus !== 'number' || isNaN(lrMinus)) {
    return false;
  }

  if (typeof lrMinusLowerLimit !== 'number' || isNaN(lrMinusLowerLimit)) {
    return false;
  }

  if (typeof lrMinusUpperLimit !== 'number' || isNaN(lrMinusUpperLimit)) {
    return false;
  }

  return {
    'graph': true,
    'sensitivity': Math.round10(sensitivity, -3),
    'sensitivityLowerLimit': Math.round10(sensitivityConfidence['lower'], -3),
    'sensitivityUpperLimit': Math.round10(sensitivityConfidence['upper'], -3),
    'specificity': Math.round10(specificity, 3),
    'specificityLowerLimit': Math.round10(specificityConfidence['lower'], -3),
    'specificityUpperLimit': Math.round10(specificityConfidence['upper'], -3),
    'ppv': Math.round10(ppv, -3),
    'ppvLowerLimit': Math.round10(ppvConfidence['lower'], -3),
    'ppvUpperLimit': Math.round10(ppvConfidence['upper'], -3),
    'npv': Math.round10(npv, -3),
    'npvLowerLimit': Math.round10(npvConfidence['lower'], -3),
    'npvUpperLimit': Math.round10(npvConfidence['upper'], -3),
    'lrPlus': Math.round10(lrPlus, -3),
    'lrPlusLowerLimit': Math.round10(lrPlusLowerLimit, -3),
    'lrPlusUpperLimit': Math.round10(lrPlusUpperLimit, -3),
    'lrMinus': Math.round10(lrMinus, -3),
    'lrMinusLowerLimit': Math.round10(lrMinusLowerLimit, -3),
    'lrMinusUpperLimit': Math.round10(lrMinusUpperLimit, -3)
  };
}

function getDiagnosticTestGraph(lrPlus, lrMinus) {
  // do something to return a graph, a png for example, maybe a binary string so nothing has to save to memory.
}

function getProspectiveStudy() {
  var chiSquared = _getChiSquared();

  var pValue;
  var rr, rrNumerator, rrDenominator, rrrLowerLimit, rrrUpperLimit;

  var arr, arrConfidence;
  var nnt, nntConfidence;

  if (typeof chiSquared !== 'number' || isNaN(chiSquared)) {
    return false;
  }

  pValue = _getPValue(chiSquared);

  if (typeof pValue !== 'number' || isNaN(pValue)) {
    return false;
  }

  rrNumerator = a * (c + d);
  rrDenominator = c * (a + b);

  if (typeof rrDenominator !== 'number' || isNaN(rrDenominator)) {
    return false;
  }

  rr = rrNumerator / rrDenominator;

  if (typeof rr !== 'number' || isNaN(rr)) {
    return false;
  }

  if (c === 0 || (c + d) === 0 || a === 0 || a + b === 0) {
    return false
  }

  rrLowerLimit = Math.exp(Math.log(rr) - (z * Math.sqrt((1 / c) - (1 / (c + d)) + (1 / a) - (1 / (a + b)))));
  rrUpperLimit = Math.exp(Math.log(rr) + (z * Math.sqrt((1 / c) - (1 / (c + d)) + (1 / a) - (1 / (a + b)))));

  if (typeof rrLowerLimit !== 'number' || isNaN(rrLowerLimit)) {
    return false;
  }
  if (typeof rrUpperLimit !== 'number' || isNaN(rrUpperLimit)) {
    return false;
  }

  arr = _getArr();
  arrConfidence = _getArrConfidence(arr);

  if (typeof arr !== 'number' || isNaN(arr)) {
    return false;
  }

  if (typeof arrConfidence !== 'object' || arrConfidence === null) {
    return false;
  }

  nnt = _getNnt(arr);
  nntConfidence = _getNntConfidence(arrConfidence);

  if (typeof nnt !== 'number' || isNaN(nnt)) {
    return false;
  }

  if (typeof nntConfidence !== 'object' || nntConfidence === null) {
    return false;
  }

  return {
    'chiSquared': Math.round10(chiSquared, -3),
    'pValue': Math.round10(pValue, -3),
    'rr': Math.round10(rr, -3),
    'rrLowerLimit': Math.round10(rrLowerLimit, -3),
    'rrUpperLimit': Math.round10(rrUpperLimit, -3),
    'arr': Math.round10(arr, -3),
    'arrLowerLimit': Math.round10(arrConfidence['lower'], -3),
    'arrUpperLimit': Math.round10(arrConfidence['upper'], -3),
    'nnt': Math.round10(nnt, -3),
    'nntLowerLimit': Math.round10(nntConfidence['lower'], -3),
    'nntUpperLimit': Math.round10(nntConfidence['upper'], -3)
  };
}

function getCaseControlStudy() {
  var chiSquared = _getChiSquared();

  var pValue;
  var orNumerator, orDenominator, or;
  var orLowerLimit, orUpperLimit;

  if (typeof chiSquared !== 'number' || isNaN(chiSquared)) {
    return false;
  }

  pValue = _getPValue(chiSquared);

  if (typeof pValue !== 'number' || isNaN(pValue)) {
    return false;
  }

  orNumerator = a * d;
  orDenominator = b * c;

  if (orDenominator === 0) {
    return false;
  }

  or = orNumerator / orDenominator;

  if (typeof or !== 'number' || isNaN(or)) {
    return false;
  }

  if (a === 0 || b === 0 || c === 0 || d === 0) {
    return false;
  }

  orLowerLimit = Math.exp(Math.log(or) - (z * Math.sqrt((1 / a) + (1 / b) + (1 / c) + (1 / d))));
  orUpperLimit = Math.exp(Math.log(or) + (z * Math.sqrt((1 / a) + (1 / b) + (1 / c) + (1/d))));

  if (typeof orLowerLimit !== 'number' || isNaN(orLowerLimit)) {
    return false;
  }

  if (typeof orUpperLimit !== 'number' || isNaN(orUpperLimit)) {
    return false;
  }

  return {
    "chiSquared": Math.round10(chiSquared, -3),
    "pValue": Math.round10(pValue, -3),
    "or": Math.round10(or, -3),
    "orLowerLimit": Math.round10(orLowerLimit, -3),
    "orUpperLimit": Math.round10(orUpperLimit, -3)
  };
}

function getRct() {
  var chiSquared = _getChiSquared();
  var pValue;
  var rrr, rrrNumerator, rrrDenominator;
  var rrrLowerLimit, rrrUpperLimit;
  var arr, arrConfidence;
  var nnt, nntConfidence;

  if (typeof chiSquared !== 'number' || isNaN(chiSquared)) {
    return false;
  }

  pValue = _getPValue(chiSquared);

  if (typeof pValue !== 'number' || isNaN(pValue)) {
    return false;
  }

  if ((c + d) === 0 || (a + b) === 0) {
    return false;
  }

  rrrNumerator = (c / (c + d)) - (a / (a + b));
  rrrDenominator = c / (c + d);

  if (rrrDenominator === 0) {
    return false;
  }

  rrr = rrrNumerator / rrrDenominator;

  if (typeof rrr !== 'number' || isNaN(rrr)) {
    return false;
  }

  if ((c * (a + b)) === 0 || c === 0 || (c + d) === 0 || a === 0 || (a + b) === 0) {
    return false;
  }

  rrrLowerLimit = 1 - (Math.exp(Math.log((a * (c+d)) / (c * (a + b))) + z * Math.sqrt((1 / c) - (1 / (c + d)) + (1 / a) - (1 / (a + b)))));
  rrrUpperLimit = 1 - (Math.exp(Math.log((a * (c+d)) / (c * (a + b))) - z * Math.sqrt((1 / c) - (1 / (c + d)) + (1 / a) - (1 / (a + b)))));

  if (typeof rrrLowerLimit !== 'number' || isNaN(rrrLowerLimit)) {
    return false;
  }

  if (typeof rrrUpperLimit !== 'number' || isNaN(rrrUpperLimit)) {
    return false;
  }

  arr = _getArr();
  arrConfidence = _getArrConfidence(arr);

  if (typeof arr !== 'number' || isNaN(arr)) {
    return false;
  }

  if (typeof arrConfidence !== 'object' || arrConfidence === null) {
    return false;
  }

  nnt = _getNnt(arr);
  nntConfidence = _getNntConfidence(arrConfidence);

  if (typeof nnt !== 'number' || isNaN(nnt)) {
    return false;
  }

  if (typeof nntConfidence !== 'object' || nntConfidence === null) {
    return false;
  }

  return {
    "chiSquared": Math.round10(chiSquared, -3),
    "pValue": Math.round10(pValue, -3),
    "rrr": Math.round10(rrr, -3),
    "rrrLowerLimit": Math.round10(rrrLowerLimit, -3),
    "rrrUpperLimit": Math.round10(rrrUpperLimit, -3),
    "arr": Math.round10(arr, -3),
    "arrLowerLimit": Math.round10(arrConfidence['lower'], -3),
    "arrUpperLimit": Math.round10(arrConfidence['upper'], -3),
    "nnt": Math.round10(nnt, -3),
    "nntLowerLimit": Math.round10(nntConfidence['lower'], -3),
    "nntUpperLimit": Math.round10(nntConfidence['upper'], -3)
  };
}

function _getDiagnosticTestConfidence(y, t, n) {
  var lowerNumerator, upperNumerator, denominator;
  var newUpper, newLower;

  if (typeof y !== 'number' || isNaN(y)) {
    return false;
  }
  if (typeof t !== 'number' || isNaN(t)) {
    return false;
  }
  if (typeof n !== 'number' || isNaN(n)) {
    return false;
  }

  if (n === 0) {
    return false;
  }

  lowerNumerator = (2 * y) + Math.pow(z, 2) - (z * Math.sqrt((4 * y * t / n) + Math.pow(z, 2)));
  upperNumerator = (2 * y) + Math.pow(z, 2) + (z * Math.sqrt((4 * y * t / n) + Math.pow(z, 2)));
  denominator = (2 * n) + (2 * Math.pow(z, 2));

  if (denominator === 0) {
    return false;
  }

  newUpper = upperNumerator / denominator;
  newLower = lowerNumerator / denominator;

  if (typeof newLower !== 'number' || isNaN(newLower)) {
    return false;
  }
  if (typeof newUpper !== 'number' || isNaN(newUpper)) {
    return false;
  }

  return {
    "upper": newUpper,
    "lower": newLower
  };
}

function _getChiSquared() {
  var chiSquaredNumerator;
  var chiSquaredDenominator;
  var chiSquared;

  chiSquaredNumerator = bigN * Math.pow((Math.abs((a * d) - (b * c)) - (bigN / 2)), 2);
  chiSquaredDenominator = nr1 * nr2 * nc1 * nc2;

  chiSquared = chiSquaredNumerator / chiSquaredDenominator;

  if (typeof chiSquared !== 'number' || isNaN(chiSquared)) {
    return false;
  }

  return chiSquared;
}

function _getPValue(chiVal) {
  if (typeof chiVal !== 'number' || isNaN(chiVal)) {
    return false;
  }

  return 1 - chiSquared.cdf(chiVal, 1);
}

function _getArr() {
  var arr;

  if (c + d === 0) {
    return false;
  }
  if (a + b === 0) {
    return false;
  }

  arr = (c / (c + d)) - (a / (a + b));

  if (typeof arr !== 'number' || isNaN(arr)) {
    return false;
  }

  return arr;
}

function _getArrConfidence(arr) {
  var u1Numerator, u1Denominator, u1;
  var u2Numerator, u2Denominator, u2;
  var w1Numerator, w1Denominator, w1;
  var w2Numerator, w2Denominator, w2;

  var newUpper, newLower;

  if (typeof arr !== 'number' || isNaN(arr)) {
    return false;
  }

  if (nr1 === 0 || nr2 === 0) {
    return false;
  }

  u1Numerator = (2 * c) + Math.pow(z, 2) + (z * Math.sqrt((4 * c * d / nr2) + Math.pow(z, 2)));
  u1Denominator = (2 * nr2) + (2 * Math.pow(z, 2));

  if (u1Denominator === 0) {
    return false;
  }

  u1 = u1Numerator / u1Denominator;

  u2Numerator = (2 * a) + Math.pow(z, 2) + (z * Math.sqrt((4 * a * b / nr1) + Math.pow(z, 2)));
  u2Denominator = (2 * nr1) + (2 * Math.pow(z, 2));

  if (u2Denominator === 0) {
    return false;
  }

  u2 = u2Numerator / u2Denominator;

  w1Numerator = (2 * c) + Math.pow(z, 2) - (z * Math.sqrt((4 * c * d / nr2) + Math.pow(z, 2)));
  w1Denominator = (2 * nr2) + (2 * Math.pow(z, 2));

  if (w1Denominator === 0) {
    return false;
  }

  w1 = w1Numerator / w1Denominator;

  w2Numerator = (2 * a) + Math.pow(z, 2) - (z * Math.sqrt((4 * a * b / nr1) + Math.pow(z, 2)));
  w2Denominator = (2 * nr1) + (2 * Math.pow(z, 2));

  if (w2Denominator === 0) {
    return false;
  }

  w2 = w2Numerator / w2Denominator;

  newLower = arr - (z * Math.sqrt((u2 * (1 - u2) / (a + b)) + (w1 * (1 - w1) / (c + d))));
  newUpper = arr + (z * Math.sqrt((u1 * (1 - u1) / (c + d)) + (w2 * (1 - w2) / (a + b))));


  if (typeof newLower !== 'number' || isNaN(newLower)) {
    return false;
  }

  if (typeof newUpper !== 'number' || isNaN(newUpper)) {
    return false;
  }

  return {
    "lower": newLower,
    "upper": newUpper
  };
}

function _getNnt(arr) {
  var nnt;

  if (typeof arr !== 'number' || isNaN(arr)) {
    return false;
  }

  if (arr === 0) {
    return false;
  }

  nnt = Math.floor10(1 / arr);

  if (typeof nnt !== 'number' || isNaN(nnt)) {
    return false;
  }

  return nnt;
}

function _getNntConfidence(arrConfidence) {
  var newUpper, newLower;

  if (typeof arrConfidence !== "object" || arrConfidence === null) {
    return false;
  }

  if (typeof arrConfidence['upper'] !== 'number' || isNaN(arrConfidence['upper'])) {
    return false;
  }

  if (typeof arrConfidence['lower'] !== 'number' || isNaN(arrConfidence['lower'])) {
    return false;
  }

  if (arrConfidence['upper'] === 0) {
    return false;
  }

  if (arrConfidence['lower'] === 0) {
    return false;
  }

  newUpper = Math.round10((1 / arrConfidence['upper']), -1);
  newLower = Math.round10((1 / arrConfidence['lower']), -1);

  if (typeof newUpper !== 'number' || isNaN(newUpper)) {
    return false;
  }

  if (typeof newLower !== 'number' || isNaN(newLower)) {
    return false;
  }

  return {
    "lower": newLower,
    "upper": newUpper
  };
}

module.exports = {
  updateValues: updateValues,
  getDiagnosticTest: getDiagnosticTest,
  getCaseControlStudy: getCaseControlStudy,
  getRct: getRct,
  getProspectiveStudy: getProspectiveStudy
}