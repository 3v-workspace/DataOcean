import React from 'react';
import ChangeInfoBlock from 'components/pages/profile/ChangeInfoBlock';
import ChangePasswordBlock from 'components/pages/profile/ChangePasswordBlock';
import ChangeLanguageBlock from 'components/pages/profile/ChangeLanguageBlock';
import TabContent from './TabContent';

const ProfileSettings = () => (
  <TabContent>
    <ChangeInfoBlock />
    <ChangePasswordBlock />
    <ChangeLanguageBlock />
  </TabContent>
);

export default ProfileSettings;
