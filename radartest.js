/******************************************************************************
 * window.radarchart.createRadarChartFactory(canvasSize, maxRadius, numAxes)
 *   -> returns a radar chart factory
 *
 * factory.chart(data)
 *   -> returns an HTML canvas with the data charted out
******************************************************************************/
let factory = window.radarchart.createRadarChartFactory(400, 150, 6);
let canvas = factory.chart([60, 90, 55, 90, 80, 110]);

document.getElementById('canvasContainer').appendChild(canvas);
