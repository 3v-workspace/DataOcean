/* global $, Chart, helper */

const initAllCharts = () => {
  if ($('#report-donut-chart-1').length) {
    const ctx = $('#report-donut-chart-1')[0].getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Yellow', 'Dark'],
        datasets: [{
          data: [15, 10, 65],
          backgroundColor: ['#FF8B26', '#FFC533', '#285FD3'],
          hoverBackgroundColor: ['#FF8B26', '#FFC533', '#285FD3'],
          borderWidth: 2,
          borderColor: '#fff',
        }],
      },
      options: {
        legend: {
          display: false,
        },
        cutoutPercentage: 83,
      },
    });
  }

  if ($('#report-donut-chart-2').length) {
    const ctx = $('#report-donut-chart-2')[0].getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Yellow', 'Dark'],
        datasets: [{
          data: [15, 10, 65],
          backgroundColor: ['#FF8B26', '#FFC533', '#285FD3'],
          hoverBackgroundColor: ['#FF8B26', '#FFC533', '#285FD3'],
          borderWidth: 2,
          borderColor: '#fff',
        }],
      },
      options: {
        legend: {
          display: false,
        },
        cutoutPercentage: 83,
      },
    });
  }

  if ($('.simple-line-chart-1').length) {
    $('.simple-line-chart-1').each(function () {
      const ctx = $(this)[0].getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: '# of Votes',
            data: $(this).data('random') !== undefined ? (
              helper.randomNumbers(0, 5, 12)
            ) : [
              0, 200, 250, 200, 500, 450, 850, 1050, 950, 1100, 900, 1200,
            ],
            borderWidth: 2,
            borderColor: $(this).data('line-color') !== undefined ? $(this).data('line-color') : '#3160D8',
            backgroundColor: 'transparent',
            pointBorderColor: 'transparent',
          }],
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              ticks: {
                display: false,
              },
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              ticks: {
                display: false,
              },
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    });
  }

  if ($('.simple-line-chart-2').length) {
    $('.simple-line-chart-2').each(function () {
      const ctx = $(this)[0].getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: '# of Votes',
            data: $(this).data('random') !== undefined ? helper.randomNumbers(0, 5,
              12) : [0, 300, 400, 560, 320, 600, 720, 850, 690, 805, 1200, 1010],
            borderWidth: 2,
            borderDash: [2, 2],
            borderColor: $(this).data('line-color') !== undefined ? $(this).data('line-color') : '#BCBABA',
            backgroundColor: 'transparent',
            pointBorderColor: 'transparent',
          }],
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              ticks: {
                display: false,
              },
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              ticks: {
                display: false,
              },
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    });
  }

  // Chart widget page
  if ($('#vertical-bar-chart-widget').length) {
    const ctx = $('#vertical-bar-chart-widget')[0].getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Html Template',
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: [0, 200, 250, 200, 500, 450, 850, 1050],
            backgroundColor: '#3160D8',
          },
          {
            label: 'VueJs Template',
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: [0, 300, 400, 560, 320, 600, 720, 850],
            backgroundColor: '#BCBABA',
          },
        ],
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              fontSize: '12',
              fontColor: '#777777',
            },
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
            ticks: {
              fontSize: '12',
              fontColor: '#777777',
              callback(value) {
                return `$${value}`;
              },
            },
            gridLines: {
              color: '#D8D8D8',
              zeroLineColor: '#D8D8D8',
              borderDash: [2, 2],
              zeroLineBorderDash: [2, 2],
              drawBorder: false,
            },
          }],
        },
      },
    });
  }

  if ($('#horizontal-bar-chart-widget').length) {
    const ctx = $('#horizontal-bar-chart-widget')[0].getContext('2d');
    new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Html Template',
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: [0, 200, 250, 200, 500, 450, 850, 1050],
            backgroundColor: '#3160D8',
          },
          {
            label: 'VueJs Template',
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: [0, 300, 400, 560, 320, 600, 720, 850],
            backgroundColor: '#BCBABA',
          },
        ],
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              fontSize: '12',
              fontColor: '#777777',
              callback(value) {
                return `$${value}`;
              },
            },
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
            ticks: {
              fontSize: '12',
              fontColor: '#777777',
            },
            gridLines: {
              color: '#D8D8D8',
              zeroLineColor: '#D8D8D8',
              borderDash: [2, 2],
              zeroLineBorderDash: [2, 2],
              drawBorder: false,
            },
          }],
        },
      },
    });
  }

  if ($('#stacked-bar-chart-widget').length) {
    const ctx = $('#stacked-bar-chart-widget')[0].getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Html Template',
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          backgroundColor: '#3160D8',
          data: helper.randomNumbers(-100, 100, 12),
        }, {
          label: 'VueJs Template',
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          backgroundColor: '#BCBABA',
          data: helper.randomNumbers(-100, 100, 12),
        }],
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                fontSize: '12',
                fontColor: '#777777',
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                fontSize: '12',
                fontColor: '#777777',
                callback(value) {
                  return `$${value}`;
                },
              },
              gridLines: {
                color: '#D8D8D8',
                zeroLineColor: '#D8D8D8',
                borderDash: [2, 2],
                zeroLineBorderDash: [2, 2],
                drawBorder: false,
              },
            },
          ],
        },
      },
    });
  }

  if ($('#line-chart-widget').length) {
    const ctx = $('#line-chart-widget')[0].getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Html Template',
            data: [0, 200, 250, 200, 500, 450, 850, 1050, 950, 1100, 900, 1200],
            borderWidth: 2,
            borderColor: '#3160D8',
            backgroundColor: 'transparent',
            pointBorderColor: 'transparent',
          },
          {
            label: 'VueJs Template',
            data: [0, 300, 400, 560, 320, 600, 720, 850, 690, 805, 1200, 1010],
            borderWidth: 2,
            borderDash: [2, 2],
            borderColor: '#BCBABA',
            backgroundColor: 'transparent',
            pointBorderColor: 'transparent',
          },
        ],
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              fontSize: '12',
              fontColor: '#777777',
            },
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
            ticks: {
              fontSize: '12',
              fontColor: '#777777',
              callback(value) {
                return `$${value}`;
              },
            },
            gridLines: {
              color: '#D8D8D8',
              zeroLineColor: '#D8D8D8',
              borderDash: [2, 2],
              zeroLineBorderDash: [2, 2],
              drawBorder: false,
            },
          }],
        },
      },
    });
  }

  if ($('#donut-chart-widget').length) {
    const ctx = $('#donut-chart-widget')[0].getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Html', 'Vuejs', 'Laravel'],
        datasets: [{
          data: [15, 10, 65],
          backgroundColor: ['#FF8B26', '#FFC533', '#285FD3'],
          hoverBackgroundColor: ['#FF8B26', '#FFC533', '#285FD3'],
          borderWidth: 5,
          borderColor: '#fff',
        }],
      },
      options: {
        cutoutPercentage: 80,
      },
    });
  }

  if ($('#pie-chart-widget').length) {
    const ctx = $('#pie-chart-widget')[0].getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Html', 'Vuejs', 'Laravel'],
        datasets: [{
          data: [15, 10, 65],
          backgroundColor: ['#FF8B26', '#FFC533', '#285FD3'],
          hoverBackgroundColor: ['#FF8B26', '#FFC533', '#285FD3'],
          borderWidth: 5,
          borderColor: '#fff',
        }],
      },
    });
  }
};

export default initAllCharts;
