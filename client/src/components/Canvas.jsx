import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';

import '../styles/canvas.scss';
import Rect from '../tools/Rect';

const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();

  const [visible, setVisible] = useState(true);

  const params = useParams();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    axios
    .get(`http://localhost:5000/image?:id=${params.id}`)
    .then((response) => {
      const img = new Image();
      img.src = response.data;
      img.onload = () => {
        this.ctx.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        this.ctx.drawImage(
          img,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      };
    });
  }, []);

  const drawHandler = (message) => {
    const { figure } = message;
    const ctx = canvasRef.current.getContext('2d');
    switch (figure.type) {
    case 'brush': {
      Brush.draw(ctx, figure.x, figure.y);
      break;
    }
    case 'rect': {
      Rect.staticDraw(
        ctx,
        figure.x,
        figure.y,
        figure.width,
        figure.height,
        figure.color
      );
      break;
    }
    case 'finish': {
      ctx.beginPath();
      break;
    }
    default:
      break;
    }
  };

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket('ws://localhost:5000/');
      toolState.setTool(new Brush(canvasRef.current, socket, params.id));

      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);

      socket.onopen = () => {
        console.log('Подключение установлено');

        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: 'connection'
          })
        );
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        console.log(event);
        switch (message.method) {
        case 'connection':
          console.log(`Пользователь ${message.username} подключился`);

          break;
        case 'draw':
          drawHandler(message);
          break;
        default:
          break;
        }
      };
    }
  }, [canvasState.username]);

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current?.toDataURL());
    axios
    .post(`http://localhost:5000/image?:id=${params.id}`, {
      img: canvasRef.current.toDataURL()
    })
    .then((response) => console.log(response.data));
  };

  const connectHandler = () => {
    canvasState.setUsername(usernameRef.current.value);
    setVisible(false);
  };

  return (
    <div className='canvas'>
      <Modal show={visible} onHide={() => {
      }}>
        <Modal.Header>
          <Modal.Title>Введите ваше имя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='text' ref={usernameRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => connectHandler()}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>

      <canvas
        onMouseDown={mouseDownHandler}
        ref={canvasRef}
        height='600'
        width='1000'
      />
    </div>
  );
});

export default Canvas;
