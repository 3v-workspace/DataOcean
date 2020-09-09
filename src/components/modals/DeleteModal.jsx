import React from 'react';
import { XCircle } from 'react-feather';
import PropTypes from 'prop-types';
import YesNoModal from 'components/modals/YesNoModal';
import { useTranslation } from 'react-i18next';

const DeleteModal = React.forwardRef((props, ref) => {
  const {
    header, message, id, className, onDelete, onHide, closeButton,
  } = props;
  const { t } = useTranslation();

  return (
    <YesNoModal
      id={id}
      ref={ref}
      className={className}
      header={header}
      message={message}
      noLabel={t('cancel')}
      yesLabel={t('delete')}
      onYes={onDelete}
      icon={XCircle}
      variant="danger"
      onHide={onHide}
      closeButton={closeButton}
    />
  );
});

DeleteModal.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  header: PropTypes.string,
  message: PropTypes.string.isRequired,
  onHide: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  closeButton: PropTypes.bool,
};
DeleteModal.defaultProps = {
  id: undefined,
  className: '',
  header: 'Are you sure?',
  onHide: undefined,
  closeButton: false,
};

export default DeleteModal;
