/* global $ */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Tooltip = (props) => {
  const {
    content, children, theme, animation, delay, trigger,
  } = props;
  const childRef = useRef();
  const contentRef = useRef();

  const isContentStr = typeof content === 'string';

  useEffect(() => {
    // TODO: add more options
    const options = {
      animation,
      delay,
      theme: `tooltipster-${theme}`,
      trigger,
    };
    if (!isContentStr) {
      options.content = contentRef.current;
    }
    $(childRef.current).tooltipster(options);
    // return () => {
    //   $(childRef.current).tooltipster('destroy');
    // };
  }, [animation, theme, delay, trigger]);

  // maybe we can use cloneElement for remove span el
  // const element = React.cloneElement(children, { ref: childRef });

  return (
    <>
      <span ref={childRef} title={isContentStr ? content : undefined}>
        {children}
      </span>
      {!isContentStr && (
        <div className="tooltip-content">
          <div ref={contentRef}>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

Tooltip.propTypes = {
  content: PropTypes.node.isRequired,
  theme: PropTypes.oneOf(['default', 'light', 'borderless', 'punk', 'noir', 'shadow']),
  animation: PropTypes.oneOf(['fade', 'grow', 'swing', 'slide', 'fall']),
  delay: PropTypes.number,
  trigger: PropTypes.oneOf(['hover', 'click', 'custom']),
};

Tooltip.defaultProps = {
  theme: 'borderless',
  animation: 'fade',
  delay: 0,
  trigger: 'hover',
};

export default Tooltip;
