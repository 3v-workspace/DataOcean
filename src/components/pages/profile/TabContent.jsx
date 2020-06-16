import React from 'react';
// import PropTypes from 'prop-types';

const TabContent = ({ children }) => (
  <div className="tab-content mt-5">
    <div className="tab-content__pane active" id="profile">
      <div className="grid grid-cols-12 gap-6">
        {children}
      </div>
    </div>
  </div>
);

// TabContent.propTypes = {};

export default TabContent;
