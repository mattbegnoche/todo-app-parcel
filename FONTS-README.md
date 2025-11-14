# Font Setup - Self-hosted Josefin Sans

## Required Font Files

Place these files in `src/fonts/`:

```
src/fonts/
├── JosefinSans-Regular.woff2
├── JosefinSans-Regular.woff
├── JosefinSans-Bold.woff2
└── JosefinSans-Bold.woff
```

## How to get the font files:

### Option A: Google Webfonts Helper (Recommended)

1. Visit: https://google-webfonts-helper.herokuapp.com/fonts/josefin-sans
2. Select weights: 400 (regular) and 700 (bold)
3. Copy the CSS (already done in our fonts.css)
4. Download the font files

### Option B: Manual download and conversion

1. Visit Google Fonts: https://fonts.google.com/specimen/Josefin+Sans
2. Download the font family
3. Convert TTF files to WOFF/WOFF2 using:
   - https://cloudconvert.com/ttf-to-woff2
   - https://everythingfonts.com/ttf-to-woff2

## Current Setup

✅ `src/css/fonts.css` - Font face declarations
✅ `src/css/variables.css` - Font family and weight variables  
✅ `src/css/typography.css` - Typography styles
✅ `src/css/index.css` - Import order configured
✅ `src/fonts/` - Directory created (add font files here)

## Usage in CSS

```css
/* Use the CSS custom properties */
.my-element {
  font-family: var(--font--family);
  font-weight: var(--font--weight-normal); /* or var(--font--weight-bold) */
}
```

## Benefits of Self-hosted Fonts

- ✅ Better performance (no external requests)
- ✅ Works offline
- ✅ No dependency on Google Fonts CDN
- ✅ Better privacy (no tracking)
- ✅ Parcel will optimize and cache the fonts automatically
