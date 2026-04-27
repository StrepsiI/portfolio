# Leon — Roblox Builder Portfolio (Static)

A pure static site (HTML / CSS / JS), ready for **GitHub Pages** or any static host.

## Files
- `index.html` — entry point
- `styles.css` — design system + animations
- `script.js` — scroll reveal + parallax
- `assets/` — build screenshots (PNG)

## Local preview
Just open `index.html` in a browser, or run a tiny server:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploying to GitHub Pages
1. Create a new GitHub repo and push these files to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main / (root)**
3. Save. Your site will be live at `https://<username>.github.io/<repo>/` in a minute.

No build step required.
