import { useCallback, useEffect, useRef, useState } from "react";

export function useCountdown(countdownOption) {
  let isDeprecated = false;
  let countStart, intervalMs, isIncrement, countStop;
  if ("seconds" in countdownOption) {
    isDeprecated = true;
    countStart = countdownOption.seconds;
    intervalMs = countdownOption.interval;
    isIncrement = countdownOption.isIncrement;
  } else {
    ({ countStart, intervalMs, isIncrement, countStop } = countdownOption);
  }

  intervalMs = intervalMs ?? 1000;
  isIncrement = isIncrement ?? false;
  countStop = countStop ?? 0;
  const {
    count,
    increment,
    decrement,
    reset: resetCounter,
  } = useCounter(countStart);
  const {
    value: isCountdownRunning,
    setTrue: startCountdown,
    setFalse: stopCountdown,
  } = useBoolean(false);

  const resetCountdown = () => {
    stopCountdown();
    resetCounter();
  };

  const countdownCallback = useCallback(() => {
    if (count === countStop) {
      stopCountdown();
      return;
    }

    if (isIncrement) {
      increment();
    } else {
      decrement();
    }
  }, [count, countStop, decrement, increment, isIncrement, stopCountdown]);

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);

  return isDeprecated
    ? [
        count,
        {
          start: startCountdown,
          stop: stopCountdown,
          reset: resetCountdown,
        },
      ]
    : [
        count,
        {
          startCountdown,
          stopCountdown,
          resetCountdown,
        },
      ];
}

export function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue || 0);

  const increment = () => setCount((x) => x + 1);
  const decrement = () => setCount((x) => x - 1);
  const reset = () => setCount(initialValue || 0);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
  };
}
export function useBoolean(defaultValue) {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((x) => !x), []);

  return { value, setValue, setTrue, setFalse, toggle };
}
export function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
