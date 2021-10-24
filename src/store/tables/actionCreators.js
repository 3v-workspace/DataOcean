import { createAction } from '@reduxjs/toolkit';

export const initTable = createAction('tables/init', (tableName, extraParams = {}) => ({
  payload: { tableName, extraParams },
}));

export const tableSetPage = createAction('tables/setPage', (tableName, page) => ({
  payload: { tableName, page },
}));

export const tableSetPageSize = createAction('tables/setPageSize', (tableName, pageSize) => ({
  payload: { tableName, pageSize },
}));

export const tableSetOrdering = createAction('tables/setOrdering', (tableName, ordering) => ({
  payload: { tableName, ordering },
}));

export const tableSetParams = createAction('tables/setParams', (tableName, params) => ({
  payload: { tableName, params },
}));

export const tableSetFilters = createAction('tables/setFilters', (tableName, filters) => ({
  payload: { tableName, filters },
}));

export const tableSetSearch = createAction('tables/setSearch', (tableName, search) => ({
  payload: { tableName, search },
}));

export const setSelectedColumns = createAction('tables/setSelectedColumns', (tableName, selectedColumns) => ({
  payload: { tableName, selectedColumns },
}));
