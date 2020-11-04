import React from 'react';

const faqs = [
  {
    id: 1,
    question: 'Як почати працювати на Data Platform?',
    answer: (
      <div>
        <div>
          У Вашому профілі Ви знайдете токен доступу, ось приклад токену:
          <mark className="p-1 bg-gray-200">
            94c6d542af1c4c4942e51df6с4d47fbd12fb3dea
          </mark>
        </div>
        <div>
          Для того, щоб отримати доступ до API вам необхідно додати у Ваш HTTP-запит звичайний
          заголовок з назвою “Authorization” та значенням
          "Token 94c6d542af1c4c4942e51df6с4d47fbd12fb3dea" підставивши Ваш токен.
        </div>
        <div>
          Кінцевий заголовок:
          <em className="block">
            Authorization: Token 94c6d542af1c4c4942e51df6с4d47fbd12fb3dea
          </em>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    question: 'Чому не вдається отримати доступ до АPI (403)?',
    answer: (
      <div>
        <div>
          Перевірте чи правильний токен Ви використовуєте у Ваших запитах, звіривши його
          з токеном,
        </div>
        <div>
          що відображається у Вас в профілі.
        </div>
        <div>
          Також перевірте структуру заголовку у запитах що Ви надсилаєте,
          він має мати наступну структуру:
        </div>
        <div>
          <em className="block">
            Authorization: Token {'<your_token>'}
          </em>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    question: 'Чому Ваш API видає лише 10 результатів?',
    answer: (
      <div>
        <div>
          Ендпоінти, що повертають списки сутностей працюють в режимі пагінації, тобто поділені
          на сторінки.
        </div>
        <div>
          Керувати пагінацією ви можете за допомогою двух GET-параметрів:
        </div>
        <div className="pl-10">
          page - номер сторінки яку Ви хочете отримати
        </div>
        <div className="pl-10">
          page_size - кількість записів, що повертаються на одній сторінці.
        </div>
        <div>
          По замовчуванню - 10.
        </div>
        <div>
          Максимальне значення - 100.
        </div>
        <div>
          <em className="block mt-1">
            Приклад: /api/company/?page=3&page_size=25
          </em>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    question: 'Як мені отримати дані у XML форматі?',
    answer: (
      <div>
        <div>
          Щоб змінити формат даних що повертаються скористайтесь GET-параметром <em>format</em>.
        </div>
        <div>
          Можливі значення: json, xml.
        </div>
        <div>
          <em className="block mt-1">
            Приклад: /api/company/?format=xml
          </em>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    question: 'Які тарифні плани Ви маєте?',
  },
  {
    id: 6,
    question: 'Де можна знайти Вашу документацію API?',
    answer: 'Документація API за посиланням.',
  },
];

export default faqs;
