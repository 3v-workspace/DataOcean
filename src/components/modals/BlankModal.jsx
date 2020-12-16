import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { X } from 'react-feather';


class BlankModal extends Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    $(this.modalRef.current).find('[data-dismiss="modal"]').on('click', () => {
      this.setState({ show: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { show: nowShow } = this.state;
    const { show: prevShow } = prevState;
    const { onHide } = this.props;
    if (onHide && nowShow === false && prevShow === true) {
      onHide(this.modalRef.current);
    }
  }

  show = () => {
    $(this.modalRef.current).modal('show');
    this.setState({ show: true });
  };

  hide = () => {
    $(this.modalRef.current).modal('hide');
    this.setState({ show: false });
  };

  toggle = () => {
    const { show } = this.state;
    if (show) {
      this.hide();
    } else {
      this.show();
    }
  };

  isShown = () => {
    const { show } = this.state;
    return show;
  };

  backHide = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target === this.modalRef.current) {
      this.setState({ show: false });
    }
  };

  render() {
    const {
      size, headerText, footerContent, children, className, id, closeButton,
    } = this.props;
    let modalSizeClass = '';
    if (size !== 'md') {
      modalSizeClass = `modal__content--${size}`;
    }
    return (
      <div ref={this.modalRef} id={id} className={`modal ${className}`} onClick={this.backHide}>
        <div className={`modal__content relative ${modalSizeClass}`}>
          {closeButton && (
            <a data-dismiss="modal" href="#" className="absolute right-0 top-0 mt-3 mr-3">
              <X className="w-6 h-6 text-gray-500" />
            </a>
          )}
          {headerText && (
            <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
              <h2 className="font-medium text-base mr-auto">{headerText}</h2>
            </div>
          )}
          {children}
          {footerContent && (
            <div className="px-5 py-3 text-right border-t border-gray-200">
              {footerContent}
            </div>
          )}
        </div>
      </div>
    );
  }
}

BlankModal.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onHide: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  headerText: PropTypes.string,
  footerContent: PropTypes.node,
  closeButton: PropTypes.bool,
};
BlankModal.defaultProps = {
  className: '',
  id: undefined,
  onHide: undefined,
  size: 'md',
  headerText: undefined,
  footerContent: undefined,
  closeButton: false,
};

export default BlankModal;
