import React from 'react';
import { Activity, BookOpen, Edit, FileText, Home, Trello } from 'react-feather';

export default [
  {
    title: 'Домівка',
    path: '/home/dashboard/',
    icon: <Home />,
  },
  {
    title: 'Конструктори даних',
    path: '/home/constructors/',
    icon: <Edit />,
    items: [
      {
        title: 'Набори даних',
        path: '/home/constructors/datasets/',
        icon: <Activity />,
      },
      {
        title: 'Мої дані',
        path: '/home/constructors/my-data/',
        icon: <Activity />,
      },
    ],
  },
  {
    title: 'Нормативно-довідкова інформація',
    path: '/home/documents/',
    icon: <FileText />,
  },
  {
    title: 'Аналітика',
    path: '/home/analytics/',
    icon: <Trello />,
  },
  {
    title: 'Контакти',
    path: '/home/contacts/',
    icon: <BookOpen />,
  },
];
