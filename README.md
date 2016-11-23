# Radarchart

Script for generating radar charts using JS and HTML canvas.

First, create a radar chart factory:
```javascript
let radarchart = require('radarchart');

let factory = radarchart.createRadarChartFactory(canvasSize, maxRadius, numAxes);
```

Where `canvasSize` is a number representing the desired side length of the canvas, `maxRadius` is the maximum value to be plotted on the radar chart, and `numAxes` is the number of axes to be charted.

Then, generate an HTML canvas containing a radar chart for a given set of data:
```javascript
let canvas = factory.chart(data);
```

Where data is an array of length `numAxes` where each value corresponds to an axis of the radar chart.
The axes are plotted starting at the top (i.e., the "12 o'clock position") and going clockwise.

After creating a factory with the given initial parameters, `factory.chart` can be called repeatedly with different data to graph various values with the same overall format. Each invocation generates a new HTML canvas element.
