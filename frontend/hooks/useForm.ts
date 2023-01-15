import { ChangeEvent, useCallback, useState } from 'react';

const useForm = <T>(initialForm: T) => {
  const [form, setForm] = useState<T>(initialForm);

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  return { form, setForm, handleInputChange };
};

export default useForm;
