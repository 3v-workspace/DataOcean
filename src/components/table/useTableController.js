import { useEffect, useState, useRef } from 'react';
import Api from 'api';
import { useDispatch, useSelector } from 'react-redux';
import {
  initTable, tableSetPage,
  tableSetPageSize, tableSetOrdering,
} from 'store/tables/actionCreators';


const useTableController = (options) => {
  const {
    url, params, afterFetch, axiosConfigs, defaultPageSize,
    topOnPageChange,
  } = options;
  const dispatch = useDispatch();
  let page = useSelector((store) => store.tables[url]?.page);
  if (!page) {
    const extraParams = {};
    if (defaultPageSize) {
      extraParams.pageSize = defaultPageSize;
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

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [maxPage, setMaxPage] = useState(1);
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [needReload, setReload] = useState(false);
  const [isDataReady, setDataReady] = useState(false);
  const [itemsIndexes, setItemIndexes] = useState({
    first: 1, last: 1,
  });
  const orderProp = ordering.replace(/^-/, '');
  const prevFullUrlRef = useRef('');

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

  const getUrlParams = () => {
    const urlParams = new URLSearchParams();
    urlParams.set('page', page.toString());
    urlParams.set('page_size', pageSize.toString());
    if (ordering) {
      urlParams.set('o', ordering);
    }
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
    setItemIndexes({ first, last });
  };

  const fetchData = () => {
    const fullUrl = `${url}?${getUrlParams()}`;
    if (fullUrl === prevFullUrlRef.current) {
      return;
    }
    prevFullUrlRef.current = fullUrl;
    setLoading(true);
    Api.get(fullUrl, { ...axiosConfigs })
      .then((resp) => {
        setData(resp.data.results);
        setCount(resp.data.count);
        setMaxPage(resp.data.last_page);
        setDataReady(true);
        calculateIndexes(resp.data.results.length);
        if (afterFetch) {
          afterFetch();
        }
      })
      .catch((err) => {
        if (err.response?.data?.detail) {
          setError(err.response.data.detail);
        }
      })
      .finally(() => {
        setLoading(false);
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
    if (page < maxPage) {
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
    data,
    setData,
    getUrlParams,
    maxPage,
    setMaxPage,
    count,
    setCount,
    isDataReady,
    itemsIndexes,
    ordering,
    setOrdering,
    getOrderingDirection,
    orderProp,
    isLoading,
    error,
    reload,
  };
};

export default useTableController;
