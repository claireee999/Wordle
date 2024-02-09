import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  // Retrieve the stored value from localStorage or use the provided initialValue
  const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;

  // State to hold the current value
  const [value, setValue] = useState(storedValue);

  // Function to update the value and store it in localStorage
  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}

export default useLocalStorage;
