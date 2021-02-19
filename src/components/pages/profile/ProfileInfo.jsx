import React from 'react';
// import { Key, RefreshCcw } from 'react-feather';
import { useTranslation } from 'react-i18next';
// import Api from 'api';
// import { YesNoModal } from 'components/modals';
// import Button from 'components/form-components/Button';
// import Tooltip from 'components/Tooltip';
import TabContent from './TabContent';
import TabContentBlock from './TabContentBlock';

const ProfileInfo = () => {
  const { t } = useTranslation();
  // const [token, setToken] = useState(localStorage.getItem('token'));
  // const refreshTokenModalRef = React.useRef();

  // const refreshToken = () => {
  //   Api.get('rest-auth/refresh-token/')
  //     .then((resp) => {
  //       localStorage.setItem('token', resp.data.token);
  //       setToken(resp.data.token);
  //     });
  //   refreshTokenModalRef.current.hide();
  // };

  return (
    <TabContent>
      <TabContentBlock large title={t('userInformation')}>
        {t('inDevelopment')}...
      </TabContentBlock>
      {/*<TabContentBlock title={t('accessToken')}>*/}
      {/*  <YesNoModal*/}
      {/*    ref={refreshTokenModalRef}*/}
      {/*    header={`${t('refreshToken')}?`}*/}
      {/*    message={t('afterRefreshTokenYouLoseAccess')}*/}
      {/*    icon={RefreshCcw}*/}
      {/*    onYes={refreshToken}*/}
      {/*  />*/}
      {/*  <div className="mb-3 flex flex-wrap items-center justify-center sm:justify-start">*/}
      {/*    <Key className="my-2" />*/}
      {/*    <span className="px-3 py-2 rounded-full bg-gray-200 text-gray-600 ml-3 mr-1">*/}
      {/*      {token}*/}
      {/*    </span>*/}
      {/*    <Tooltip content={t('refreshToken')}>*/}
      {/*      <Button*/}
      {/*        variant="secondary"*/}
      {/*        className="my-2"*/}
      {/*        isRounded*/}
      {/*        onClick={() => refreshTokenModalRef.current.show()}*/}
      {/*      >*/}
      {/*        <RefreshCcw />*/}
      {/*      </Button>*/}
      {/*    </Tooltip>*/}
      {/*  </div>*/}
      {/*  <div className="w-full flex justify-center border-t
      border-gray-200 dark:border-dark-5 mt-2">*/}
      {/*    <div className="bg-white dark:bg-dark-3 px-5 -mt-3 text-gray-600">?</div>*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    {t('toAccessRESTAddHeader')}:*/}
      {/*  </div>*/}
      {/*  <div className="text-theme-9">*/}
      {/*    <b>Authorization:</b> Token {token}*/}
      {/*  </div>*/}
      {/*</TabContentBlock>*/}
    </TabContent>
  );
};

export default ProfileInfo;
