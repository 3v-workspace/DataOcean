import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getPDF } from 'utils';
import { Download, Printer } from 'react-feather';
import { Print } from '../../../blocks';


const PrintDownloadSanction = (props) => {
  const { id, name, dataset, className } = props;
  const { t } = useTranslation();

  return (
    <div className={`${className} py-2 pr-5 text-blue-800 flex flex-row justify-end font-medium`}>
      <div className="inline-flex mr-8 cursor-pointer" onClick={() => getPDF(id, name.replace(/(^"|"$)/g, ''), true, dataset)}>
        <Download className="w-5 h-5 mr-1" />
        {t('export.downloadPdf')}
      </div>
      <div className="inline-flex cursor-pointer" onClick={() => getPDF(id, name, false, dataset)}>
        <Print className="w-5 h-5 mr-1" />
        {t('print')}
      </div>
    </div>
  );
};

PrintDownloadSanction.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  dataset: PropTypes.string.isRequired,
  className: PropTypes.string,
};

PrintDownloadSanction.defaultProps = {
  className: '',
};

export default PrintDownloadSanction;
