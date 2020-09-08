import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'components/form-components';
import { Dropdown, DropdownItem } from 'components/dropdown';
import { Plus, X } from 'react-feather';
import RBGroupBy from 'components/report-builder/RBGroupBy';

const chartSet = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
};

const registerSet = {
  FOP: 'fop',
  COMPANY: 'company',
  KVED: 'kved',
};

const metricTypes = {
  DATE: 'date',
  KVED: 'kved',
};

const registerLabels = {
  [registerSet.FOP]: 'ФОПи',
  [registerSet.COMPANY]: 'Компанії',
  [registerSet.KVED]: 'КВЕДи',
};

const metricsSet = [
  {
    name: 'fopRegistration',
    label: 'Реєстрація ФОП',
    register: registerSet.FOP,
    type: metricTypes.DATE,
  },
  {
    name: 'companyRegistration',
    label: 'Реєстрація компаній',
    register: registerSet.COMPANY,
    type: metricTypes.DATE,
  },
  {
    name: 'fopKved',
    label: 'Кількість ФОПів з Кведом',
    register: registerSet.KVED,
    type: metricTypes.KVED,
  },
  {
    name: 'companyKved',
    label: 'Кількість компаній з Кведом',
    register: registerSet.KVED,
    type: metricTypes.KVED,
  },
];

const ReportConstructor = () => {
  const [chartType, setChartType] = useState(chartSet.LINE);
  const [metrics, setMetrics] = useState(new Set());
  const [registers, setRegisters] = useState(new Set());
  const [currentType, setCurrentType] = useState(null);
  const [options, setOptions] = useState({});

  const chartRef = useRef();

  const refreshData = () => {
    chartRef.current.data.datasets.forEach((ds) => {
      ds.data.forEach((data, i, arr) => {
        arr[i] = Math.random() * 50;
      });
    });
    chartRef.current.update();
  };

  useEffect(() => {
    const ctx = document.getElementById('report-chart').getContext('2d');
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(243,23,67,0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgb(243,53,95)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      // options: {
      //   scales: {
      //     yAxes: [{
      //       ticks: {
      //         beginAtZero: true,
      //       },
      //     }],
      //   },
      // },
    });
  }, [chartType]);

  const addRegister = (value) => {
    const newRegs = new Set(registers);
    newRegs.add(value);
    setRegisters(newRegs);
  };

  const removeRegister = (value) => {
    const newRegs = new Set(registers);
    newRegs.delete(value);
    setRegisters(newRegs);
  };

  const addMetric = (value) => {
    const newMetrics = new Set(metrics);
    newMetrics.add(value);
    setMetrics(newMetrics);
    const metric = metricsSet.find((m) => m.name === value);
    setCurrentType(metric.type);
  };

  const removeMetric = (value) => {
    const newMetrics = new Set(metrics);
    newMetrics.delete(value);
    setMetrics(newMetrics);
    if (newMetrics.size === 0) {
      setCurrentType(null);
    }
  };

  const dropdownMetrics = metricsSet.filter((m) => {
    let res = true;
    if (currentType && m.type !== currentType) {
      res = false;
    }
    return registers.has(m.register) && res && !metrics.has(m.name);
  });

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-9 p-2 border-r-1">
        <div className="grid grid-cols-12 gap-4 mt-2">
          <div className="col-span-6">
            <Button
              // size="sm"
              variant={chartType === chartSet.LINE ? 'primary' : 'dark'}
              className="mr-2 w-24"
              onClick={() => setChartType(chartSet.LINE)}
            >
              Лінія
            </Button>
            <Button
              // size="sm"
              variant={chartType === chartSet.BAR ? 'primary' : 'dark'}
              className="mr-2 w-24"
              onClick={() => setChartType(chartSet.BAR)}
            >
              Бари
            </Button>
            <Button
              // size="sm"
              variant={chartType === chartSet.PIE ? 'primary' : 'dark'}
              className="w-24"
              onClick={() => setChartType(chartSet.PIE)}
            >
              Пиріг
            </Button>
          </div>
          <div className="col-span-6">
            <RBGroupBy currentType={currentType} onGroupByChange={setOptions} />
          </div>
          <div className="col-span-12">
            <canvas className="mt-3" id="report-chart" height="150" />
          </div>
        </div>
        <Button size="sm" className="mr-2 w-24" onClick={refreshData}>Оновити</Button>
      </div>
      <div className="col-span-3 p-2">
        <div>
          <div className="pb-2 font-bold">Реєстри</div>
          <div className="flex flex-wrap">
            {[...registers].map((regName) => (
              <Button
                key={regName}
                size="sm"
                className="mr-2 mb-2"
                onClick={() => removeRegister(regName)}
              >
                {registerLabels[regName]} <X className="w-3 h-3 ml-2" />
              </Button>
            ))}
          </div>
          <div className="flex justify-center mb-4">
            {registers.size !== Object.keys(registerSet).length && (
              <Dropdown
                align="right"
                dropdownComponent={(
                  <Button size="sm" variant="secondary" className="dropdown-toggle">
                    Додати реєстр <Plus className="w-3 h-3 ml-2" />
                  </Button>
                )}
              >
                {Object.values(registerSet)
                  .filter((r) => !registers.has(r))
                  .map((regName) => (
                    <DropdownItem key={regName} onClick={() => addRegister(regName)}>
                      {registerLabels[regName]}
                    </DropdownItem>
                  ))}
              </Dropdown>
            )}
          </div>
        </div>
        <div>
          <div className="pb-2 font-bold">Метрики</div>
          <div className="flex justify-center mb-4">
            {dropdownMetrics.length > 0 && (
              <Dropdown
                align="right"
                dropdownComponent={(
                  <Button size="sm" variant="secondary" className="dropdown-toggle">
                    Додати метрику <Plus className="w-3 h-3 ml-2" />
                  </Button>
                )}
              >
                {dropdownMetrics.map((metric) => (
                  <DropdownItem key={metric.name} onClick={() => addMetric(metric.name)}>
                    {metric.label}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </div>
          {[...metrics].map((metricName) => {
            const metric = metricsSet.find((m) => m.name === metricName);
            return (
              <div key={metricName} className="text-grey-600 flex justify-between">
                {metric.label}
                <X className="w-5 h-5 cursor-pointer" onClick={() => removeMetric(metricName)} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ReportConstructor.propTypes = {};

export default ReportConstructor;
