import { useEffect, useState, useRef } from 'react';
import Api from 'api';
import { useDispatch, useSelector } from 'react-redux';
import {
  initTable, tableSetPage,
  tableSetPageSize, tableSetOrdering, tableSetParams,
} from 'store/tables/actionCreators';


const paramsToString = (params) => {
  const urlParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((val) => {
            urlParams.append(key, val);
          });
        } else {
          urlParams.set(key, value.toString());
        }
      }
    });
  }
  return urlParams.toString();
};


const useTableController = (options) => {
  const {
    url, params, afterFetch, axiosConfigs, defaultPageSize,
    topOnPageChange,
  } = options;
  const paramsStr = paramsToString(params);
  const dispatch = useDispatch();
  let page = useSelector((store) => store.tables[url]?.page);
  if (!page) {
    const extraParams = {};
    if (defaultPageSize) {
      extraParams.pageSize = defaultPageSize;
      extraParams.params = paramsStr;
    }
    dispatch(initTable(url, extraParams));
    page = 1;
  }
  const setPage = (newPage) => {
    if (topOnPageChange) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    dispatch(tableSetPage(url, newPage));
  };
  const ordering = useSelector((store) => store.tables[url].ordering);
  const setOrderingState = (newOrdering) => dispatch(tableSetOrdering(url, newOrdering));
  const pageSize = useSelector((store) => store.tables[url].pageSize);
  const setPageSize = (newPageSize) => dispatch(tableSetPageSize(url, newPageSize));
  const oldParams = useSelector((store) => store.tables[url].params);
  const setOldParams = (paramsString) => dispatch(tableSetParams(url, paramsString));

  const [state, setState] = useState({
    data: [],
    maxPage: 1,
    count: 0,
    isLoading: false,
    isDataReady: false,
    itemsIndexes: { first: 1, last: 1 },
    error: '',
  });

  useEffect(() => {
    console.log('render');
  });

  const [needReload, setReload] = useState(false);

  const orderProp = ordering.replace(/^-/, '');
  const prevFullUrlRef = useRef('');

  if (paramsStr !== oldParams) {
    setOldParams(paramsStr);
    setPage(1);
    page = 1;
  }

  const setOrdering = (field) => {
    if (orderProp === field) {
      if (ordering.startsWith('-')) {
        setOrderingState('');
      } else {
        setOrderingState(`-${field}`);
      }
    } else {
      setOrderingState(field);
    }
  };

  const getUrlParams = () => paramsToString({
    page,
    page_size: pageSize,
    o: ordering,
    ...params,
  });

  const getOrderingDirection = () => {
    if (ordering) {
      if (ordering.startsWith('-')) {
        return 'desc';
      }
      return 'asc';
    }
    return null;
  };

  const calculateIndexes = (dataLen) => {
    let first = page;
    if (first !== 1) {
      first = (page - 1) * pageSize + 1;
    }
    const last = first + dataLen - 1;
    return { first, last };
  };

  const fetchData = () => {
    const urlParams = paramsToString(params);
    const mainUrlParams = paramsToString({
      page, o: ordering, page_size: pageSize,
    });
    const fullUrl = `${url}?${mainUrlParams}&${urlParams}`;
    if (fullUrl === prevFullUrlRef.current) {
      return;
    }
    prevFullUrlRef.current = fullUrl;
    setState({ ...state, isLoading: true });
    Api.get(fullUrl, { ...axiosConfigs })
      .then((resp) => {
        setState({
          ...state,
          data: resp.data.results,
          isDataReady: true,
          isLoading: false,
          count: resp.data.count,
          maxPage: resp.data.last_page,
          itemsIndexes: calculateIndexes(resp.data.results.length),
        });
        if (afterFetch) {
          afterFetch();
        }
      })
      .catch((err) => {
        const newState = { isLoading: false };
        if (err.response?.data?.detail) {
          newState.error = err.response.data.detail;
        }
        setState({ ...state, ...newState });
      });
  };

  const reload = () => {
    setReload(true);
  };

  useEffect(() => {
    if (needReload) {
      fetchData();
      setReload(false);
    }
  }, [needReload]);

  useEffect(() => {
    fetchData();
  }, [page, pageSize, url, ordering]);

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < state.maxPage) {
      setPage(page + 1);
    }
  };

  return {
    page,
    setPage,
    prevPage,
    nextPage,
    pageSize,
    setPageSize,
    getUrlParams,
    ordering,
    setOrdering,
    getOrderingDirection,
    orderProp,
    reload,
    data: state.data,
    maxPage: state.maxPage,
    count: state.count,
    isDataReady: state.isDataReady,
    itemsIndexes: state.itemsIndexes,
    isLoading: state.isLoading,
    error: state.error,
  };
};

export default useTableController;
