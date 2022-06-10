import { makeAutoObservable } from 'mobx';

class ToolState {
  tool = null;

  constructor() {
    makeAutoObservable(this); // данные которые хранятся в этом файле отслеживаемые
  }

  setFillColor(color) {
    this.tool.fillColor = color;
  }

  setStrokeColor(color) {
    this.tool.strokeColor = color;
  }

  setLineWidth(lineWidth) {
    this.tool.lineWidth = lineWidth;
  }

  setTool(tool) {
    this.tool = tool;
  }
}

export default new ToolState();
