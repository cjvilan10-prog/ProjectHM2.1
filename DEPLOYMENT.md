# Free Static Hosting & Deployment Guide: Oceana Haven

This guide explains how to host the **Oceana Haven** (Corong-Corong, El Nido, Palawan) website for **100% free** without needing any Google Cloud Project, paid API credits, or server hosting costs.

---

## 1. Static vs. Backend Feature Breakdown

| Feature | Static Website Status | How It Works Without a Backend | What Would Require a Backend |
| :--- | :--- | :--- | :--- |
| **Home Page, Rooms, Facilities & Gallery** | ✅ Fully Functional | All text, pricing, room specs, and 12+ images are bundled statically in React/Vite. | None. Pure static assets. |
| **Resort Tour Video & Scene Player** | ✅ Fully Functional | Plays bundled tour scenes, supports local MP4 file selection via browser file picker, and embedded YouTube streams. | None. |
| **Booking & Reservation Inquiries** | ✅ Fully Functional | The form validates guest inputs (dates, guest count, phone, email) client-side and opens the visitor's email client (`mailto:oceanahaven38@gmail.com`) with a pre-formatted inquiry. Also offers 1-click **Gmail Web** and **Copy to Clipboard**. | Automated email sending without visitor email app (requires SendGrid/Resend API), instant credit card charging (requires Stripe/PayMongo), or live database calendar sync. |
| **Google Maps Location** | ✅ Fully Functional | Uses standard, free Google Maps embed iframe and direct link centered on Corong-Corong, El Nido, Palawan. | Paid Dynamic Google Maps JavaScript API with customized route directions or real-time geolocation. |
| **Mobile & Desktop Navigation** | ✅ Fully Functional | Pure client-side hash navigation (`#home`, `#rooms`, `#facilities`, `#gallery`, `#contact`). Works on any static web server. | None. |

---

## 2. Option A: Free Hosting on Netlify (Recommended - Simplest)

Netlify provides a generous free tier with SSL, custom domains, and automatic deployments.

### Method 1: Drag-and-Drop (No Git Required)
1. On your local computer, build the project by running:
   ```bash
   npm run build
   ```
2. This creates a folder named `dist/` containing all your static HTML, CSS, JavaScript, and images.
3. Go to [app.netlify.com](https://app.netlify.com) and log in or sign up for free.
4. Go to **Sites** and drag the `dist` folder directly into the Netlify "Drag and drop your site folder here" upload box.
5. In 5 seconds, your site is live with a free URL like `https://oceana-haven.netlify.app`!

### Method 2: Connected to GitHub
1. Push your repository to GitHub.
2. In Netlify, click **"Add new site"** → **"Import an existing project"** → choose **GitHub**.
3. Select your repository.
4. Set the build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy site"**. Netlify will automatically build and publish your site whenever you push code.

---

## 3. Option B: Free Hosting on GitHub Pages

GitHub Pages hosts static websites directly from your GitHub repository for free.

### Step-by-Step Instructions:
1. Ensure your repository is pushed to GitHub.
2. Build the project:
   ```bash
   npm run build
   ```
3. To deploy easily using the `gh-pages` tool:
   ```bash
   npm install --save-dev gh-pages
   ```
4. Add these two scripts to your `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
5. Run:
   ```bash
   npm run deploy
   ```
6. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Source**, select `gh-pages` branch and `/ (root)` folder.
   - Click **Save**.
7. Your website will be live at `https://<your-username>.github.io/<repo-name>/`.
*(Note: Because we configured `base: './'` in `vite.config.ts`, all stylesheets and images will load properly without 404 errors!)*

---

## 4. Option C: Free Hosting on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub.
2. Click **"Add New"** → **"Project"**.
3. Import your GitHub repository.
4. Vercel automatically detects **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. Your site will be live with free global CDN and HTTPS in under 1 minute.

---

## 5. Summary of Zero-Billing Configuration

- **No Cloud Services or Project Dependencies:** The entire website is pure static HTML/CSS/JS without any external cloud project.
- **No Cloud Database Required:** Inquiries use direct client-side email dispatch to `oceanahaven38@gmail.com`.
- **Relative Asset Paths:** `vite.config.ts` uses `base: './'` for zero-config hosting on any folder or subdomain.
- **Netlify SPA Routing:** `public/_redirects` and `netlify.toml` ensure client routing works seamlessly.
- **GitHub Pages Ready:** Includes `.nojekyll` in `public/` so Vite asset bundles are served properly.
