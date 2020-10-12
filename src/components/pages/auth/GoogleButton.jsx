import React from 'react';
// import PropTypes from 'prop-types';
import Button from 'components/form-components/Button';
// TODO: make google icon 64*64
import googleLogo from 'components/pages/auth/Google-512.png';
import Tooltip from 'components/Tooltip';
import { useTranslation } from 'react-i18next';

// const GoogleButton = ({ children }) => (
//   <div className="mt-3 intro-x">
//     <Button
//       className="px-8"
//       isRounded
//       isElevated
//       variant="dark"
//     >
//       <div className="pr-2 mr-2 border-r-1 border-gray-600">
//         <img className="w-4 h-4" src={googleLogo} alt="G" />
//       </div>
//       <div>{children}</div>
//     </Button>
//   </div>
// );

const GoogleButton = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-3 intro-x">
      <Tooltip content={`${t('inDevelopment')}...`}>
        <Button className="px-8 w-full disabled">
          <div className="pr-2 mr-2 border-r-1 border-gray-600">
            <img className="w-4 h-4" src={googleLogo} alt="G" />
          </div>
          <div>{children}</div>
        </Button>
      </Tooltip>
    </div>
  );
};

GoogleButton.propTypes = {};

export default GoogleButton;
