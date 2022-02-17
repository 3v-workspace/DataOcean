import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getPDF, printPDF } from 'utils';
import { Download, Printer } from 'react-feather';


const PrintDownloadSanction = (props) => {
  const { id, name, dataset, className, setLoading } = props;
  const { t } = useTranslation();

  return (
    <div className={`${className} py-2 pr-5 text-blue-800 flex flex-row justify-end font-medium`}>
      <div className="inline-flex mr-8 cursor-pointer" onClick={() => getPDF(id, name.replace(/(^"|"$)/g, ''), true, dataset, setLoading)}>
        <Download className="w-5 h-5 mr-1" />
        {t('export.downloadPdf')}
      </div>
      <div className="inline-flex cursor-pointer" onClick={() => printPDF(id, dataset, setLoading)}>
        <Printer className="w-5 h-5 mr-1" />
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
  setLoading: PropTypes.func.isRequired,
};

PrintDownloadSanction.defaultProps = {
  className: '',
};

export default PrintDownloadSanction;
