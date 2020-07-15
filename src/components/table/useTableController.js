import { useEffect, useState } from 'react';
import Api from 'api';

const useTableController = (options) => {
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
    Api.get(`${options.url}?${getUrlParams()}`)
      .then((resp) => {
        setData(resp.data.results);
        setCount(resp.data.count);
        setMaxPage(resp.data.last_page);
        setDataReady(true);
        calculateIndexes(resp.data.results.length);
        if (options.afterFetch) {
          options.afterFetch();
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

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
