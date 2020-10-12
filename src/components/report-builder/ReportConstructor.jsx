import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'components/form-components';
import { Dropdown, DropdownItem } from 'components/dropdown';
import { Plus, X } from 'react-feather';
import RBGroupBy from 'components/report-builder/RBGroupBy';
import Api from 'api';
import LoadingIcon from 'components/LoadingIcon';
import Alert from 'components/Alert';
import { useTranslation } from 'react-i18next';


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

const metricsSet = [
  {
    name: 'fop_registration',
    label: 'Реєстрація ФОП',
    register: registerSet.FOP,
    type: metricTypes.DATE,
  },
  {
    name: 'company_registration',
    label: 'Реєстрація компаній',
    register: registerSet.COMPANY,
    type: metricTypes.DATE,
  },
  {
    name: 'fop_kved',
    label: 'Кількість ФОПів з Кведом',
    register: registerSet.KVED,
    type: metricTypes.KVED,
  },
  {
    name: 'company_kved',
    label: 'Кількість компаній з Кведом',
    register: registerSet.KVED,
    type: metricTypes.KVED,
  },
];


const backgroundColor = [
  'rgba(54, 162, 235, 0.1)',
  'rgba(255, 206, 86, 0.1)',
  'rgba(75, 192, 192, 0.1)',
  'rgba(153, 102, 255, 0.1)',
  'rgba(255, 159, 64, 0.1)',
  'rgba(255, 99, 132, 0.1)',
];
const borderColor = [
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(255, 99, 132, 1)',
];
const borderWidth = 1;


const getMetricLabels = (data) => {
  const values = Object.values(data)[0];
  if (values) {
    return values.map((metricData) => metricData[0]);
  }
  return [];
};

const generateDatasets = (data) => Object.entries(data).map(
  ([metricName, metricData], i) => ({
    label: metricsSet.find((m) => m.name === metricName).label,
    data: metricData.map((d) => d[1]),
    backgroundColor: backgroundColor[i],
    borderColor: borderColor[i],
    borderWidth,
  }),
);

const ReportConstructor = () => {
  const [chartType, setChartType] = useState(chartSet.LINE);
  const [metrics, setMetrics] = useState(new Set());
  const [registers, setRegisters] = useState(new Set());
  const [currentType, setCurrentType] = useState(null);
  const [options, setOptions] = useState({});
  const [chartData, setChartData] = useState({});
  const [isLoading, setLoading] = useState(false);

  const { t } = useTranslation();

  const chartRef = useRef();

  const registerLabels = {
    [registerSet.FOP]: t('soleProprietors'),
    [registerSet.COMPANY]: t('companies'),
    [registerSet.KVED]: t('NACEs'),
  };

  useEffect(() => {
    if (Object.keys(chartData).length) {
      chartRef.current.data.labels = getMetricLabels(chartData);
      chartRef.current.data.datasets = generateDatasets(chartData);
      chartRef.current.update();
    }
  }, [chartData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      type: currentType,
      options,
      metrics: [...metrics],
    };
    setLoading(true);
    Api.post('stats/report-builder/', params)
      .then((resp) => {
        setChartData(resp.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const ctx = document.getElementById('report-chart').getContext('2d');
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels: getMetricLabels(chartData),
        datasets: generateDatasets(chartData),
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
    setMetrics(new Set());
    setCurrentType(null);
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
    <form className="grid grid-cols-12" onSubmit={handleSubmit}>
      <div className="col-span-9 p-2 border-r-1">
        <div className="grid grid-cols-12 gap-4 mt-2">
          <div className="col-span-6">
            <Button
              // size="sm"
              variant={chartType === chartSet.LINE ? 'primary' : 'dark'}
              className="mr-2 w-24"
              onClick={() => setChartType(chartSet.LINE)}
            >
              {t('line')}
            </Button>
            <Button
              // size="sm"
              variant={chartType === chartSet.BAR ? 'primary' : 'dark'}
              className="mr-2 w-24"
              onClick={() => setChartType(chartSet.BAR)}
            >
              {t('bars')}
            </Button>
            <Button
              // size="sm"
              variant={chartType === chartSet.PIE ? 'primary' : 'dark'}
              className="w-24"
              onClick={() => setChartType(chartSet.PIE)}
            >
              {t('pie')}
            </Button>
          </div>
          <div className="col-span-6">
            <RBGroupBy currentType={currentType} onGroupByChange={setOptions} />
          </div>
          <div className="col-span-12 relative">
            {isLoading && (
              <div
                className="rounded-md w-full h-full bg-gray-700 bg-opacity-25 absolute flex items-center justify-center z-5"
              >
                <LoadingIcon icon="tail-spin" className="w-16 h-16" />
              </div>
            )}
            <canvas className="mt-3" id="report-chart" height="150" />
            <Alert variant="outline-primary">
              {t('reportConstructor')} {t('worksInTestMode').toLowerCase()}.
            </Alert>
          </div>
        </div>
      </div>
      <div className="col-span-3 p-2">
        <div>
          <div className="pb-2 font-bold">{t('registers')}</div>
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
                    {t('addRegister')} <Plus className="w-3 h-3 ml-2" />
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
          <div className="pb-2 font-bold">{t('metrics')}</div>
          <div className="flex justify-center mb-4">
            {dropdownMetrics.length > 0 && (
              <Dropdown
                align="right"
                dropdownComponent={(
                  <Button size="sm" variant="secondary" className="dropdown-toggle">
                    {t('addMetric')} <Plus className="w-3 h-3 ml-2" />
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
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          // size="sm"
          className="m-3 w-32 float-right"
          type="submit"
        >
          {t('apply')}
        </Button>
      </div>
    </form>
  );
};

// ReportConstructor.propTypes = {};

export default ReportConstructor;
