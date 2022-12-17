import React from 'react';
import { observer } from 'mobx-react-lite';

import { canvasState, toolState } from '../../store';
import { Brush } from '../../tools';
import Modal from '../Modal';

import '../../styles/canvas.scss';

const Canvas = () => {
  const [isShow, setIsShow] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const canvasRef = React.useRef();

  React.useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, [])

  const handleMouseDown = (e) => {
    canvasState.addUndoAction(canvasRef.current.toDataURL());
  }

  const handleCloseModal = () => {
    setIsShow(false);
  }

  const handleChangeInput = (e) => {
    const { target } = e;
    setUsername(target.value);
  }

  const handleConnect = () => {
    canvasState.setUsername(username);
    setIsShow(false);
  }

  return (
    <div className="canvas">
      <canvas
        ref={canvasRef}
        width={900}
        height={600}
        onMouseDown={handleMouseDown}
      />
      <Modal
        show={isShow}
        title="Log in"
        onClose={handleCloseModal}
        onConnect={handleConnect}
      >
        <label htmlFor="user-name">Enter your name: </label>
        <input id="user-name" type="text" onChange={handleChangeInput} />
      </Modal>
    </div>
  );
};

export default observer(Canvas);
