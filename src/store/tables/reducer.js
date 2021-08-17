import { createSlice } from '@reduxjs/toolkit';

const tablesSlice = createSlice({
  name: 'tables',
  initialState: {},
  reducers: {
    init(state, { payload: { tableName, defaultFilters } }) {
      state[tableName] = {
        page: 1,
        pageSize: 10,
        ordering: '',
      };
      if (defaultFilters) {
        state[tableName].filters = defaultFilters;
      }
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
  },
});

export default tablesSlice;
