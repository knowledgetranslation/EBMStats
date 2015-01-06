var template =  "<svg>";
    template +=   "<rect fill='lightblue' width='100%' height='100%'/>";
    template +=   "<circle fill='gold' stroke='orange' cx='4em' cy='50%' r='3em'/>";
    template +=   "<text x='90%' y='50%'>";
    template +=   "{{type==='C' ? celsius : Math.round((celsius*1.8)+32) }}°";
    template +=   "</text>";
    template += "</svg>";

var Ractive = require('ractive');
var ractive = new Ractive({
    template: template,
    data: {
      "celsius": 18,
      "type": "F"
    }
});
console.log(ractive.toHTML());