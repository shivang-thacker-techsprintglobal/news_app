/**
 * Date Utility Functions
 * 
 * Helper functions for date formatting and manipulation
 * 
 * @module utils/dateUtils
 */

/**
 * Format a date to "X minutes/hours/days ago" format
 * 
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted time string
 * 
 * @example
 * formatTimeAgo('2023-10-20T10:00:00Z') // "2 hours ago"
 */
export const formatTimeAgo = (date) => {
  const now = new Date();
  const publishedDate = new Date(date);
  const diffInSeconds = Math.floor((now - publishedDate) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
};

/**
 * Format a date to a readable string
 * 
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 * 
 * @example
 * formatDate('2023-10-20T10:00:00Z') // "October 20, 2023"
 */
export const formatDate = (date) => {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString('en-US', options);
};

/**
 * Format a date with time
 * 
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date and time string
 * 
 * @example
 * formatDateTime('2023-10-20T10:00:00Z') // "October 20, 2023 at 10:00 AM"
 */
export const formatDateTime = (date) => {
  const d = new Date(date);
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: '2-digit' };
  
  const dateStr = d.toLocaleDateString('en-US', dateOptions);
  const timeStr = d.toLocaleTimeString('en-US', timeOptions);
  
  return `${dateStr} at ${timeStr}`;
};

