import React, { useRef } from 'react';
import Button from 'components/form-components/Button';
import { Maximize } from 'react-feather';
import toggleFullScreen from 'utils/fullscreen';
import { useTranslation } from 'react-i18next';

const PepGraphPage = () => {
  const boxRef = useRef();
  const { t } = useTranslation();
  const pepUrl = process.env.REACT_APP_PEP_GRAPH_URL;
  if (!pepUrl) {
    throw new Error('You must set REACT_APP_PEP_GRAPH_URL in .env');
  }

  return (
    <>
      <div className="intro-y flex justify-between mt-5 mb-3">
        <h2 className="text-lg font-medium">
          {t('pepScheme')}
        </h2>
        <Button onClick={() => toggleFullScreen(boxRef.current)}>
          <Maximize className="w-5 h-5 mr-2" /> {t('fullscreen')}
        </Button>
      </div>
      <div className="intro-y" ref={boxRef} style={{ height: '850px' }}>
        <iframe
          title="pep-scheme"
          src={pepUrl}
          frameBorder="0"
          style={{ borderRadius: '12px' }}
          width="100%"
          height="100%"
        />
      </div>

    </>
  );
};

// HelpPage.propTypes = {};

export default PepGraphPage;
