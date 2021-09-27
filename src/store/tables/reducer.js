import { createSlice } from '@reduxjs/toolkit';

const tablesSlice = createSlice({
  name: 'tables',
  initialState: {},
  reducers: {
    init(state, { payload: { tableName, extraParams } }) {
      if (!extraParams) extraParams = {};
      state[tableName] = {
        page: 1,
        pageSize: 10,
        ordering: '',
        ...extraParams,
      };
      // if (extraParams.defaultFilters) {
      //   state[tableName].filters = extraParams.defaultFilters;
      // }
      // if (extraParams.defaultSelectedColumnsNames) {
      //   state[tableName].selectedColumns = extraParams.defaultSelectedColumnsNames;
      // }
    },
    setPage(state, { payload: { tableName, page } }) {
      state[tableName].page = page;
    },
    setPageSize(state, { payload: { tableName, pageSize } }) {
      state[tableName].page = 1;
      state[tableName].pageSize = pageSize;
    },
    setOrdering(state, { payload: { tableName, ordering } }) {
      state[tableName].ordering = ordering;
    },
    setFilters(state, { payload: { tableName, filters } }) {
      state[tableName].filters = filters;
    },
    setSearch(state, { payload: { tableName, search } }) {
      state[tableName].search = search;
    },
    setSelectedColumns(state, { payload: { tableName, selectedColumns } }) {
      state[tableName].selectedColumns = selectedColumns;
    },
  },
});

export default tablesSlice;
