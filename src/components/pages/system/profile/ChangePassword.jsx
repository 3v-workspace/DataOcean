import React from 'react';
import Button from 'components/form-components/Button';

const ChangePassword = () => (
  <>
    <h2 className="intro-x text-lg font-medium mt-10">
      Змінити пароль
    </h2>
    <div className="intro-x mt-5 font-medium">
      На Вашу електронну пошту буде надіслано посилання для встановлення нового паролю
    </div>
    <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
      <Button
        type="submit"
        className="xl:w-1/2 xl:mr-3"
        width="w-full"
      >
        Отримати посилання
      </Button>
    </div>
  </>
);

export default ChangePassword;
