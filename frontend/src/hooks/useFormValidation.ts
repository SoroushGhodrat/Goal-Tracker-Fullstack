import { useState, useCallback } from 'react';

interface Error {
  textError: string | undefined;
  startDateError: string | undefined;
  endDateError: string | undefined;
}

type InputDate = Date | undefined;

interface SelectedDates {
  startDate: InputDate;
  endDate: InputDate;
}

const initialErrorsState: Error = {
  textError: undefined,
  startDateError: undefined,
  endDateError: undefined,
};

const useFormValidation = (text: string, selectedDates: SelectedDates) => {
  const [errors, setErrors] = useState(initialErrorsState);

  const validateText = useCallback(() => {
    if (text.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        textError: 'Description is required.',
        isErrored: true,
      }));
      return false;
    }

    setErrors((prevErrors) => ({ ...prevErrors, textError: '' }));
    return true;
  }, [text]);

  const validateStartDate = useCallback(() => {
    if (!selectedDates?.startDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        startDateError: 'Start date is required.',
        isErrored: true,
      }));
      return false;
    }

    setErrors((prevErrors) => ({ ...prevErrors, startDateError: undefined }));
    return true;
  }, [selectedDates?.startDate]);

  const validateEndDate = useCallback(() => {
    if (!selectedDates?.endDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        endDateError: 'End date is required.',
        isErrored: true,
      }));
      return false;
    }

    if (
      selectedDates?.endDate < selectedDates?.startDate! ||
      selectedDates?.endDate.getFullYear() <
        selectedDates?.startDate!.getFullYear()
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        endDateError: 'End date cannot be before start date.',
        isErrored: true,
      }));
      return false;
    }

    setErrors((prevErrors) => ({ ...prevErrors, endDateError: undefined }));
    return true;
  }, [selectedDates?.startDate, selectedDates?.endDate]);

  const validateForm = useCallback(() => {
    const isValidText = validateText();
    const isValidStartDate = validateStartDate();
    const isValidEndDate = validateEndDate();

    return isValidText && isValidStartDate && isValidEndDate;
  }, [validateText, validateStartDate, validateEndDate]);

  return {
    errors,
    setErrors,
    validateForm,
  };
};

export default useFormValidation;
