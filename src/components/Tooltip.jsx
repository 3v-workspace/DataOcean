import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Tooltip = (props) => {
  const {
    content, children, theme, animation, delay, trigger,
    distance, className, position, arrow, noContainer,
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
  }, [animation, theme, delay, trigger, distance, content, noContainer]);

  let element;
  if (noContainer) {
    element = React.cloneElement(children, {
      ref: childRef,
      title: isContentStr ? content : undefined,
    });
  } else {
    element = (
      <span className={className} ref={childRef} title={isContentStr ? content : undefined}>
        {children}
      </span>
    );
  }

  return (
    <>
      {element}
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
  noContainer: PropTypes.bool,
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
  noContainer: false,
  position: 'top',
  arrow: true,
};

export default Tooltip;
