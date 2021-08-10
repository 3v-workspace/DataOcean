import { useEffect, useState } from 'react';
import Api from 'api';

const useTableController = (options) => {
  const { url, params, afterFetch, axiosConfigs } = options;

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [ordering, _setOrdering] = useState('');
  const [maxPage, setMaxPage] = useState(1);
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isDataReady, setDataReady] = useState(false);
  const [itemsIndexes, setItemIndexes] = useState({
    first: 1, last: 1,
  });
  const orderProp = ordering.replace(/^-/, '');

  const setOrdering = (field) => {
    if (orderProp === field) {
      if (ordering.startsWith('-')) {
        _setOrdering('');
      } else {
        _setOrdering(`-${field}`);
      }
    } else {
      _setOrdering(field);
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
          urlParams.set(key, value.toString());
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
    setLoading(true);
    Api.get(`${url}?${getUrlParams()}`, { ...axiosConfigs })
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

  useEffect(() => {
    fetchData();
  }, [page, pageSize, JSON.stringify(params), url, ordering]);


  return {
    page,
    setPage,
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
  };
};

export default useTableController;
