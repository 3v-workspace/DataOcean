import React from 'react';
import { Activity, BookOpen, Edit, FileText, Home, Trello } from 'react-feather';

export default [
  {
    title: 'Домівка',
    route: '/home/',
    icon: <Home />,
  },
  {
    title: 'Конструктори даних',
    icon: <Edit />,
    items: [
      {
        title: 'Набори даних',
        route: '/home/datasets/',
        icon: <Activity />,
      },
      {
        title: 'Мої дані',
        route: '/home/my-data/',
        icon: <Activity />,
      },
    ],
  },
  {
    title: 'Нормативно-довідкова інформація',
    route: '/home/documents/',
    icon: <FileText />,
  },
  {
    title: 'Аналітика',
    route: '/home/analytics/',
    icon: <Trello />,
  },
  {
    title: 'Контакти',
    route: '/home/contacts/',
    icon: <BookOpen />,
  },
];
