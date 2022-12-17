import { makeAutoObservable, observable } from 'mobx';

class CanvasState {
  canvas = null;
  undoList = [];
  redoList = [];
  username = '';
  socket = null;
  sessionId = null;

  constructor() {
    makeAutoObservable(this, {
      undoList: observable,
    });
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  addUndoAction(action) {
    this.undoList.push(action);
  }

  addRedoAction(action) {
    this.redoList.push(action);
  }

  setUsername(name) {
    this.username = name;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  setSessionId(id) {
    this.sessionid = id;
  }

  undo() {
    let ctx = this.canvas.getContext('2d');
    if (this.undoList.length) {
      let dataUrl = this.undoList.pop();
      this.addRedoAction(this.canvas.toDataURL());
      let image = new Image();
      image.src = dataUrl;
      image.onload =  () => {
        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      }
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth);
    }
  }

  redo() {
    let ctx = this.canvas.getContext('2d')
    if (this.redoList.length > 0) {
      let dataUrl = this.redoList.pop();
      this.addUndoAction(this.canvas.toDataURL());
      let image = new Image();
      image.src = dataUrl;
      image.onload =  () => {
        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }
}

export default new CanvasState();
