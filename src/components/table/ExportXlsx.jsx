import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Download } from 'react-feather';
import Tooltip from 'components/Tooltip';
import { useTranslation } from 'react-i18next';
import Api from 'api';
import { EXPORT_PEP_XLSX_LIMIT } from 'const';
import YesNoModal from 'components/modals/YesNoModal';
import toast from 'utils/toast';
import { useSelector } from 'react-redux';


const ExportXlsx = (props) => {
  const { t } = useTranslation();
  const { exportUrl, params, count } = props;
  const exportXlsxModalRef = useRef();
  const hasPermission = useSelector((store) => store.user.paid_subscription_permission);

  const openExportXlsxModal = () => exportXlsxModalRef.current.show();

  const exportXlsx = () => {
    Api.get(`${exportUrl}?${params}`)
      .then((resp) => {
        toast('success', resp.data.detail);
      });
    exportXlsxModalRef.current.hide();
  };

  if (!hasPermission) {
    return (
      <Tooltip
        position="bottom"
        arrow={false}
        content={t('export.hasNoPermission')}
        className="flex mx-2 cursor-default text-gray-500"
      >
        <Download className="w-5 h-5 mr-1 color-gray-500" />
        Excel
      </Tooltip>
    );
  }

  if (count <= EXPORT_PEP_XLSX_LIMIT) {
    return (
      <div onClick={openExportXlsxModal} className="flex mx-2 cursor-pointer text-gray-800">
        <Download className="w-5 h-5 mr-1 color-gray-800" />
        Excel
        <YesNoModal
          ref={exportXlsxModalRef}
          onYes={exportXlsx}
          header={t('export.downloadXlsx')}
          message={t('export.downloadXlsxConfirmation')}
        />
      </div>
    );
  }

  return (
    <Tooltip
      position="bottom"
      arrow={false}
      content={t('export.exportTooltipContent', { limit: EXPORT_PEP_XLSX_LIMIT })}
      className="flex mx-2 cursor-default text-gray-500"
    >
      <Download className="w-5 h-5 mr-1 color-gray-500" />
      Excel
    </Tooltip>
  );
};

ExportXlsx.propTypes = {
  exportUrl: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default ExportXlsx;
