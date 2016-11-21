/******************************************************************************
 * window.radarchart.createRadarChartFactory() -> returns a radar chart factory
 *
 * factory.chart(data) -> returns an HTML canvas with the data charted out
******************************************************************************/
window.radarchart = (function() {
  function createRadarChartFactory(canvasSize, maxRadius, numAxes) {
    if (numAxes < 3) {
      throw new Error("Radar charts must have at least three axes");
    }
    else {
      return (function() {
        let halfLength = canvasSize / 2;
        let origin = { x: halfLength, y: halfLength };

        function chart(data) {
          const canvas = createCanvas(canvasSize);
          const context = canvas.getContext("2d");

          // draw the outer polygon
          context.beginPath();
          drawPolygonPath(context, origin, maxRadius, numAxes);
          context.fillStyle="rgba(51, 128, 255, 0.1)";
          context.fill();
          context.stroke();

          context.strokeStyle="rgba(51, 128, 255, 0.5)";

          // draw 1/3 polygon
          context.beginPath();
          drawPolygonPath(context, origin, maxRadius/3, numAxes);
          context.stroke();

          // draw 2/3 polygon
          context.beginPath();
          drawPolygonPath(context, origin, 2*maxRadius/3, numAxes);
          context.stroke();

          // draw axes
          context.strokeStyle="rgba(51, 128, 255, 1)";
          drawAxes(context, origin, maxRadius, numAxes);

          context.strokeStyle="black";

          // draw the jagged stat spread
          context.beginPath();
          drawPath(context, origin, data);
          context.fillStyle="rgba(51, 128, 255, 0.85)";
          context.fill();
          context.stroke();

          return canvas;
        }

        function createCanvas(canvasSize) {
          let canvas = document.createElement('canvas');
          canvas.height = canvasSize;
          canvas.width = canvasSize;
          return canvas;
        }

        function drawPolygonPath(ctx, origin, radius, numSides) {
          var radii = [];
          for (var i = 0; i < numSides; i++) radii.push(radius);
          drawPath(ctx, origin, radii)
        }

        function drawPath(ctx, origin, radii) {
          ctx.save();

          // total angle of a circle divided by number of axes
          var angleIncrement = (2 * Math.PI) / radii.length;

          ctx.translate(origin.x, origin.y);
          ctx.rotate(-Math.PI / 2);

          ctx.moveTo(radii[0], 0);
          for (var i = 1; i < radii.length; i++) {
            ctx.lineTo(
              radii[i] * Math.cos(angleIncrement * i),
              radii[i] * Math.sin(angleIncrement * i));
          }
          ctx.closePath();

          ctx.restore();
        }

        function drawAxes(ctx, origin, radius, numSides) {
          if (numSides < 3) return;

          var a = (Math.PI * 2) / numSides;

          ctx.save();

          ctx.translate(origin.x, origin.y);
          ctx.rotate(-Math.PI/2);

          for (var i = 0; i < numSides; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);

            let x = radius * Math.cos(a * i);
            let y = radius * Math.sin(a * i);
            ctx.lineTo(x, y);
            ctx.stroke();
          }

          ctx.restore();
        }

        return { chart: chart };
      })();
    }
  }

  return { createRadarChartFactory: createRadarChartFactory };
})();
