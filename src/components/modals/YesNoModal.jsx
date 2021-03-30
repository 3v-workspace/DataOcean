import React from 'react';
import { Button } from 'components/form-components';
import { HelpCircle } from 'react-feather';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import BlankModal from './BlankModal';


const variants = {
  primary: 'text-theme-1',
  success: 'text-theme-9',
  warning: 'text-theme-12',
  danger: 'text-theme-6',
};

const YesNoModal = React.forwardRef((props, ref) => {
  const {
    message, id, className, variant, noLabel, yesLabel, header,
    onYes, onNo, onHide, closeButton, icon: Icon, children,
  } = props;
  const { t } = useTranslation();

  return (
    <BlankModal
      ref={ref}
      id={id}
      className={className}
      onHide={onHide}
      closeButton={closeButton}
    >
      <div className="p-5 text-center">
        <Icon className={`w-16 h-16 mx-auto mt-3 ${variants[variant]}`} />
        <div className="text-3xl mt-5">{header || t('areYouSure')}</div>
        <div className="text-gray-600 mt-2">{message}</div>
      </div>
      <div className="px-5 pb-8 text-center">
        {children || (
          <>
            <button
              type="button"
              data-dismiss="modal"
              className="button px-8 border text-gray-700 mr-1"
              onClick={onNo}
            >
              {noLabel || t('no')}
            </button>
            <Button
              // width="w-24"
              className="px-8"
              data-dismiss="modal"
              variant={variant === 'warning' ? 'primary' : variant}
              onClick={onYes}
            >
              {yesLabel || t('yes')}
            </Button>
          </>
        )}
      </div>
    </BlankModal>
  );
});

YesNoModal.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.elementType,
  header: PropTypes.string,
  message: PropTypes.string.isRequired,
  onHide: PropTypes.func,
  onNo: PropTypes.func,
  onYes: PropTypes.func,
  noLabel: PropTypes.string,
  yesLabel: PropTypes.string,
  closeButton: PropTypes.bool,
  variant: PropTypes.oneOf(['success', 'warning', 'danger', 'primary']),
};
YesNoModal.defaultProps = {
  id: undefined,
  className: '',
  icon: HelpCircle,
  header: undefined,
  onNo: undefined,
  onYes: undefined,
  onHide: undefined,
  noLabel: undefined,
  yesLabel: undefined,
  closeButton: true,
  variant: 'primary',
};

export default YesNoModal;
