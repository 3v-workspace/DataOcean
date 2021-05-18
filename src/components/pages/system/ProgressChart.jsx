import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ProgressChart = (props) => {
  const { min, current, max } = props;

  const n1Ref = React.useRef();
  const n2Ref = React.useRef();
  const n3Ref = React.useRef();

  const [styles, setStyles] = useState({ n1: {}, n2: {}, n3: {} });

  const currentPercent = Math.round((100 * (current - min)) / (max - min));

  const calcPositions = () => {
    if (n1Ref.current) {
      setStyles({
        n1: {
          left: `${-(n1Ref.current.offsetWidth / 2)}px`,
        },
        n2: {
          left: `calc(${currentPercent}% - ${(n2Ref.current.clientWidth / 2)}px)`,
        },
        n3: {
          left: `calc(100% - ${(n3Ref.current.offsetWidth / 2)}px)`,
        },
      });
    }
  };

  useEffect(() => {
    calcPositions();
  }, [min, current, max]);

  return (
    <div className="progress-chart p-3">
      <div className="progress-chart-current-container">
        <div
          ref={n2Ref}
          className="progress-chart-current-number"
          style={styles.n2}
        >
          {current}
          <div className="progress-chart-current-arrow">&#x25BC;</div>
        </div>
      </div>
      <div className="progress-chart-bar">
        <div className="progress-chart-bar-current" style={{ width: `${currentPercent}%` }} />
      </div>
      <div className="progress-chart-lines" />
      <div className="progress-chart-numbers">
        <div
          ref={n1Ref}
          className="progress-chart-number"
          style={styles.n1}
        >
          {min}
        </div>
        <div
          ref={n3Ref}
          className="progress-chart-number"
          style={styles.n3}
        >
          {max}
        </div>
      </div>
    </div>
  );
};

ProgressChart.propTypes = {
  min: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default ProgressChart;
