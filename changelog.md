## 2024-07-26 16:00:00

- Adjusted homepage "Learn More" button scroll target (`#about`) to account for fixed navbar height using `scroll-margin-top` in `styles.css`.
- Enabled previous/next navigation in the gallery image viewer (Lightbox) by adding `data-lightbox="gallery"` to image links in `index.html`.
- Made UPI QR code and donation receipt images clickable for zoom view on `donate.html` by wrapping them in Lightbox-enabled links.

## 2024-07-26 16:30:00

- Fixed "Our Mission" section visibility by removing conflicting opacity/transform styles from `.about` in `styles.css`.
- Corrected navigation active state logic in `js/main.js` to highlight only the current section's link.
- Reverted gallery item HTML structure in `index.html` to fix layout issues (`<a><img/></a>`).
- Reordered sections on `donate.html` to place "Schedule a Visit" before "Direct Contribution Information".

## 2024-07-26 17:00:00

- Reverted all changes made to the `.gallery-grid` section in `index.html` back to the original state (using `Gallary/` paths and `data-lightbox="image-gallery"`) to fix layout issues.

## 2024-07-26 17:15:00

- Removed filter buttons (All, Education, etc.) from the gallery section in `index.html`.
- Verified Lightbox setup (`data-lightbox="image-gallery"`) for enabling prev/next navigation (no code change needed).

## 2024-07-26 17:30:00

- Removed `defer` attribute from Lightbox JS script tag in `index.html` as a potential fix for missing navigation arrows.

## 2024-07-26 17:45:00

- Commented out JavaScript code in `script.js` and `js/main.js` that referenced non-existent elements (`#menuButton`, `.hamburger-menu`) to resolve console errors.
- This should allow Lightbox and other scripts to function correctly.

## 2024-07-26 18:00:00

- Refactored `script.js`: Removed `fetch('nav.html')` calls (fixing CORS errors), removed code referencing non-existent elements, consolidated into one `DOMContentLoaded` listener, and removed redundant logic.

## 2024-07-26 18:15:00

- Removed `integrity` and `crossorigin` attributes from Lightbox CSS link and JS script tags in `index.html` to resolve Subresource Integrity (SRI) errors preventing Lightbox from loading.

## 2024-07-26 18:30:00

- Added jQuery script tag before Lightbox script tag in `index.html`, as Lightbox depends on jQuery and was failing to initialize.

## 2024-07-26 18:40:00

- Removed "Support Our Cause" section from `index.html`.
- Added "Support Our Cause" heading (`<h2 class="section-title">`) to `volunteer.html` above the description paragraph.

## 2024-07-26 18:50:00

- Reordered navigation links in `index.html`, `donate.html`, and `volunteer.html` to place "Gallery" before "Impact".

## 2024-07-26 19:00:00

- Centered the UPI "Supported Apps" icons on `donate.html` using `justify-content: center;` in `styles.css`.

## 2024-07-26 19:10:00

- Updated the "Support Our Cause" button link in the hero section of `index.html` to point to `volunteer.html`. 