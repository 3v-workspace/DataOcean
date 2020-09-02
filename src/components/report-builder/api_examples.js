const request = {
  group_by: 'day', // day, week, month, year
  date_from: '2020-01-20', // ISO
  date_to: '2020-12-12', // ISO
  metrics: [ // list of metrics
    {
      name: 'fopRegistration',
      filter: {
        status: 'припинено',
      },
    },
    {
      name: 'companyRegistration',
      filter: {
        type: 'товариство з обмеженою відповідальністю',
      },
    },
  ],
};

const response = {
  fopRegistration: [
    ['2020-06', 520],
    ['2020-07', 682],
  ],
  companyRegistration: [
    ['2020-06', 1234],
    ['2020-07', 888],
  ],
};
