export const setBreadcrumbs = (breadcrumbs) => ({
  type: 'SET_BREADCRUBMS',
  payload: breadcrumbs,
});

export const changeCrumbName = (index, name) => ({
  type: 'CHANGE_CRUMB_NAME',
  payload: { index, name },
});