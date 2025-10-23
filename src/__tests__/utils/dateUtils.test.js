/**
 * Date Utils Tests
 * 
 * Unit tests for date utility functions
 * 
 * @module __tests__/utils/dateUtils
 */

import { formatTimeAgo, formatDate, formatDateTime } from '../../utils/dateUtils';

describe('dateUtils', () => {
  describe('formatTimeAgo', () => {
    beforeAll(() => {
      // Mock the current date
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2023-10-20T12:00:00Z'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should return "Just now" for dates less than 1 minute ago', () => {
      const date = new Date('2023-10-20T11:59:30Z');
      expect(formatTimeAgo(date)).toBe('Just now');
    });

    it('should return minutes ago for dates less than 1 hour ago', () => {
      const date = new Date('2023-10-20T11:30:00Z');
      expect(formatTimeAgo(date)).toBe('30 minutes ago');
    });

    it('should return hours ago for dates less than 1 day ago', () => {
      const date = new Date('2023-10-20T10:00:00Z');
      expect(formatTimeAgo(date)).toBe('2 hours ago');
    });

    it('should return days ago for dates less than 1 week ago', () => {
      const date = new Date('2023-10-18T12:00:00Z');
      expect(formatTimeAgo(date)).toBe('2 days ago');
    });

    it('should handle singular time units correctly', () => {
      const date = new Date('2023-10-20T11:00:00Z');
      expect(formatTimeAgo(date)).toBe('1 hour ago');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2023-10-20T12:00:00Z');
      const formatted = formatDate(date);
      expect(formatted).toContain('October');
      expect(formatted).toContain('20');
      expect(formatted).toContain('2023');
    });
  });

  describe('formatDateTime', () => {
    it('should format date and time correctly', () => {
      const date = new Date('2023-10-20T12:00:00Z');
      const formatted = formatDateTime(date);
      expect(formatted).toContain('October');
      expect(formatted).toContain('20');
      expect(formatted).toContain('2023');
      expect(formatted).toContain('at');
    });
  });
});

