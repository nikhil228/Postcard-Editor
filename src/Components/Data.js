import Draggable from "react-draggable";
import React, { useState, useRef, useEffect } from "react";
import Nature from "../assests/Nature.jpg";
import "./Data.css";

export default function Data() {
  const imgRef = useRef();
  const textRef = useRef();
  let tasks = [];
  const [textBlock, setTextBlock] = useState(tasks);
  const [propertyState, setPropertyState] = useState({
    width: null,
    height: null,
    imgAngleRotation: `rotate(0deg)`,
    textAngleRotation: `rotate(0deg)`,
  });
  const [textSize, setTextSize] = useState({ width: null });
  const [textPositionLeft, setTextPositionLeft] = useState({ x: 0, y: 0 });
  const [textPositionRight, setTextPositionRight] = useState({
    a: 0,
    b: 0,
  });

  function editHandler() {
    const newTextBlock = [...textBlock];
    newTextBlock.push("SUNNY");
    setTextBlock(newTextBlock);
    const WIDTH = imgRef.current.clientWidth;
    setPropertyState({ width: WIDTH });
  }

  const trackPos = (data) => {
    setTextPositionLeft({ x: data.x, y: data.y });
    console.log(textPositionLeft.x + " " + textPositionLeft.y);
    setTextPositionRight({
      a: textPositionLeft.x + propertyState.width,
      b: textPositionLeft.y,
    });

    // useEffect(() => {
    //   <Draggable />;
    // }, []);
  };

  function stopHandler(e) {
    console.log("stop handler");
    if (textPositionRight.a < 0 || textPositionLeft.x > propertyState.width) {
      console.log(propertyState.width);
      const newTextBlock = [...textBlock];
      newTextBlock.pop();
      setTextBlock(newTextBlock);
    }
  }
  function ZoomInHandler() {
    const HEIGHT = imgRef.current.clientHeight;
    const WIDTH = imgRef.current.clientWidth;
    // const LEFT = imgRef.current.left;
    if (HEIGHT <= 600) {
      setPropertyState({
        ...propertyState,
        height: HEIGHT + 10,
        width: WIDTH + 10,
      });
    }
    // const x = imgRef.current.offsetLeft;
    // setX(x);
    // const y = imgRef.current.offsetTop;
    // setY(y);
    // console.log(x + ":"+ y);
  }

  function ZoomOutHandler() {
    const HEIGHT = imgRef.current.clientHeight;
    const WIDTH = imgRef.current.clientWidth;
    if (HEIGHT >= 200) {
      setPropertyState({
        ...propertyState,
        height: HEIGHT - 10,
        width: WIDTH - 10,
      });
    }
  }

  function RotateHandler() {
    const HEIGHT = imgRef.current.clientHeight;
    const WIDTH = imgRef.current.clientWidth;
    const imgAngle = imgRef.current.style.transform;
    setPropertyState({
      ...propertyState,
      imgAngleRotation: imgAngle + `rotate(90deg)`,
      width: WIDTH,
      height: HEIGHT,
    });
    console.log(propertyState.textAngleRotation);
  }
  return (
    <div className="div_main">
      <div className="div_1">
        <img
          className="img"
          src={Nature}
          style={{
            width: propertyState.width,
            height: propertyState.height,
            transform: propertyState.imgAngleRotation,
            // left: zoomState.left
          }}
          ref={imgRef}
        />

        {textBlock.map((t, index) => {
          return (
            <Draggable
              onDrag={(e, data) => trackPos(data)}
              onStop={(e) => stopHandler(e)}
            >
              <p
                className="text_block"
                key={index}
                contenteditable="true"
                style={{
                  width: propertyState.width,
                }}
                ref={textRef}
              >
                {t}
              </p>
            </Draggable>
          );
        })}
      </div>

      <div className="div_2">
        <div>
          <button className="button_1" onClick={editHandler}>
            NEW TEXT BLOCK
          </button>
        </div>
        <div>
          <button className="button_2" onClick={ZoomInHandler}>
            ZOOM IN
          </button>
        </div>
        <div>
          <button className="button_3" onClick={ZoomOutHandler}>
            ZOOM OUT
          </button>
        </div>
        <div>
          <button className="button_4" onClick={RotateHandler}>
            ROTATE
          </button>
        </div>
      </div>
    </div>
  );
}
