/** @format */
import { useRef, useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';

export default function DisplayText({ children }) {
  const myRef = useRef();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (myRef.current) {
      const node = myRef.current;
      const parentNode = myRef.current.parentNode;
      const availableWidth = parentNode.offsetWidth;
      const actualWidth = node.offsetWidth;
      const actualScale = availableWidth / actualWidth - 0.03;

      if (scale === actualScale) {
        return;
      }
      if (actualScale < 1) {
        setScale(actualScale);
      } else {
        setScale(1);
      }
    }
  }, [children]);

  return (
    <div
      className='auto-scaling-text'
      style={{ transform: `scale(${scale},${scale})` }}
      ref={myRef}>
      {children}
    </div>
  );
}
