import Tool from './Tools';

class Circle extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.save = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    const currentX = e.pageX - e.target.offsetLeft;
    // const currentY = e.pageY - e.target.offsetTop;
    const radius = currentX - this.startX;
    // const height = currentY - this.startY;
    if (this.mouseDown) {
      this.draw(this.startX, this.startY, radius);
    }
  }

  draw(x, y, radius) {
    const img = new Image();
    img.src = this.save;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }
}

export default Circle;
