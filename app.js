var canvas = document.getElementById("canvas");
var graphics = canvas.getContext("2d");

// TODO: populate this object with the required chart variables as needed.
var chart = {
  // data: [70, 100, 30, 200, 125],
  // data: [700, 1000, 300, 2000, 1250],
  // data: [500, 1000, 1500, 2000, 200],
  data: [1359, 5, 5, 4, 3, 3],
  // data: [5, 5, 4, 3, 3],
  // labels: ["people", "spiders", "mutants", "ants", "oranges"],
  labels: ["China", "Hong Kong", "Thailand", "Australia", "France", "Japan"],
  // labels: ["Hong Kong", "Thailand", "Australia", "France", "Japan"],

  colors: ["red", "green", "blue", "orange", "pink", "cyan"],
  // colors: ["green", "blue", "orange", "pink", "cyan"],
  barWidth: 30
};


function run(china) {
  if (china === "yes") {
    chart.data = [1359, 5, 5, 4, 3, 3]
    chart.labels = ["China", "Hong Kong", "Thailand", "Australia", "France", "Japan"]
    chart.colors = ["red", "green", "blue", "orange", "pink", "grey"]
  } else {
    chart.data = [5, 5, 4, 3, 3];
    chart.labels = ["Hong Kong", "Thailand", "Australia", "France", "Japan"];
    chart.colors = ["green", "blue", "orange", "pink", "grey"];
  }


  let mh = Math.max(...chart.data);
  let ch = canvas.height - 50;

  function DrawBarChart(chart) {
    // clear the screen for the next frame.
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    // fill rect (position x,position y, width, height)

    graphics.font = "16px Arial";

    graphics.strokeStyle = "black";
    graphics.beginPath();
    graphics.moveTo(60, 19);
    graphics.lineTo(60, ch + 20);
    graphics.stroke();

    //Create y-axis

    let yLabels = [1 * mh, 0.75 * mh, 0.5 * mh, 0.25 * mh, 0];

    yLabels.forEach((e, i) => {
      let tickPosition = ch * (i / 4) + 20;
      graphics.beginPath();
      graphics.moveTo(60, tickPosition);
      graphics.lineTo(70, tickPosition);
      graphics.stroke();

      graphics.fillStyle = "black";
      let labelPosition = tickPosition + 6;


      let numPosition;
      if (e >= 0) {
        numPosition = 45;
      }
      if (e >= 10) {
        numPosition = 37;
      }
      if (e >= 100) {
        numPosition = 27;
      }
      if (e >= 1000) {
        numPosition = 17;
      }


      graphics.fillText(Math.round(e), numPosition, labelPosition);
    });

    chart.data.forEach((ele, ind) => {
      let w = 500 / chart.data.length;
      let x = (w + 10) * ind + 80;
      let h = (ele / mh) * ch;
      let y = ch - h + 20;

      graphics.globalAlpha = 0.4;
      graphics.fillStyle = chart.colors[ind];
      graphics.fillRect(x, y, w, h);

      graphics.globalAlpha = 1;
      graphics.strokeStyle = chart.colors[ind];
      graphics.strokeRect(x, y, w, h);

      graphics.fillText(chart.labels[ind], x + 5, ch + 37);
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

}

run("yes");