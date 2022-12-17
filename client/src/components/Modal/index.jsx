import React from 'react';
import ReactDOM from 'react-dom';

import '../../styles/modal.scss';

const Modal = ({ show, title, children, onConnect, onClose }) => {

  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  React.useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  return show && (
    ReactDOM.createPortal(<div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">
            {title}
          </h4>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button onClick={onConnect} className="button">
            Connect
          </button>
          <button onClick={onClose} className="button">
            Close
          </button>
        </div>
      </div>
    </div>, document.getElementById('root'))
  );
};

export default Modal;
