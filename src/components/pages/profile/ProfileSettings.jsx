import React from 'react';
import ChangeInfoBlock from 'components/pages/profile/ChangeInfoBlock';
import ChangePasswordBlock from 'components/pages/profile/ChangePasswordBlock';
import ChangeLanguageBlock from 'components/pages/profile/ChangeLanguageBlock';
import TabContent from './TabContent';
import ChangeUserStatus from './ChangeUserStatus';

const ProfileSettings = () => (
  <TabContent>
    <ChangeInfoBlock />
    <ChangeUserStatus />
    <ChangeLanguageBlock />
    <ChangePasswordBlock />
  </TabContent>
);

export default ProfileSettings;
