import React from 'react';
import { File, Plus } from 'react-feather';
import { Button } from 'components/form-components';
import PropTypes from 'prop-types';

const PageBox = (props) => {
  const { children, header } = props;
  return (
    <>
      <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">
          {header}
        </h2>
        <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
          <Button className="button text-white bg-theme-1 shadow-md mr-2">
            Print
          </Button>
          <div className="dropdown relative ml-auto sm:ml-0">
            <Button variant="blank" className="dropdown-toggle px-2 box text-gray-700">
              <span className="w-5 h-5 flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </span>
            </Button>
            <div className="dropdown-box mt-10 absolute w-40 top-0 right-0 z-20">
              <div className="dropdown-box__content box p-2">
                <button
                  type="button"
                  className="flex items-center block p-2 transition duration-300 ease-in-out bg-white hover:bg-gray-200 rounded-md"
                >
                  <File className="w-4 h-4 mr-2" /> Export Word
                </button>
                <button
                  type="button"
                  className="flex items-center block p-2 transition duration-300 ease-in-out bg-white hover:bg-gray-200 rounded-md"
                >
                  <File className="w-4 h-4 mr-2" /> Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="intro-y box overflow-hidden mt-5">
        {children}
      </div>
    </>
  );
};

PageBox.propTypes = {
  header: PropTypes.string.isRequired,
};

export default PageBox;
