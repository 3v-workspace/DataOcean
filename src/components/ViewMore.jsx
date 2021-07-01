import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ViewMore = (props) => {
  const { element, isOpen, children } = props;
  const { t } = useTranslation();

  if (!element) {
    return '1';
  }

  if (element.offsetHeight >= element.scrollHeight && !isOpen) {
    return `not display ${element.offsetHeight} - ${element.scrollHeight}`;
  }

  return isOpen ? (
    <>
      {/*<ChevronUp className="w-4 h-6" />*/}
      {t('viewLess')} {isOpen} {element.offsetHeight} - {element.scrollHeight}
    </>
  ) : (
    <>
      {/*<ChevronDown className="w-4 h-6" />*/}
      {t('viewMore')} {isOpen} {element.offsetHeight} - {element.scrollHeight}
    </>
  );
};

ViewMore.propTypes = {
  element: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
};

ViewMore.defaultProps = {
  element: {},
};

export default ViewMore;
