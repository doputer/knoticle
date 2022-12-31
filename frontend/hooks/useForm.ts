import { ChangeEvent, useCallback, useState } from 'react';

const useForm = (initialForm: Record<string, string> = {}) => {
  const [form, setForm] = useState(initialForm);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  return { form, handleInputChange };
};

export default useForm;
