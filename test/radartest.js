/******************************************************************************
 * window.radarchart.createRadarChartFactory(canvasSize, maxRadius, numAxes)
 *   -> returns a radar chart factory
 *
 * factory.chart(data)
 *   -> returns an HTML canvas with the data charted out
******************************************************************************/

function renderChart() {
  let valuesStr = document.getElementById('values').value;
  let data = valuesStr.replace(/\s/g, '').split(',').map(x => parseInt(x, 10));

  let factory = window.radarchart.createRadarChartFactory(400, 150, data.length);
  let canvas = factory.chart(data);

  let container = document.getElementById('canvasContainer');
  container.innerHTML = '';
  container.appendChild(canvas);

  return false;
}

// initial chart
renderChart();
