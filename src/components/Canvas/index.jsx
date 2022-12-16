import React from 'react';
import { observer } from 'mobx-react-lite';

import { canvasState, toolState } from '../../store';
import { Brush } from '../../tools';

import '../../styles/canvas.scss';

const Canvas = () => {
  const canvasRef = React.useRef();

  React.useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, [])

  return (
    <div className="canvas">
      <canvas
        ref={canvasRef}
        width={900}
        height={600}
      />
    </div>
  );
};

export default observer(Canvas);
