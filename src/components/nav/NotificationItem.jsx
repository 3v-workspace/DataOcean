import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { datetimeFormat } from 'utils';
import Tooltip from 'components/Tooltip';
import { X } from 'react-feather';
import unreadPin from 'images/unreadNitification.svg';
import { useTranslation } from 'react-i18next';

const NotificationItem = ({ message, onDelete, onRead }) => {
  const { t } = useTranslation();
  const [isHover, setHover] = useState(false);

  return (
    <div
      className={`${message.link ? 'cursor-pointer' : ''} px-3 py-2 hover:bg-gray-200`}
      onMouseOut={() => setHover(false)}
      onMouseOver={() => setHover(true)}
    >
      <div className="relative flex items-center justify-between">
        <small className="text-gray-600">
          {datetimeFormat(message.created_at)}
        </small>
        <div className="flex items-center">
          <Tooltip
            className={`${isHover ? 'visible' : 'invisible'} mr-2`}
            content={t('delete')}
            position="left"
            arrow={false}
          >
            <X className="cursor-pointer w-5 h-5" onClick={() => onDelete(message)} />
          </Tooltip>
          {!message.is_read && (
            <Tooltip content={t('markAsRead')} position="left" arrow={false}>
              <img
                src={unreadPin}
                alt="not read"
                className="cursor-pointer"
                onClick={() => onRead(message)}
              />
            </Tooltip>
          )}
        </div>
      </div>
      <div
        className="w-full text-gray-700"
        onClick={() => message.link && window.open(message.link)}
      >
        {message.message}
      </div>
    </div>
  );
};

NotificationItem.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    link: PropTypes.string,
    is_read: PropTypes.bool.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onRead: PropTypes.func.isRequired,
};

export default NotificationItem;
