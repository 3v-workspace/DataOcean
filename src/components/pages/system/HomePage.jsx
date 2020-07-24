/* global $, Chart */

import React, { useEffect } from 'react';
import {
  Briefcase, Calendar, Database, File, RefreshCcw, User,
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

    // initAllCharts();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xxl:col-span-12 grid grid-cols-12 gap-6">
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

          {/*<UnusedSections />*/}
        </div>
        {/*<Transactions />*/}
      </div>
    </div>
  );
};

// HomePage.propTypes = {};

export default HomePage;
