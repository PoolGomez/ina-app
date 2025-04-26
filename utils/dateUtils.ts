import { format, subMonths, isWithinInterval, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Get the start date for a given time range from today
 */
export const getStartDateForRange = (range: 'last-month' | 'last-6-months'): Date => {
  const today = new Date();
  
  switch (range) {
    case 'last-month':
      return subMonths(today, 1);
    case 'last-6-months':
      return subMonths(today, 6);
    default:
      return subMonths(today, 1);
  }
};

/**
 * Check if a date string is within a given range
 */
export const isDateInRange = (dateString: string, range: 'last-month' | 'last-6-months'): boolean => {
  try {
    const date = parseISO(dateString);
    const startDate = getStartDateForRange(range);
    const endDate = new Date();
    
    return isWithinInterval(date, { start: startDate, end: endDate });
  } catch (error) {
    console.error('Error parsing date:', error);
    return false;
  }
};

/**
 * Format a date for display
 */
export const formatDate = (dateString: string, formatString = 'dd MMM yyyy'): string => {
  try {
    const date = parseISO(dateString);
    return format(date, formatString, { locale: es });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Group dates by month
 */
export const getMonthFromDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM yyyy', { locale: es });
  } catch (error) {
    console.error('Error getting month from date:', error);
    return '';
  }
};