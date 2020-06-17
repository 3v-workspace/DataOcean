import React from 'react';
import ChangeInfoBlock from 'components/pages/profile/ChangeInfoBlock';
import ChangePasswordBlock from 'components/pages/profile/ChangePasswordBlock';
import TabContent from './TabContent';

const ProfileSettings = () => (
  <TabContent>
    <ChangeInfoBlock />
    <ChangePasswordBlock />
  </TabContent>
);

export default ProfileSettings;
