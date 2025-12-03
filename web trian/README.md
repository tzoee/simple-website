# Website Simpel

Website personal yang simpel, responsif, dan modern dibangun dengan HTML, CSS, dan JavaScript vanilla.

## Fitur

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Sticky navigation dengan smooth scroll
- ✅ Hero section dengan gradient background
- ✅ About section dengan profile
- ✅ Portfolio grid dengan 3 projects
- ✅ Contact form dengan validasi
- ✅ Footer dengan social media links
- ✅ Accessibility features (skip link, ARIA labels, keyboard navigation)
- ✅ Cross-browser compatibility

## Cara Menggunakan

### Langsung di Browser

1. Buka file `index.html` di browser Anda
2. Website siap digunakan tanpa perlu build tools!

### Untuk Development dengan Testing

1. Install Node.js (jika belum ada)
2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan tests:
   ```bash
   npm test
   ```

4. Jalankan tests dalam watch mode:
   ```bash
   npm run test:watch
   ```

## Struktur Project

```
simple-website/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles
├── js/
│   └── main.js            # All JavaScript
├── assets/
│   └── images/            # Images folder
├── tests/                 # Test files
│   ├── properties.test.js # Property-based tests
│   ├── navigation.test.js # Navigation unit tests
│   └── form.test.js       # Form unit tests
├── package.json           # Dependencies
├── vitest.config.js       # Test configuration
└── README.md              # This file
```

## Testing

Website ini menggunakan:
- **Vitest** untuk unit testing
- **fast-check** untuk property-based testing
- **jsdom** untuk DOM testing

Total 10 correctness properties ditest dengan 100+ iterations masing-masing.

## Customization

### Mengubah Warna

Edit CSS variables di `css/style.css`:

```css
:root {
    --color-primary: #2563eb;
    --color-secondary: #7c3aed;
    --color-text: #1f2937;
    /* ... */
}
```

### Mengubah Konten

Edit langsung di `index.html`:
- Hero section: Ubah title dan tagline
- About section: Ubah bio text
- Portfolio: Ubah project titles dan descriptions
- Contact: Ubah email dan social media links

### Mengganti Gambar

Ganti placeholder images dengan gambar Anda sendiri:
1. Simpan gambar di folder `assets/images/`
2. Update `src` attribute di `index.html`
3. Pastikan ukuran file < 500KB untuk performa optimal

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

Free to use for personal and commercial projects.

## Credits

Built with ❤️ using vanilla HTML, CSS, and JavaScript.
