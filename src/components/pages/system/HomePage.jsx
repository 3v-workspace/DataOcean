/* global $, Chart, helper */
import React, { useEffect } from 'react';
import {
  Briefcase,
  Calendar,
  CheckSquare,
  ChevronDown,
  ChevronLeft, ChevronRight,
  ChevronUp, CreditCard, Database, File,
  FileText,
  MapPin, Monitor, Plus,
  RefreshCcw, ShoppingCart,
  Trash2, User,
} from 'react-feather';
import ReportBox from 'components/pages/dashboard/ReportBox';

const HomePage = () => {
  useEffect(() => {
    if ($('#report-line-chart').length) {
      const ctx = $('#report-line-chart')[0].getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: [
            'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
            'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень',
          ],
          datasets: [
            {
              label: 'API Запити',
              data: [0, 200, 250, 200, 500, 450, 850, 1050, 950, 1100, 900, 1200],
              borderWidth: 2,
              borderColor: '#3160D8',
              backgroundColor: 'transparent',
              pointBorderColor: 'transparent',
            },
            // {
            //   label: '# of Votes',
            //   data: [0, 300, 400, 560, 320, 600, 720, 850, 690, 805, 1200, 1010],
            //   borderWidth: 2,
            //   borderDash: [2, 2],
            //   borderColor: '#BCBABA',
            //   backgroundColor: 'transparent',
            //   pointBorderColor: 'transparent',
            // },
          ],
        },
        options: {
          legend: {
            display: false,
          },
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
                // callback(value) {
                //   return `$${value}`;
                // },
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

    if ($('#report-pie-chart').length) {
      const ctx = $('#report-pie-chart')[0].getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: [
            '52.01', '62.01', '62.01', '62.02', '62.03',
            '52.02', '62.04', '62.05', '62.05', '62.04',
          ],
          datasets: [{
            data: [350, 256, 458, 41, 145, 478, 124, 478],
            backgroundColor: [
              '#FF8B26', '#FFC533', '#285FD3', '#003c5c', '#33477a',
              '#6a4d8d', '#6a4d8d', '#d54e82', '#f85c66', '#ff7c41',
            ],
            hoverBackgroundColor: ['#FF8B26', '#FFC533', '#285FD3'],
            borderWidth: 2,
            borderColor: '#fff',
          }],
        },
        options: {
          legend: {
            display: false,
          },
        },
      });
    }

    if ($('#report-donut-chart').length) {
      const ctx = $('#report-donut-chart')[0].getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [
            'Дочірнє підприємство', 'Закрите акціонерне товариство',
            'Інші організаційно-правові форми', 'товариство з обмеженою відповідальністю',
            'Виробничий кооператив', 'Державна організація (установа, заклад)',
            'Приватне підприємство', 'Релігійна організація',
          ],
          datasets: [{
            data: [
              120, 101, 321, 86, 84, 230, 150, 96,
            ],
            backgroundColor: [
              '#FF8B26', '#FFC533', '#285FD3', '#285FD3',
              '#33477a', '#d54e82', '#f85c66', '#003c5c',
            ],
            hoverBackgroundColor: ['#FF8B26', '#FFC533', '#285FD3'],
            borderWidth: 5,
            borderColor: '#fff',
          }],
        },
        options: {
          legend: {
            display: false,
          },
          cutoutPercentage: 60,
        },
      });
    }

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
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xxl:col-span-9 grid grid-cols-12 gap-6">
          <div className="col-span-12 mt-8">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Загальний звіт
              </h2>
              <a href="#" className="ml-auto flex text-theme-1 dark:text-theme-10">
                <RefreshCcw className="w-4 h-4 mr-3" /> Оновити
              </a>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <ReportBox
                  label="Реєстрація підприємств"
                  value="264"
                  subText="18%"
                  subTextDirection="up"
                  icon={<File className="report-box__icon text-theme-10" />}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <ReportBox
                  label="Нові ФОП"
                  value="176"
                  subText="16%"
                  subTextDirection="up"
                  icon={<Briefcase className="report-box__icon text-theme-11" />}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <ReportBox
                  label="Всього наборів даних"
                  value="5"
                  subText="+5"
                  subTextDirection="up"
                  icon={<Database className="report-box__icon text-theme-12" />}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <ReportBox
                  label="Кількість користувачів"
                  value="10"
                  subText="+7"
                  subTextDirection="up"
                  icon={<User className="report-box__icon text-theme-9" />}
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 mt-8">
            <div className="intro-y block sm:flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Використання API
              </h2>
              <div className="sm:ml-auto mt-3 sm:mt-0 relative text-gray-700">
                <Calendar className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0" />
                <input type="text" data-daterange="true" className="datepicker input w-full sm:w-56 box pl-10" />
              </div>
            </div>
            <div className="intro-y box p-5 mt-12 sm:mt-5">
              <div className="flex flex-col xl:flex-row xl:items-center">
                <div className="flex">
                  <div>
                    <div className="text-theme-20 text-lg xl:text-xl font-bold">9 458</div>
                    <div className="text-gray-600">Цей місяць</div>
                  </div>
                  <div className="w-px h-12 border border-r border-dashed border-gray-300 mx-4 xl:mx-6" />
                  <div>
                    <div className="text-gray-600 text-lg xl:text-xl font-medium">5 423</div>
                    <div className="text-gray-600">Попередній місяць</div>
                  </div>
                </div>
              </div>
              <div> {/* className="report-chart"> */}
                <canvas id="report-line-chart" height="160" className="mt-6" />
              </div>
            </div>
          </div>


          <div className="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                ТОП КВЕДів
              </h2>
              <a href="#" className="ml-auto text-theme-1 truncate">Всі</a>
            </div>
            <div className="intro-y box p-5 mt-5">
              <canvas className="mt-3" id="report-pie-chart" height="280" />
              <div className="mt-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-theme-11 rounded-full mr-3" />
                  <span className="truncate">KVED 1</span>
                  <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden" />
                  <span className="font-medium xl:ml-auto">30%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-theme-1 rounded-full mr-3" />
                  <span className="truncate">KVED 2</span>
                  <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden" />
                  <span className="font-medium xl:ml-auto">29%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-theme-12 rounded-full mr-3" />
                  <span className="truncate">KVED 3</span>
                  <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden" />
                  <span className="font-medium xl:ml-auto">25%</span>
                </div>
              </div>
            </div>
          </div>


          <div className="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Типи компаній
              </h2>
              <a href="#" className="ml-auto text-theme-1 truncate">Всі</a>
            </div>
            <div className="intro-y box p-5 mt-5">
              <canvas className="mt-3" id="report-donut-chart" height="280" />
              <div className="mt-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-theme-11 rounded-full mr-3" />
                  <span className="truncate">Інші організаційно-правові форми</span>
                  <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden" />
                  <span className="font-medium xl:ml-auto">30%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-theme-1 rounded-full mr-3" />
                  <span className="truncate">Державна організація (установа, заклад)</span>
                  <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden" />
                  <span className="font-medium xl:ml-auto">26%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-theme-12 rounded-full mr-3" />
                  <span className="truncate">Приватне підприємство</span>
                  <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden" />
                  <span className="font-medium xl:ml-auto">20%</span>
                </div>
              </div>
            </div>
          </div>


          <div className="col-span-12 xl:col-span-8 mt-6">
            <div className="intro-y block sm:flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Official Store
              </h2>
              <div className="sm:ml-auto mt-3 sm:mt-0 relative text-gray-700">
                <MapPin className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0" />
                <input type="text" className="input w-full sm:w-40 box pl-10" placeholder="Filter by city" />
              </div>
            </div>
            <div className="intro-y box p-5 mt-12 sm:mt-5">
              <div>
                250 Official stores in 21 countries, click the marker to see location details.
              </div>
              <div
                className="report-maps mt-5 bg-gray-200 rounded-md"
                data-center="-6.2425342, 106.8626478"
                data-sources="/dist/json/location.json"
              />
            </div>
          </div>


          <div className="col-span-12 xl:col-span-4 mt-6">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Weekly Best Sellers
              </h2>
            </div>
            <div className="mt-5">
              <div className="intro-y">
                <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                  <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                    <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-13.jpg" />
                  </div>
                  <div className="ml-4 mr-auto">
                    <div className="font-medium">Nicolas Cage</div>
                    <div className="text-gray-600 text-xs">7 July 2022</div>
                  </div>
                  <div className="py-1 px-2 rounded-full text-xs bg-theme-9 text-white cursor-pointer font-medium">137
                    Sales
                  </div>
                </div>
              </div>
              <div className="intro-y">
                <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                  <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                    <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-1.jpg" />
                  </div>
                  <div className="ml-4 mr-auto">
                    <div className="font-medium">Arnold Schwarzenegger</div>
                    <div className="text-gray-600 text-xs">9 August 2022</div>
                  </div>
                  <div className="py-1 px-2 rounded-full text-xs bg-theme-9 text-white cursor-pointer font-medium">
                    137 Sales
                  </div>
                </div>
              </div>
              <div className="intro-y">
                <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                  <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                    <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-7.jpg" />
                  </div>
                  <div className="ml-4 mr-auto">
                    <div className="font-medium">Johnny Depp</div>
                    <div className="text-gray-600 text-xs">31 August 2022</div>
                  </div>
                  <div className="py-1 px-2 rounded-full text-xs bg-theme-9 text-white cursor-pointer font-medium">
                    137 Sales
                  </div>
                </div>
              </div>
              <div className="intro-y">
                <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                  <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                    <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-1.jpg" />
                  </div>
                  <div className="ml-4 mr-auto">
                    <div className="font-medium">Johnny Depp</div>
                    <div className="text-gray-600 text-xs">5 November 2021</div>
                  </div>
                  <div className="py-1 px-2 rounded-full text-xs bg-theme-9 text-white cursor-pointer font-medium">
                    137 Sales
                  </div>
                </div>
              </div>
              <a
                href="#"
                className="intro-y w-full block text-center rounded-md py-4 border border-dotted border-theme-15 text-theme-16"
              >
                View More
              </a>
            </div>
          </div>
          <div className="col-span-12 grid grid-cols-12 gap-6 mt-8">
            <div className="col-span-12 sm:col-span-6 xxl:col-span-3 intro-y">
              <div className="mini-report-chart box p-5 zoom-in">
                <div className="flex items-center">
                  <div className="w-2/4 flex-none">
                    <div className="text-lg font-medium truncate">Target Sales</div>
                    <div className="text-gray-600 mt-1">300 Sales</div>
                  </div>
                  <div className="flex-none ml-auto relative">
                    <canvas id="report-donut-chart-1" width="90" height="90" />
                    <div className="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">
                      20%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 xxl:col-span-3 intro-y">
              <div className="mini-report-chart box p-5 zoom-in">
                <div className="flex">
                  <div className="text-lg font-medium truncate mr-3">Social Media</div>
                  <div
                    className="py-1 px-2 rounded-full text-xs bg-gray-200 text-gray-600 cursor-pointer ml-auto truncate"
                  >
                    320 Followers
                  </div>
                </div>
                <div className="mt-4">
                  <canvas className="simple-line-chart-1 -ml-1" height="60" />
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 xxl:col-span-3 intro-y">
              <div className="mini-report-chart box p-5 zoom-in">
                <div className="flex items-center">
                  <div className="w-2/4 flex-none">
                    <div className="text-lg font-medium truncate">New Products</div>
                    <div className="text-gray-600 mt-1">1450 Products</div>
                  </div>
                  <div className="flex-none ml-auto relative">
                    <canvas id="report-donut-chart-2" width="90" height="90" />
                    <div className="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">
                      45%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 xxl:col-span-3 intro-y">
              <div className="mini-report-chart box p-5 zoom-in">
                <div className="flex">
                  <div className="text-lg font-medium truncate mr-3">Posted Ads</div>
                  <div
                    className="py-1 px-2 rounded-full text-xs bg-gray-200 text-gray-600 cursor-pointer ml-auto truncate"
                  >
                    180 Campaign
                  </div>
                </div>
                <div className="mt-4">
                  <canvas className="simple-line-chart-1 -ml-1" height="60" />
                </div>
              </div>
            </div>
          </div>


          <div className="col-span-12 mt-6">
            <div className="intro-y block sm:flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Weekly Top Seller
              </h2>
              <div className="flex items-center sm:ml-auto mt-3 sm:mt-0">
                <button type="button" className="button box flex items-center text-gray-700">
                  <FileText className="hidden sm:block w-4 h-4 mr-2" /> Export
                  to Excel
                </button>
                <button type="button" className="ml-3 button box flex items-center text-gray-700">
                  <FileText className="hidden sm:block w-4 h-4 mr-2" /> Export
                  to PDF
                </button>
              </div>
            </div>
            <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
              <table className="table table-report sm:mt-2">
                <thead>
                  <tr>
                    <th className="whitespace-no-wrap">IMAGES</th>
                    <th className="whitespace-no-wrap">PRODUCT NAME</th>
                    <th className="text-center whitespace-no-wrap">STOCK</th>
                    <th className="text-center whitespace-no-wrap">STATUS</th>
                    <th className="text-center whitespace-no-wrap">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="intro-x">
                    <td className="w-40">
                      <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="tooltip rounded-full"
                            src="/images/preview-10.jpg"
                            title="Uploaded at 7 July 2022"
                          />
                        </div>
                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="tooltip rounded-full"
                            src="/images/preview-13.jpg"
                            title="Uploaded at 25 May 2022"
                          />
                        </div>
                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="tooltip rounded-full"
                            src="/images/preview-9.jpg"
                            title="Uploaded at 12 June 2022"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href="#" className="font-medium whitespace-no-wrap">Samsung Galaxy S20 Ultra</a>
                      <div className="text-gray-600 text-xs whitespace-no-wrap">Smartphone &amp; Tablet</div>
                    </td>
                    <td className="text-center">158</td>
                    <td className="w-40">
                      <div className="flex items-center justify-center text-theme-9">
                        <CheckSquare className="w-4 h-4 mr-2" /> Active
                      </div>
                    </td>
                    <td className="table-report__action w-56">
                      <div className="flex justify-center items-center">
                        <a className="flex items-center mr-3" href="#">
                          <CheckSquare className="w-4 h-4 mr-1" /> Edit
                        </a>
                        <a className="flex items-center text-theme-6" href="#">
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr className="intro-x">
                    <td className="w-40">
                      <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="tooltip rounded-full"
                            src="/images/preview-4.jpg"
                            title="Uploaded at 9 August 2022"
                          />
                        </div>
                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="tooltip rounded-full"
                            src="/images/preview-6.jpg"
                            title="Uploaded at 6 July 2020"
                          />
                        </div>
                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="tooltip rounded-full"
                            src="/images/preview-2.jpg"
                            title="Uploaded at 6 October 2021"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href="#" className="font-medium whitespace-no-wrap">Sony Master Series A9G</a>
                      <div className="text-gray-600 text-xs whitespace-no-wrap">Electronic</div>
                    </td>
                    <td className="text-center">50</td>
                    <td className="w-40">
                      <div className="flex items-center justify-center text-theme-6">
                        <CheckSquare className="w-4 h-4 mr-2" /> Inactive
                      </div>
                    </td>
                    <td className="table-report__action w-56">
                      <div className="flex justify-center items-center">
                        <a className="flex items-center mr-3" href="#">
                          <CheckSquare className="w-4 h-4 mr-1" /> Edit
                        </a>
                        <a className="flex items-center text-theme-6" href="#">
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr className="intro-x">
                    <td className="w-40">
                      <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="tooltip rounded-full"
                            src="/images/preview-12.jpg"
                            title="Uploaded at 31 August 2022"
                          />
                        </div>
                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="tooltip rounded-full"
                            src="/images/preview-14.jpg"
                            title="Uploaded at 17 May 2020"
                          />
                        </div>
                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="tooltip rounded-full"
                            src="/images/preview-9.jpg"
                            title="Uploaded at 15 March 2021"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href="#" className="font-medium whitespace-no-wrap">Sony Master Series A9G</a>
                      <div className="text-gray-600 text-xs whitespace-no-wrap">Electronic</div>
                    </td>
                    <td className="text-center">99</td>
                    <td className="w-40">
                      <div className="flex items-center justify-center text-theme-9">
                        <CheckSquare className="w-4 h-4 mr-2" /> Active
                      </div>
                    </td>
                    <td className="table-report__action w-56">
                      <div className="flex justify-center items-center">
                        <a className="flex items-center mr-3" href="#">
                          <CheckSquare className="w-4 h-4 mr-1" /> Edit
                        </a>
                        <a className="flex items-center text-theme-6" href="#">
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr className="intro-x">
                    <td className="w-40">
                      <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="tooltip rounded-full"
                            src="/images/preview-15.jpg"
                            title="Uploaded at 5 November 2021"
                          />
                        </div>
                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="tooltip rounded-full"
                            src="/images/preview-3.jpg"
                            title="Uploaded at 22 April 2021"
                          />
                        </div>
                        <div className="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="tooltip rounded-full"
                            src="/images/preview-13.jpg"
                            title="Uploaded at 14 April 2021"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href="#" className="font-medium whitespace-no-wrap">Dell XPS 13</a>
                      <div className="text-gray-600 text-xs whitespace-no-wrap">PC &amp; Laptop</div>
                    </td>
                    <td className="text-center">50</td>
                    <td className="w-40">
                      <div className="flex items-center justify-center text-theme-9">
                        <CheckSquare className="w-4 h-4 mr-2" /> Active
                      </div>
                    </td>
                    <td className="table-report__action w-56">
                      <div className="flex justify-center items-center">
                        <a className="flex items-center mr-3" href="#">
                          <CheckSquare className="w-4 h-4 mr-1" /> Edit
                        </a>
                        <a className="flex items-center text-theme-6" href="#">
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="intro-y flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-3">
              <ul className="pagination">
                <li>
                  <a className="pagination__link" href="#"> <ChevronLeft className="w-4 h-4" /> </a>
                </li>
                <li>
                  <a className="pagination__link" href="#"> <ChevronLeft className="w-4 h-4" /> </a>
                </li>
                <li><a className="pagination__link" href="#">...</a></li>
                <li><a className="pagination__link" href="#">1</a></li>
                <li><a className="pagination__link pagination__link--active" href="#">2</a></li>
                <li><a className="pagination__link" href="#">3</a></li>
                <li><a className="pagination__link" href="#">...</a></li>
                <li>
                  <a className="pagination__link" href="#"> <i className="w-4 h-4" data-feather="chevron-right" /> </a>
                </li>
                <li>
                  <a className="pagination__link" href="#"> <i className="w-4 h-4" data-feather="chevrons-right" /> </a>
                </li>
              </ul>
              <select className="w-20 input box mt-3 sm:mt-0">
                <option>10</option>
                <option>25</option>
                <option>35</option>
                <option>50</option>
              </select>
            </div>
          </div>

        </div>
        <div className="col-span-12 xxl:col-span-3 xxl:border-l border-theme-5 -mb-10 pb-10">
          <div className="xxl:pl-6 grid grid-cols-12 gap-6">

            <div className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-12 mt-3 xxl:mt-8">
              <div className="intro-x flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Transactions
                </h2>
              </div>
              <div className="mt-5">
                <div className="intro-x">
                  <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-13.jpg" />
                    </div>
                    <div className="ml-4 mr-auto">
                      <div className="font-medium">Nicolas Cage</div>
                      <div className="text-gray-600 text-xs">7 July 2022</div>
                    </div>
                    <div className="text-theme-9">+$88</div>
                  </div>
                </div>
                <div className="intro-x">
                  <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-1.jpg" />
                    </div>
                    <div className="ml-4 mr-auto">
                      <div className="font-medium">Arnold Schwarzenegger</div>
                      <div className="text-gray-600 text-xs">9 August 2022</div>
                    </div>
                    <div className="text-theme-6">+$47</div>
                  </div>
                </div>
                <div className="intro-x">
                  <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-7.jpg" />
                    </div>
                    <div className="ml-4 mr-auto">
                      <div className="font-medium">Johnny Depp</div>
                      <div className="text-gray-600 text-xs">31 August 2022</div>
                    </div>
                    <div className="text-theme-9">+$34</div>
                  </div>
                </div>
                <div className="intro-x">
                  <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-1.jpg" />
                    </div>
                    <div className="ml-4 mr-auto">
                      <div className="font-medium">Johnny Depp</div>
                      <div className="text-gray-600 text-xs">5 November 2021</div>
                    </div>
                    <div className="text-theme-9">+$42</div>
                  </div>
                </div>
                <div className="intro-x">
                  <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-7.jpg" />
                    </div>
                    <div className="ml-4 mr-auto">
                      <div className="font-medium">Al Pacino</div>
                      <div className="text-gray-600 text-xs">17 October 2021</div>
                    </div>
                    <div className="text-theme-6">+$22</div>
                  </div>
                </div>
                <a
                  href="#"
                  className="intro-x w-full block text-center rounded-md py-3 border border-dotted border-theme-15 text-theme-16"
                >
                  View More
                </a>
              </div>
            </div>


            <div className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-12 mt-3">
              <div className="intro-x flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Recent Activities
                </h2>
                <a href="#" className="ml-auto text-theme-1 truncate">See all</a>
              </div>
              <div className="report-timeline mt-5 relative">
                <div className="intro-x relative flex items-center mb-3">
                  <div className="report-timeline__image">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-4.jpg" />
                    </div>
                  </div>
                  <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">John Travolta</div>
                      <div className="text-xs text-gray-500 ml-auto">07:00 PM</div>
                    </div>
                    <div className="text-gray-600 mt-1">Has joined the team</div>
                  </div>
                </div>
                <div className="intro-x relative flex items-center mb-3">
                  <div className="report-timeline__image">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-7.jpg" />
                    </div>
                  </div>
                  <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">John Travolta</div>
                      <div className="text-xs text-gray-500 ml-auto">07:00 PM</div>
                    </div>
                    <div className="text-gray-600">
                      <div className="mt-1">Added 3 new photos</div>
                      <div className="flex mt-2">
                        <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Samsung Galaxy S20 Ultra">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="rounded-md border border-white"
                            src="/images/preview-8.jpg"
                          />
                        </div>
                        <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Sony Master Series A9G">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="rounded-md border border-white"
                            src="/images/preview-12.jpg"
                          />
                        </div>
                        <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Sony Master Series A9G">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="rounded-md border border-white"
                            src="/images/preview-11.jpg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="intro-x text-gray-500 text-xs text-center my-4">12 November</div>
                <div className="intro-x relative flex items-center mb-3">
                  <div className="report-timeline__image">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-11.jpg" />
                    </div>
                  </div>
                  <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">Leonardo DiCaprio</div>
                      <div className="text-xs text-gray-500 ml-auto">07:00 PM</div>
                    </div>
                    <div className="text-gray-600 mt-1">
                      Has changed <a className="text-theme-1" href="#">Sony A7 III</a> price and description
                    </div>
                  </div>
                </div>
                <div className="intro-x relative flex items-center mb-3">
                  <div className="report-timeline__image">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-14.jpg" />
                    </div>
                  </div>
                  <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">Kevin Spacey</div>
                      <div className="text-xs text-gray-500 ml-auto">07:00 PM</div>
                    </div>
                    <div className="text-gray-600 mt-1">
                      Has changed <a className="text-theme-1" href="#">Apple MacBook Pro 13</a> description
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-span-12 md:col-span-6 xl:col-span-12 xxl:col-span-12 xl:col-start-1 xl:row-start-1 xxl:col-start-auto xxl:row-start-auto mt-3"
            >
              <div className="intro-x flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-auto">
                  Important Notes
                </h2>
                <button
                  type="button"
                  data-carousel="important-notes"
                  data-target="prev"
                  className="slick-navigator button px-2 border border-gray-400 flex items-center text-gray-700 mr-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  data-carousel="important-notes"
                  data-target="next"
                  className="slick-navigator button px-2 border border-gray-400 flex items-center text-gray-700"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-5 intro-x">
                <div className="slick-carousel box zoom-in" id="important-notes">
                  <div className="p-5">
                    <div className="text-base font-medium truncate">Lorem Ipsum is simply dummy text</div>
                    <div className="text-gray-500 mt-1">20 Hours ago</div>
                    <div
                      className="text-gray-600 text-justify mt-1"
                    >
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </div>
                    <div className="font-medium flex mt-5">
                      <button type="button" className="button button--sm bg-gray-200 text-gray-600">
                        View Notes
                      </button>
                      <button
                        type="button"
                        className="button button--sm border border-gray-300 text-gray-600 ml-auto"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-medium truncate">Lorem Ipsum is simply dummy text</div>
                    <div className="text-gray-500 mt-1">20 Hours ago</div>
                    <div className="text-gray-600 text-justify mt-1">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </div>
                    <div className="font-medium flex mt-5">
                      <button type="button" className="button button--sm bg-gray-200 text-gray-600">
                        View Notes
                      </button>
                      <button
                        type="button"
                        className="button button--sm border border-gray-300 text-gray-600 ml-auto"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-medium truncate">Lorem Ipsum is simply dummy text</div>
                    <div className="text-gray-500 mt-1">20 Hours ago</div>
                    <div className="text-gray-600 text-justify mt-1">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.{' '}
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </div>
                    <div className="font-medium flex mt-5">
                      <button type="button" className="button button--sm bg-gray-200 text-gray-600">View Notes</button>
                      <button
                        type="button"
                        className="button button--sm border border-gray-300 text-gray-600 ml-auto"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-12 xl:col-start-1 xl:row-start-2 xxl:col-start-auto xxl:row-start-auto mt-3"
            >
              <div className="intro-x flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Schedules
                </h2>
                <a href="#" className="ml-auto text-theme-1 truncate flex items-center">
                  <Plus className="w-4 h-4 mr-1" /> Add New Schedules
                </a>
              </div>
              <div className="mt-5">
                <div className="intro-x box">
                  <div className="p-5">
                    <div className="flex">
                      <i data-feather="chevron-left" className="w-5 h-5 text-gray-600" />
                      <div className="font-medium mx-auto">April</div>
                      <i data-feather="chevron-right" className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="grid grid-cols-7 gap-4 mt-5 text-center">
                      <div className="font-medium">Su</div>
                      <div className="font-medium">Mo</div>
                      <div className="font-medium">Tu</div>
                      <div className="font-medium">We</div>
                      <div className="font-medium">Th</div>
                      <div className="font-medium">Fr</div>
                      <div className="font-medium">Sa</div>
                      <div className="py-1 rounded relative text-gray-600">29</div>
                      <div className="py-1 rounded relative text-gray-600">30</div>
                      <div className="py-1 rounded relative text-gray-600">31</div>
                      <div className="py-1 rounded relative">1</div>
                      <div className="py-1 rounded relative">2</div>
                      <div className="py-1 rounded relative">3</div>
                      <div className="py-1 rounded relative">4</div>
                      <div className="py-1 rounded relative">5</div>
                      <div className="py-1 bg-theme-18 rounded relative">6</div>
                      <div className="py-1 rounded relative">7</div>
                      <div className="py-1 bg-theme-1 text-white rounded relative">8</div>
                      <div className="py-1 rounded relative">9</div>
                      <div className="py-1 rounded relative">10</div>
                      <div className="py-1 rounded relative">11</div>
                      <div className="py-1 rounded relative">12</div>
                      <div className="py-1 rounded relative">13</div>
                      <div className="py-1 rounded relative">14</div>
                      <div className="py-1 rounded relative">15</div>
                      <div className="py-1 rounded relative">16</div>
                      <div className="py-1 rounded relative">17</div>
                      <div className="py-1 rounded relative">18</div>
                      <div className="py-1 rounded relative">19</div>
                      <div className="py-1 rounded relative">20</div>
                      <div className="py-1 rounded relative">21</div>
                      <div className="py-1 rounded relative">22</div>
                      <div className="py-1 bg-theme-17 rounded relative">23</div>
                      <div className="py-1 rounded relative">24</div>
                      <div className="py-1 rounded relative">25</div>
                      <div className="py-1 rounded relative">26</div>
                      <div className="py-1 bg-theme-14 rounded relative">27</div>
                      <div className="py-1 rounded relative">28</div>
                      <div className="py-1 rounded relative">29</div>
                      <div className="py-1 rounded relative">30</div>
                      <div className="py-1 rounded relative text-gray-600">1</div>
                      <div className="py-1 rounded relative text-gray-600">2</div>
                      <div className="py-1 rounded relative text-gray-600">3</div>
                      <div className="py-1 rounded relative text-gray-600">4</div>
                      <div className="py-1 rounded relative text-gray-600">5</div>
                      <div className="py-1 rounded relative text-gray-600">6</div>
                      <div className="py-1 rounded relative text-gray-600">7</div>
                      <div className="py-1 rounded relative text-gray-600">8</div>
                      <div className="py-1 rounded relative text-gray-600">9</div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 p-5">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-theme-11 rounded-full mr-3" />
                      <span className="truncate">UI/UX Workshop</span>
                      <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden" />
                      <span className="font-medium xl:ml-auto">23th</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 bg-theme-1 rounded-full mr-3" />
                      <span className="truncate">VueJs Frontend Development</span>
                      <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden" />
                      <span className="font-medium xl:ml-auto">10th</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 bg-theme-12 rounded-full mr-3" />
                      <span className="truncate">Laravel Rest API</span>
                      <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden" />
                      <span className="font-medium xl:ml-auto">31th</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// HomePage.propTypes = {};

export default HomePage;
