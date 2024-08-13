import React, { useState, useEffect, useRef } from "react";

function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      initCanvas();
      goMovie();
    }
  }, [canvasRef]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;
  };

  const goMovie = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const BALL_NUM = 30;
    const R = 2;
    let balls = [];
    const ball_color = { r: 207, g: 255, b: 4 };
    const dis_limit = 260;
    const link_line_width = 0.8;

    function getRandomSpeed(pos) {
      const min = -1,
        max = 1;
      switch (pos) {
        case "top":
          return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
        case "right":
          return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
        case "bottom":
          return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
        case "left":
          return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
        default:
          return;
      }
    }

    function randomNumFrom(min, max) {
      return Math.random() * (max - min) + min;
    }

    function randomArrayItem(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function getRandomBall() {
      const pos = randomArrayItem(["top", "right", "bottom", "left"]);
      switch (pos) {
        case "top":
          return {
            x: randomSidePos(canvas.width),
            y: -R,
            vx: getRandomSpeed("top")[0],
            vy: getRandomSpeed("top")[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10),
          };
        case "right":
          return {
            x: canvas.width + R,
            y: randomSidePos(canvas.height),
            vx: getRandomSpeed("right")[0],
            vy: getRandomSpeed("right")[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10),
          };
        case "bottom":
          return {
            x: randomSidePos(canvas.width),
            y: canvas.height + R,
            vx: getRandomSpeed("bottom")[0],
            vy: getRandomSpeed("bottom")[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10),
          };
        case "left":
          return {
            x: -R,
            y: randomSidePos(canvas.height),
            vx: getRandomSpeed("left")[0],
            vy: getRandomSpeed("left")[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10),
          };
        default:
          return;
      }
    }

    function randomSidePos(length) {
      return Math.ceil(Math.random() * length);
    }

    function renderBalls() {
      balls.forEach((b) => {
        if (!b.hasOwnProperty("type")) {
          ctx.fillStyle = `rgba(${ball_color.r},${ball_color.g},${ball_color.b},${b.alpha})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
        }
      });
    }

    function updateBalls() {
      const new_balls = [];
      balls.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        if (
          b.x > -50 &&
          b.x < canvas.width + 50 &&
          b.y > -50 &&
          b.y < canvas.height + 50
        ) {
          new_balls.push(b);
        }
        b.phase += 0.03;
        b.alpha = Math.abs(Math.cos(b.phase));
      });
      balls = new_balls.slice(0);
    }

    function renderLines() {
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const fraction = getDisOf(balls[i], balls[j]) / dis_limit;
          if (fraction < 1) {
            const alpha = (1 - fraction).toString();
            ctx.strokeStyle = `rgba(150,150,150,${alpha})`;
            ctx.lineWidth = link_line_width;
            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[j].x, balls[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    function getDisOf(b1, b2) {
      const delta_x = Math.abs(b1.x - b2.x);
      const delta_y = Math.abs(b1.y - b2.y);
      return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
    }

    function addBallIfy() {
      if (balls.length < BALL_NUM) {
        balls.push(getRandomBall());
      }
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      renderBalls();
      renderLines();
      updateBalls();
      addBallIfy();
      window.requestAnimationFrame(render);
    }

    function initBalls(num) {
      for (let i = 1; i <= num; i++) {
        balls.push({
          x: randomSidePos(canvas.width),
          y: randomSidePos(canvas.height),
          vx: getRandomSpeed("top")[0],
          vy: getRandomSpeed("top")[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        });
      }
    }

    initBalls(BALL_NUM);
    window.requestAnimationFrame(render);
  };

  return (
    <div
      className="bg-black absolute top-0 left-0 w-full h-full"
      style={{ zIndex: -1 }}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default BackgroundCanvas;
