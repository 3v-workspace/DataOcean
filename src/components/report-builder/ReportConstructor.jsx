/* global Chart */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, DateInput, SelectInput } from 'components/form-components';
import { useFormik } from 'formik';
import Yup from 'utils/yup';

const chartTypes = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
};

const registers = [
  { label: 'ФОПи', value: 'fop' },
  { label: 'Компанії', value: 'company' },
  { label: 'КВЕДи', value: 'kved' },
];

const metrics = [
  {
    name: 'fopRegistration',
    label: 'Реєстрація ФОП',
    register: 'fop',
    type: 'date',
  },
  {
    name: 'companyRegistration',
    label: 'Реєстрація компаній',
    register: 'company',
    type: 'date',
  },
  {
    name: 'fopKved',
    label: 'Кількість ФОПів з Кведом',
    register: 'kved',
    type: 'kved',
  },
  {
    name: 'companyKved',
    label: 'Кількість компаній з Кведом',
    register: 'kved',
    type: 'kved',
  },
];

const aggregations = [
  { label: 'Рік', value: 'year' },
  { label: 'Місяць', value: 'month' },
  { label: 'День', value: 'day' },
];

const ReportConstructor = (props) => {
  // const [chartType, setChartType] = useState(chartTypes.LINE);
  // const [timeRange, setTimeRange] = useState('');
  // const [selectedMetrics, setSelectedMetrics] = useState([metrics.FOP_REGISTRATION]);

  const formik = useFormik({
    initialValues: {
      chartType: chartTypes.LINE,
      timeRange: '',
      aggregation: null,
      metrics: [],
      registers: [],
    },
    validationSchema: Yup.object({
      chart_type: Yup.string().oneOf(Object.values(chartTypes)).required(),
      timeRange: Yup.string().required(),
      aggregation: Yup.string(),
      metrics: Yup.array(),
      registers: Yup.array(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const chartRef = useRef();

  const refreshData = () => {
    chartRef.current.data.datasets[0].data.forEach((data, i, arr) => {
      arr[i] = Math.random() * 50;
    });
    chartRef.current.update();
  };

  const getMetricsOptions = () => {
    const selected = formik.values.metrics[0];
    const selectedRegisters = formik.values.registers;
    let metricsFiltered = [...metrics];
    if (selected) {
      const { type } = metrics.find((x) => x.name === selected);
      metricsFiltered = metricsFiltered.filter((m) => m.type === type);
    }
    if (selectedRegisters.length) {
      metricsFiltered = metricsFiltered.filter((m) => selectedRegisters.includes(m.register));
    }
    return metricsFiltered.map((metric) => (
      { label: metric.label, value: metric.name }
    ));
  };

  // const getAggregationOptions = () => {
  //   let aggrFiltered = Object.entries(aggregations);
  //   const selectedMetric = formik.values.metrics[0];
  //   if (selectedMetric) {
  //     const allowedAggr = getAggregationsFromMetric(selectedMetric);
  //     aggrFiltered = aggrFiltered.filter(([name]) => allowedAggr.includes(name));
  //   }
  //   return [{ label: '---', value: '' }].concat(aggrFiltered.map(([name, options]) => (
  //     { label: options.label, value: name }
  //   )));
  // };

  useEffect(() => {
    const ctx = document.getElementById('report-chart').getContext('2d');
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: formik.values.chartType,
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
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
        }],
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
  }, [formik.values.chartType]);


  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4">
        <div className="pb-2 font-bold">Тип</div>
        <div>
          <Button
            size="sm"
            variant={formik.values.chartType === chartTypes.LINE ? 'primary' : 'dark'}
            className="mr-2 w-24"
            onClick={() => formik.setFieldValue('chartType', chartTypes.LINE)}
          >
            Лінія
          </Button>
          <Button
            size="sm"
            variant={formik.values.chartType === chartTypes.BAR ? 'primary' : 'dark'}
            className="mr-2 w-24"
            onClick={() => formik.setFieldValue('chartType', chartTypes.BAR)}
          >
            Бари
          </Button>
          <Button
            size="sm"
            variant={formik.values.chartType === chartTypes.PIE ? 'primary' : 'dark'}
            className="w-24"
            onClick={() => formik.setFieldValue('chartType', chartTypes.PIE)}
          >
            Пиріг
          </Button>
        </div>
      </div>
      <div className="col-span-2">
        <div className="pb-2 font-bold">Дії</div>
        <Button size="sm" className="mr-2 w-24" onClick={refreshData}>Оновити</Button>
      </div>
      <div className="col-span-2">
        <div className="pb-2 font-bold">Агрегація</div>
        <SelectInput
          name="aggregation"
          options={aggregations}
          formik={formik}
        />
      </div>
      <div className="col-span-4">
        <div className="pb-2 font-bold">Time range</div>
        <DateInput
          singleDatePicker={false}
          name="timeRange"
          formik={formik}
        />
      </div>
      <div className="col-span-6">
        <div className="pb-2 font-bold">Реєстри</div>
        <SelectInput
          multiple
          name="registers"
          options={registers}
          formik={formik}
        />
      </div>
      <div className="col-span-6">
        <div className="pb-2 font-bold">Метрики</div>
        <SelectInput
          multiple
          name="metrics"
          options={getMetricsOptions()}
          formik={formik}
        />
      </div>
      <div className="col-span-12">
        <canvas className="mt-3" id="report-chart" height="100" />
      </div>
    </div>
  );
};

// ReportConstructor.propTypes = {};

export default ReportConstructor;
