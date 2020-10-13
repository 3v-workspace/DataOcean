import React from 'react';
import { useTranslation } from 'react-i18next';
import Alert from 'components/Alert';

const HelpPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">
        {t('help')}
      </h2>
      <ul>
        <Alert variant="primary" className="intro-y mt-10">
          <li>
            {t('Як почати працювати на Data Platform?')}
          </li>
        </Alert>
        <div><p>У Вашому профілі Ви знайдете токен доступу, ось приклад токену:</p>
          <p>94c6d542af1c4c4942e51df6с4d47fbd12fb3dea</p>
          Для того, щоб отримати доступ до API вам необхідно додати у Ваш HTTP-запит
          звичайний заголовок з назвою “Authorization” та значенням
          “Token 94c6d542af1c4c4942e51df6с4d47fbd12fb3dea” підставивши Ваш токен.
          <p>Кінцевий заголовок:</p>
          Authorization: Token 94c6d542af1c4c4942e51df6с4d47fbd12fb3dea
        </div>
        <Alert variant="primary" className="intro-y mt-10">
          <li>
            {t('Чому не вдається отримати доступ до АPI (403)?')}
          </li>
        </Alert>
        <div className="answer">Перевірте чи правильний токен Ви використовуєте у Ваших запитах, звіривши його
          з токеном, що відображається у Вас в профілі.
          Також перевірте структуру заголовку у запитах що Ви надсилаєте, він має мати наступну
          структуру:
          <p>Authorization: Token {'<your_token>'}</p>
        </div>
        <Alert variant="primary" className="intro-y mt-10">
          <li>
            {t('Чому Ваш API видає лише 10 результатів?')}
          </li>
        </Alert>
        <div>Ендпоінти, що повертають списки сутностей працюють в режимі пагінації, тобто поділені
          на сторінки. Керувати пагінацією ви можете за допомогою двух GET-параметрів:
          <p>page - номер сторінки яку Ви хочете отримати</p>
          <p>page_size - кількість записів, що повертаються на одній сторінці.</p>
          <p>По замовчуванню - 10. Максимальне значення - 100.</p>
          Приклад:
          <p>/api/company/?page=3&page_size=25</p>
        </div>
        <Alert variant="primary" className="intro-y mt-10">
          <li>
            {t('Як мені отримати дані у XML форматі?')}
          </li>
        </Alert>
        <div>Щоб змінити формат даних що повертаються скористайтесь GET-параметром format.
          <p>Можливі значення: json, xml.</p>
          Приклад:
          <p>/api/company/?format=xml</p>
        </div>
        <Alert variant="primary" className="intro-y mt-10">
          <li>
            {t('Які тарифні плани Ви маєте?')}
          </li>
        </Alert>
        <Alert variant="primary" className="intro-y mt-10">
          <li>
            {t('Де можна знайти Вашу документацію API?')}
          </li>
        </Alert>
        <div>Документація API за посиланням.</div>
        <Alert variant="primary" className="intro-y mt-10">
          <li>
            {t('Не знайшли відповідь на своє запитання? Зверніться до нас.')}
          </li>
        </Alert>
      </ul>
    </>
  );
};

// HelpPage.propTypes = {};

export default HelpPage;
