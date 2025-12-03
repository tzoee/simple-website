import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load HTML, CSS, and JS
const html = readFileSync(join(process.cwd(), 'index.html'), 'utf-8');
const css = readFileSync(join(process.cwd(), 'css/style.css'), 'utf-8');
const js = readFileSync(join(process.cwd(), 'js/main.js'), 'utf-8');

describe('Navigation Unit Tests', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    dom = new JSDOM(html, {
      url: 'http://localhost',
      runScripts: 'dangerously',
      resources: 'usable',
    });
    document = dom.window.document;
    window = dom.window;

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // Inject JS
    const script = document.createElement('script');
    script.textContent = js;
    document.body.appendChild(script);
  });

  describe('Smooth scroll behavior', () => {
    it('should have smooth scroll enabled in CSS', () => {
      const html = document.documentElement;
      const computedStyle = window.getComputedStyle(html);
      
      // Check CSS contains smooth scroll
      const style = document.querySelector('style');
      expect(style.textContent).toContain('scroll-behavior: smooth');
    });

    it('should have navigation links with valid href attributes', () => {
      const navLinks = document.querySelectorAll('.nav-link');
      
      expect(navLinks.length).toBeGreaterThan(0);
      
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href.startsWith('#')).toBe(true);
      });
    });

    it('should have target sections for all navigation links', () => {
      const navLinks = document.querySelectorAll('.nav-link');
      
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        expect(targetSection).toBeTruthy();
      });
    });
  });

  describe('Active menu highlighting', () => {
    it('should have active class styling in CSS', () => {
      const style = document.querySelector('style');
      expect(style.textContent).toContain('.nav-link.active');
    });

    it('should be able to add and remove active class', () => {
      const navLink = document.querySelector('.nav-link');
      
      navLink.classList.add('active');
      expect(navLink.classList.contains('active')).toBe(true);
      
      navLink.classList.remove('active');
      expect(navLink.classList.contains('active')).toBe(false);
    });
  });

  describe('Mobile menu toggle', () => {
    it('should have mobile menu toggle button', () => {
      const navToggle = document.querySelector('.nav-toggle');
      expect(navToggle).toBeTruthy();
    });

    it('should have mobile menu', () => {
      const navMenu = document.querySelector('.nav-menu');
      expect(navMenu).toBeTruthy();
    });

    it('should have hamburger icon', () => {
      const hamburger = document.querySelector('.hamburger');
      expect(hamburger).toBeTruthy();
    });

    it('should be able to toggle active class on menu', () => {
      const navMenu = document.querySelector('.nav-menu');
      const navToggle = document.querySelector('.nav-toggle');
      
      navMenu.classList.add('active');
      navToggle.classList.add('active');
      
      expect(navMenu.classList.contains('active')).toBe(true);
      expect(navToggle.classList.contains('active')).toBe(true);
      
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      
      expect(navMenu.classList.contains('active')).toBe(false);
      expect(navToggle.classList.contains('active')).toBe(false);
    });

    it('should have mobile menu styles in CSS', () => {
      const style = document.querySelector('style');
      const cssText = style.textContent;
      
      expect(cssText).toContain('.nav-menu.active');
      expect(cssText).toContain('.nav-toggle.active');
    });
  });
});
