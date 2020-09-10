const request = {
  type: 'date',
  options: {
    group_by: 'day',
    date_from: '2020-02-02',
    date_to: '2020-03-02',
  },
  metrics: [
    'fop_registration',
    'company_registration',
    // {
    //   name: 'fopRegistration',
    //   filter: {
    //     status: 'припинено',
    //   },
    // },
    // {
    //   name: 'companyRegistration',
    //   filter: {
    //     type: 'товариство з обмеженою відповідальністю',
    //   },
    // },
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
