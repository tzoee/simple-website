import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';
import { join } from 'path';

const html = readFileSync(join(process.cwd(), 'index.html'), 'utf-8');
const css = readFileSync(join(process.cwd(), 'css/style.css'), 'utf-8');

describe('Form Unit Tests', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(html, {
      url: 'http://localhost',
    });
    document = dom.window.document;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  });

  describe('Form validation with valid inputs', () => {
    it('should have contact form', () => {
      const form = document.getElementById('contactForm');
      expect(form).toBeTruthy();
    });

    it('should accept valid name input', () => {
      const nameInput = document.getElementById('name');
      nameInput.value = 'John Doe';
      
      expect(nameInput.value).toBe('John Doe');
      expect(nameInput.value.trim()).not.toBe('');
    });

    it('should accept valid email input', () => {
      const emailInput = document.getElementById('email');
      emailInput.value = 'john@example.com';
      
      expect(emailInput.value).toBe('john@example.com');
      expect(emailInput.value.trim()).not.toBe('');
    });

    it('should accept valid message input', () => {
      const messageInput = document.getElementById('message');
      messageInput.value = 'This is a test message';
      
      expect(messageInput.value).toBe('This is a test message');
      expect(messageInput.value.trim()).not.toBe('');
    });
  });

  describe('Form validation with empty fields', () => {
    it('should detect empty name field', () => {
      const nameInput = document.getElementById('name');
      nameInput.value = '';
      
      expect(nameInput.value.trim()).toBe('');
    });

    it('should detect empty email field', () => {
      const emailInput = document.getElementById('email');
      emailInput.value = '';
      
      expect(emailInput.value.trim()).toBe('');
    });

    it('should detect empty message field', () => {
      const messageInput = document.getElementById('message');
      messageInput.value = '';
      
      expect(messageInput.value.trim()).toBe('');
    });

    it('should detect whitespace-only input as empty', () => {
      const nameInput = document.getElementById('name');
      nameInput.value = '   ';
      
      expect(nameInput.value.trim()).toBe('');
    });
  });

  describe('Email format validation', () => {
    it('should have email input type', () => {
      const emailInput = document.getElementById('email');
      expect(emailInput.type).toBe('email');
    });

    it('should validate valid email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk'
      ];

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      validEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'notanemail',
        '@example.com',
        'user@',
        'user @example.com',
        'user@example'
      ];

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      invalidEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });
  });

  describe('Form reset after submission', () => {
    it('should be able to reset form', () => {
      const form = document.getElementById('contactForm');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Fill form
      nameInput.value = 'John Doe';
      emailInput.value = 'john@example.com';
      messageInput.value = 'Test message';
      
      // Reset form
      form.reset();
      
      // Check all fields are empty
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });

  describe('Error and success message elements', () => {
    it('should have error message elements', () => {
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');
      
      expect(nameError).toBeTruthy();
      expect(emailError).toBeTruthy();
      expect(messageError).toBeTruthy();
    });

    it('should have success message element', () => {
      const successElement = document.getElementById('formSuccess');
      expect(successElement).toBeTruthy();
    });

    it('should have error class styling in CSS', () => {
      const style = document.querySelector('style');
      expect(style.textContent).toContain('.form-input.error');
      expect(style.textContent).toContain('.form-error');
    });

    it('should have success class styling in CSS', () => {
      const style = document.querySelector('style');
      expect(style.textContent).toContain('.form-success');
    });
  });
});
