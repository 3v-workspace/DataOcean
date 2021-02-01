import React, { useEffect, useState } from 'react';
import { Bell, AlertCircle } from 'react-feather';
import Api from 'api';
import NotificationItem from 'components/nav/NotificationItem';

const Notifications = () => {
  const dropdownRef = React.createRef();

  // const [show, setShow] = useState(false);
  const [bullet, setBullet] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [messages, setMessages] = useState([]);

  const fetchData = () => {
    Api.get('users/notifications/')
      .then((resp) => {
        const { data } = resp;
        setAlerts(data.alerts);
        setMessages(data.messages);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setBullet(!!(alerts.length || (messages.length && (
      messages.find((m) => !m.is_read))
    )));
  }, [alerts, messages]);

  const handleClickBell = () => {
    if (dropdownRef.current.classList.contains('show')) {
      fetchData();
    }
  };

  const readAll = () => {
    Api.put('users/notifications/read-all/')
      .then((resp) => {
        setMessages(resp.data);
      });
  };

  const readNotification = (message) => {
    Api.put(`users/notifications/${message.id}/read/`)
      .then((resp) => {
        setMessages(resp.data);
      });
  };

  const deleteNotification = (message) => {
    Api.delete(`users/notifications/${message.id}/delete/`)
      .then((resp) => {
        setMessages(resp.data);
      });
  };

  return (
    <>
      <div
        className={`dropdown-toggle notification ${bullet ? 'notification--bullet' : ''} cursor-pointer`}
        onClick={handleClickBell}
      >
        <Bell className="notification__icon" />
      </div>
      <div
        ref={dropdownRef}
        className="notification-content dropdown-box mt-8 absolute top-0 left-0 sm:left-auto sm:right-0 z-20 -ml-10 sm:ml-0"
      >
        <div className="notification-content__box dropdown-box__content box">
          <div className="notification-content__title border-b-1 pb-2 flex items-center justify-between">
            Notifications
            <small className="cursor-pointer font-normal text-gray-600" onClick={readAll}>
              Позначити всі як прочитані
            </small>
          </div>
          <div className="notification-content__body">
            {alerts.map((alert, i) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className={
                  `${alert.link ? 'cursor-pointer' : ''} ` +
                  'relative flex items-center text-theme-6'
                }
              >
                <div className="bg-theme-6 self-stretch w-2" />
                <div
                  className="w-full py-1 px-2"
                  onClick={() => alert.link && window.open(alert.link)}
                >
                  {alert.message}
                </div>
                <div className="w-12 h-12 flex-none mr-1 ml-3">
                  <AlertCircle className="w-10 h-10" />
                </div>
              </div>
            ))}
            {messages.map((message) => (
              <NotificationItem
                key={message.id}
                message={message}
                onRead={readNotification}
                onDelete={deleteNotification}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

Notifications.propTypes = {};

export default Notifications;
