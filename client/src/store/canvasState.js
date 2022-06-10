import { makeAutoObservable } from 'mobx';

class CanvasState {
  canvas = null;
  undoList = [];
  redoList = [];
  username = '';
  socket = null;
  sessionId = null;

  constructor() {
    makeAutoObservable(this); // данные которые хранятся в этом файле отслеживаемые
  }

  setSessionId(id) {
    this.sessionId = id;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  setUsername(username) {
    this.username = username;
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  pushToUndo(data) {
    this.undoList.push(data);
  }

  pushToRedo(data) {
    this.redoList.push(data);
  }

  undo() {
    this.ctx = this.canvas.getContext('2d');

    if (this.undoList.length) {
      const dataUrl = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL());
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  redo() {
    this.ctx = this.canvas.getContext('2d');

    if (this.undoList.length) {
      const dataUrl = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL());
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }
}

export default new CanvasState();
