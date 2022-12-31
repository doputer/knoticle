import { ChangeEvent, useCallback, useState } from 'react';

const useForm = <T>(initialForm: T) => {
  const [form, setForm] = useState<T>(initialForm);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  return { form, handleInputChange };
};

export default useForm;
