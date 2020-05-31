import React from 'react';
import { Activity, Edit, FileText, Home, Trello } from 'react-feather';

export default [
  {
    title: 'Домівка',
    route: '/',
    icon: <Home />,
  },
  {
    title: 'Конструктори даних',
    route: '/endpoints',
    icon: <Edit />,
    items: [
      {
        title: 'Набори даних',
        route: '/datasets',
        icon: <Activity />,
      },
      {
        title: 'Мої дані',
        route: '/my-data',
        icon: <Activity />,
      },
    ],
  },
  {
    title: 'Нормативно-довідкова інформація',
    route: '/documents',
    icon: <FileText />,
  },
  {
    title: 'Аналітика',
    route: '/analytics',
    icon: <Trello />,
  },
  {
    title: 'Контакти',
    route: '/contacts',
    icon: <Activity />,
  },
  {
    title: 'Увійти',
    route: '/auth/',
    icon: <Activity />,
  },
];
