import React from 'react';
import TabContentBlock from 'components/pages/profile/TabContentBlock';
import UserStatusForm from 'components/pages/profile/UserStatusForm';
import { useTranslation } from 'react-i18next';


const ChangeUserStatus = () => {
  const { t } = useTranslation();


  return (
    <TabContentBlock title={t('changeUserStatus')}>
      <UserStatusForm />
    </TabContentBlock>
  );
};

export default ChangeUserStatus;
