import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Download } from 'react-feather';
import Tooltip from 'components/Tooltip';
import { useTranslation } from 'react-i18next';
import Api from 'api';
import { EXPORT_PEP_XLSX_LIMIT } from 'const/const';
import YesNoModal from 'components/modals/YesNoModal';
import toast from 'utils/toast';


const ExportXlsx = (props) => {
  const { t } = useTranslation();
  const { exportUrl, params, count } = props;
  const ExportXlsxModalRef = useRef();
  const detail = 'detail';
  let element;

  const openExportXlsxModal = () => {
    ExportXlsxModalRef.current.show();
  };

  const exportXlsx = () => {
    Api.get(`${exportUrl}?${params}`)
      .then((resp) => {
        toast('success', resp.data[detail]);
      });
    ExportXlsxModalRef.current.hide();
  };

  if (count <= EXPORT_PEP_XLSX_LIMIT) {
    element = (
      <div onClick={openExportXlsxModal} className="flex mx-2 cursor-pointer text-gray-800">
        <Download className="w-5 h-5 mr-1 color-gray-800" />
        Excel
        <YesNoModal
          ref={ExportXlsxModalRef}
          onYes={exportXlsx}
          header={t('downloadXlsx')}
          message={t('downloadXlsxConfirmation')}
        />
      </div>
    );
  } else {
    element = (
      <Tooltip
        position="bottom"
        arrow={false}
        content={t('exportTooltipContent', { limit: EXPORT_PEP_XLSX_LIMIT })}
        className="flex mx-2 cursor-default text-gray-500"
      >
        <Download className="w-5 h-5 mr-1 color-gray-500" />
        Excel
      </Tooltip>
    );
  }

  return (
    <>
      {element}
    </>
  );
};

ExportXlsx.propTypes = {
  exportUrl: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default ExportXlsx;
