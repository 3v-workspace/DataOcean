import { useEffect, useState } from 'react';
import Api from 'api';

const useTableController = (options) => {
  const { url, params, afterFetch } = options;

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [maxPage, setMaxPage] = useState(1);
  const [count, setCount] = useState(0);
  const [isDataReady, setDataReady] = useState(false);
  const [itemsIndexes, setItemIndexes] = useState({
    first: 1, last: 1,
  });

  const getUrlParams = () => {
    const urlParams = new URLSearchParams();
    urlParams.set('page', page.toString());
    urlParams.set('page_size', pageSize.toString());
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          urlParams.set(key, value.toString());
        }
      });
    }
    return urlParams.toString();
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
    Api.get(`${url}?${getUrlParams()}`)
      .then((resp) => {
        setData(resp.data.results);
        setCount(resp.data.count);
        setMaxPage(resp.data.last_page);
        setDataReady(true);
        calculateIndexes(resp.data.results.length);
        if (afterFetch) {
          afterFetch();
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, JSON.stringify(params), url]);

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
  };
};

export default useTableController;
