import { ChangeEvent, useCallback, useState } from 'react';

const useInput = (initialInput = '') => {
  const [input, setInput] = useState(initialInput);

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInput(value);
  }, []);

  return { input, setInput, handleInputChange };
};

export default useInput;
