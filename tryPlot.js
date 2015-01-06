var ebmstats = require('./index.js');

ebmstats.updateValues(1, 2, 3, 4, 0.01, 100);

//ebmstats.getDiagnosticTestGraph(0.1, 10);



function drawGraph() {
  // import the template
  var fs = require("fs");
  var fileName = "template/graph.svg";

  fs.exists(fileName, function(exists) {
    if (exists) {
      fs.stat(fileName, function(error, stats) {
        fs.open(fileName, "r", function(error, fd) {
          var buffer = new Buffer(stats.size);

          fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
            var data = buffer.toString("utf8", 0, buffer.length);

            fs.close(fd);

            canvas = {
              "width":297,
              "height":296
            }
            console.log(ebmstats.plotGraph(data, 0.01, 100, canvas));
          });
        });
      });
    }
  });
}

drawGraph();