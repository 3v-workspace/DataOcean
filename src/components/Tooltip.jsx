import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Tooltip = (props) => {
  const {
    content, children, theme, animation, delay, trigger,
    distance, className, position, arrow,
  } = props;
  const childRef = useRef();
  const contentRef = useRef();

  const isContentStr = typeof content === 'string';

  useEffect(() => {
    // TODO: add more options
    const options = {
      // container: 'body',
      animation,
      delay,
      theme: `tooltipster-${theme}`,
      trigger,
      distance,
      position,
      arrow,
      // contentAsHTML: true,
    };
    if (!isContentStr) {
      options.content = contentRef.current;
    }
    if ($(childRef.current).hasClass('tooltipstered')) {
      $(childRef.current).tooltipster('destroy');
    }
    $(childRef.current).tooltipster(options);

    // return () => {
    //   $(childRef.current).tooltipster('destroy');
    // };
  }, [animation, theme, delay, trigger, distance, content]);


  // maybe we can use cloneElement for remove span el
  // const element = React.cloneElement(children, { ref: childRef });
  return (
    <>
      <span className={className} ref={childRef} title={isContentStr ? content : undefined}>
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
  className: PropTypes.string,
  content: PropTypes.node.isRequired,
  theme: PropTypes.oneOf(['default', 'light', 'borderless', 'punk', 'noir', 'shadow']),
  animation: PropTypes.oneOf(['fade', 'grow', 'swing', 'slide', 'fall']),
  delay: PropTypes.number,
  trigger: PropTypes.oneOf(['hover', 'click', 'custom']),
  distance: PropTypes.number,
  position: PropTypes.oneOf([
    'right', 'left', 'top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left',
  ]),
  arrow: PropTypes.bool,
};

Tooltip.defaultProps = {
  className: undefined,
  theme: 'borderless',
  animation: 'fade',
  delay: 0,
  trigger: 'hover',
  distance: 6,
  position: 'top',
  arrow: true,
};

export default Tooltip;
