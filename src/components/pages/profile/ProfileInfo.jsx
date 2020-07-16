import React from 'react';
import { Key } from 'react-feather';
import TabContent from './TabContent';
import TabContentBlock from './TabContentBlock';

const ProfileInfo = () => {
  const token = localStorage.getItem('token');
  return (
    <TabContent>
      <TabContentBlock title="Інформація про користувача">
        In development...
      </TabContentBlock>
      <TabContentBlock title="Токен доступу">
        <div className="mb-3 flex items-center">
          <Key />
          <span className="px-3 py-2 rounded-full bg-gray-200 text-gray-600 ml-3 mr-1">
            {token}
          </span>
        </div>
        <div className="w-full flex justify-center border-t border-gray-200 dark:border-dark-5 mt-2">
          <div className="bg-white dark:bg-dark-3 px-5 -mt-3 text-gray-600">?</div>
        </div>
        <div>
          Для доступу до REST API добавте в HTTP-запит наступний заголовок:
        </div>
        <div className="text-theme-9">
          <b>Authorization:</b> Token {token}
        </div>
      </TabContentBlock>
    </TabContent>
  );
};

export default ProfileInfo;
