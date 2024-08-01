// import classNames from "classnames";
import classNames from "classnames/bind";
import styles from "./Shape.module.css";
import { useEffect, useState, useRef, useMemo } from "react";

const cx = classNames.bind(styles);

const Shape = ({ data }) => {
  const boxes = data.flat(Infinity);
  const countOfVisibleBoxes = useMemo(() => {
    return boxes.reduce((acc, val) => (acc += val), 0);
  }, [boxes]);
  const [selected, setSelected] = useState(new Set());
  const [unload, setUnload] = useState(false);
  const timerRef = useRef(null);

  const handleClick = (e) => {
    const { target } = e;
    const index = target.getAttribute("data-index");
    const value = target.getAttribute("data-value");
    if (index === null || value === "0" || selected.has(index) || unload) {
      return;
    }
    setSelected((prevSet) => {
      let updatedSet = new Set(prevSet);
      updatedSet.add(index);
      return updatedSet;
    });
  };

  const unloading = () => {
    setUnload(true);
    const keys = Array.from(selected.keys());

    const removeNextKey = () => {
      if (keys.length) {
        let currentKey = keys.shift();
        setSelected((prev) => {
          let updatedSet = new Set(prev);
          updatedSet.delete(currentKey);
          return updatedSet;
        });
        timerRef.current = setTimeout(removeNextKey, 500);
      } else {
        setUnload(false);
        clearTimeout(timerRef);
      }
    };
    timerRef.current = setTimeout(removeNextKey, 100);
  };

  useEffect(() => {
    if (countOfVisibleBoxes === selected.size) {
      unloading();
    }
  }, [selected]);

  return (
    <div className="wrapper">
      <div className={styles.boxes} onClick={handleClick}>
        {boxes.map((box, index) => (
          <div
            className={cx({
              box: true,
              hidden: !box,
              active: selected.has(index.toString()),
            })}
            key={`${index}${box}`}
            data-index={index}
            data-value={box}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Shape;
