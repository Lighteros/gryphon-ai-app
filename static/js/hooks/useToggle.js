import { useState, useCallback } from "react";
export function useToggle(defaultValue) {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = useCallback(() => setValue((x) => !x), []);

  return [value, toggle, setValue];
}
