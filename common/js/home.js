layui.use(['element', 'jquery'], function () {
  const element = layui.element;
  const $ = layui.$;

  var data = {
    labels: ["one", "two", "three", "four", "five", "six"],
    datasets: [{
      label: 'One',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)'
      ],
      borderWidth: 1
    },
    {
      label: 'Two',
      data: [21, 12, 31, 24, 52, 5, 6],
      backgroundColor: [
        'rgba(0, 99, 88, 0.3)'
      ],
      borderColor: [
        // 009688
        'rgba(0, 99, 88, 1)'
      ],
      borderWidth: 1
    }]
  };


  var myLine = new Chart(document.getElementById("ChartHome").getContext("2d"), {
    type: 'line',
    data: data,
  });

});
