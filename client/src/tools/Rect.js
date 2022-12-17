import Tool from './Tool';

export default class Rect extends Tool {
  constructor(canvas, socket, sessionId) {
    super(canvas, socket, sessionId);
    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.sessionId,
      figure: {
        type: 'rect',
        x: this.startX,
        y: this.startY,
        width: this.width,
        height: this.height,
        color: this.ctx.fillStyle,
      }
    }));
  }
  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let endX = e.pageX - e.target.offsetLeft;
      let endY = e.pageY - e.target.offsetTop;
      this.width = endX - this.startX;
      this.height = endY - this.startY;
      this.draw(
        this.startX,
        this.startY,
        this.width,
        this.height,
      );
    }
  }

  draw (ctx, x, y, w, h) {
    const image = new Image();
    image.src = this.saved;
    image.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

  static staticDraw(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();
  }
}
