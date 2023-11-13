import { useState } from "react";

const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState(() => {
    const storedData = localStorage.getItem(key);

    return storedData ? JSON.parse(storedData) : defaultValue;
  });

  const setLocalStorageValue = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));

    setValue(newValue);
  };

  return [value, setLocalStorageValue] as const;
};

export default useLocalStorage;
