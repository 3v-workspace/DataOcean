import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTableController } from 'components/table/index';
import Pagination from 'components/table/Pagination';
import { SearchBox } from 'components/form-components';
import { ChevronDown, ChevronUp, Download } from 'react-feather';
import Tooltip from 'components/Tooltip';
import LoadingIcon from 'components/LoadingIcon';
import { useTranslation } from 'react-i18next';
import FilterField from 'components/filter-fields/FilterField';
import Api from 'api';


const ExportXlsx = (props) => {
  const { t } = useTranslation();
  const { exportUrl, params, count } = props;
  // const tc = useTableController({ url, params, axiosConfigs });
  const [ResponceMessage, setResponceMessage] = useState([]);

  const fetchData = () => {
    Api.get(`${exportUrl}?${params}`)
      .then((resp) => {
        setResponceMessage(resp.data);
      });
  };

  return (
    <div onClick={count < 2 ? () => fetchData() : undefined}>
      <Tooltip position="left" arrow={false}>
        <Download className="w-5 h-5" /> Excel
      </Tooltip>
    </div>
  );
};

ExportXlsx.propTypes = {
  exportUrl: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
// ExportXlsx.defaultProps = {
//   axiosConfigs: {},
// };

export default ExportXlsx;
