import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { canvasState, toolState } from '../../store';
import { Brush, Circle, Rect } from '../../tools';
import Modal from '../Modal';

import '../../styles/canvas.scss';

const Canvas = () => {
  const [isShow, setIsShow] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const canvasRef = React.useRef();
  const params = useParams();

  React.useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    let ctx = canvasRef.current.getContext('2d');
    axios
      .get(`http://localhost:3001/image?id=${params.id}`)
      .then(response => {
        const image = new Image();
        image.src = response.data;
        image.onload = () => {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      })
  }, [])

  React.useEffect(() => {
    if (canvasState.username) {
      console.log('canvasState.username', canvasState.username);
      const socket = new WebSocket(`ws://localhost:3001/`);
      canvasState.setSocket(socket)
      canvasState.setSessionId(params.id)
      console.log('socket', socket);
      toolState.setTool(new Brush(canvasRef.current, socket, params.id))
      socket.onopen = () => {
        console.log('Connect')
        socket.send(JSON.stringify({
          id:params.id,
          username: canvasState.username,
          method: 'connection',
        }))
      }
      socket.onmessage = (event) => {
        let message = JSON.parse(event.data)
        switch (message.method) {
          case 'connection':
            console.log(`User ${message.username} is connected`);
            break
          case 'draw':
            handlerDraw(message);
            break;
        }
      }
    }
  }, [canvasState.username])

  const handlerDraw = (message) => {
    const figure = message.figure;
    const ctx = canvasRef.current.getContext('2d');
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case 'rect':
        Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
        break;
      case 'circle':
        Circle.staticDraw(ctx, figure.x, figure.y, figure.radius, figure.color);
        break;
      case 'finish':
        ctx.beginPath();
        break;
    }
  }

  const handleMouseDown = (e) => {
    canvasState.addUndoAction(canvasRef.current.toDataURL());
    axios
      .post(`http://localhost:3001/image?id=${params.id}`, { img: canvasRef.current.toDataURL() })
      .then(response => console.log(response.data));
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
