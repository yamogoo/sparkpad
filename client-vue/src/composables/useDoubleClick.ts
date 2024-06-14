export const useDoubleClick = (ms: number) => {
  let time = new Date().getTime(),
    prevTime = time,
    doubleCounter = 0;

  return function (cb: () => void) {
    time = new Date().getTime();
    doubleCounter++;

    if (time - prevTime < ms) {
      if (doubleCounter >= 1) {
        cb();
        doubleCounter = 0;
      }
    } else doubleCounter = 0;

    prevTime = time;
  };
};
