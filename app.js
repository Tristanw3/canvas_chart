var canvas = document.getElementById("canvas");
var graphics = canvas.getContext("2d");

// TODO: populate this object with the required chart variables as needed.
var chart = {
  // data: [70, 100, 30, 200, 125],
  // data: [700, 1000, 300, 2000, 1250],
  data: [500, 1000, 1500, 2000, 100],
  labels: ["people", "spiders", "mutants", "ants", "oranges"],
  colors: ["red", "green", "blue", "orange", "pink"],
  barWidth: 30
};

chart.maxHeight = Math.max(...chart.data);

function DrawBarChart(chart) {
  // clear the screen for the next frame.
  graphics.clearRect(0, 0, canvas.width, canvas.height);
  // fill rect (position x,position y, width, height)

  graphics.font = "16px sans-serif";

  graphics.strokeStyle = "black";
  graphics.beginPath();
  graphics.moveTo(60, 0);
  graphics.lineTo(60, canvas.height - 40);
  graphics.stroke();

  //Create y-axis
  let mh = chart.maxHeight;
  let ch = canvas.height;
  yLabels = [1 * mh, 0.75 * mh, 0.5 * mh, 0.25 * mh];

  yLabels.forEach((e, i) => {
    let tickPosition = ch * (i / 4) - 40;
    graphics.beginPath();
    graphics.moveTo(60, tickPosition);
    graphics.lineTo(70, tickPosition);
    graphics.stroke();

    graphics.fillStyle = "black";
    let labelPosition = tickPosition + 6;
    graphics.fillText(e, 20, labelPosition);
  });

  chart.data.forEach((ele, ind) => {
    let x = 100 * ind + 80;
    let w = 90;
    let h = (ele / mh) * canvas.height;
    let y = canvas.height - h - 40;

    graphics.globalAlpha = 0.4;
    graphics.fillStyle = chart.colors[ind];
    graphics.fillRect(x, y, w, h);

    graphics.globalAlpha = 1;
    graphics.strokeStyle = chart.colors[ind];
    graphics.strokeRect(x, y, w, h);

    graphics.fillText(chart.labels[ind], x + 20, canvas.height - 16);
  });

  // when we finish rendering, ask the browser to render us again
  requestAnimationFrame(DrawBarChart);
}

function RenderLoop() {
  DrawBarChart(chart);
  requestAnimationFrame(RenderLoop);
}

// start the render loop
RenderLoop();
