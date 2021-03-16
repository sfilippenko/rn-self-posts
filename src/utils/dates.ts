import { format } from 'date-fns';

interface FormatDateOptions {
  showHours?: boolean;
  formatString?: string;
}

export const formatDate = (date?: string, options: FormatDateOptions = {}): string => {
  // date -ISO string
  const { formatString, showHours } = options;
  if (!date) {
    return '';
  }
  let calculateFormatString;
  if (formatString) {
    calculateFormatString = formatString;
  } else {
    calculateFormatString = showHours ? 'dd.MM.yyyy HH:mm' : 'dd.MM.yyyy';
  }
  return format(new Date(date), calculateFormatString);
};
