interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateTimeValue = (value: string): ValidationResult => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(value)) {
    return {
      isValid: false,
      error: 'Please enter a valid time in HH:MM format (00:00 - 23:59)'
    };
  }
  return { isValid: true };
};

export const validateUsageValue = (value: string): ValidationResult => {
  const number = parseFloat(value);
  if (isNaN(number) || number < 0) {
    return {
      isValid: false,
      error: 'Please enter a valid positive number'
    };
  }
  return { isValid: true };
};

export const validateCostValue = (value: string): ValidationResult => {
  const number = parseFloat(value);
  if (isNaN(number) || number < 0) {
    return {
      isValid: false,
      error: 'Please enter a valid cost value'
    };
  }
  return { isValid: true };
};

export const validateToggleValue = (value: string): ValidationResult => {
  if (!['on', 'off'].includes(value.toLowerCase())) {
    return {
      isValid: false,
      error: 'Value must be either "on" or "off"'
    };
  }
  return { isValid: true };
};

export const validateScheduleValue = (value: string): ValidationResult => {
  return validateTimeValue(value);
};

export const validateNotificationValue = (value: string): ValidationResult => {
  if (!value.trim()) {
    return {
      isValid: false,
      error: 'Please enter a notification message'
    };
  }
  return { isValid: true };
};