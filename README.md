# Unscrew Anything 3D

A browser-based 3D prototype inspired by a simple screw-unscrewing hyper-casual game. This project is intentionally lightweight so you can open it in a browser without installing Unity or any large editor.

It is designed as a starting point for a clone-style game prototype. It is not the official source code of an existing commercial app.

## What this includes
- 3D scene and simple screw model
- Tap/drag rotation gameplay for Android-friendly interaction
- HUD for score, time, and level
- GitHub Pages deployment workflow
- Ready-made prompts you can send to Gemini to expand the game

## Run it locally
Open the repository in a browser with a local HTTP server, for example:

```bash
python3 -m http.server 8000
```

Then visit:

http://localhost:8000

## GitHub Pages
This repo includes a GitHub Actions workflow to deploy the static site to GitHub Pages.

1. In GitHub, open the repository.
2. Go to Settings → Pages.
3. Set the source to "GitHub Actions".
4. Push to `main` and wait for deployment.
5. Open the Pages URL shown in the Actions output.

## Gemini prompts to improve it
Here are useful prompts to paste into Gemini:

1. "Create a polished 3D screw-unscrew game in JavaScript using Three.js. Add realistic bolt rotation, tap drag controls, score, timer, and multiple levels. Keep the code simple and production-ready."

2. "Add sound effects, particle effects, and a combo system to this unscrew game. Make it feel more arcade-like and mobile-friendly."

3. "Turn this into a mobile-first hyper-casual game with smooth UI, better touch controls, and increasing difficulty per level."

4. "Add a start menu, pause screen, lose/win states, and a high-score system to this Three.js game."

## Project structure
- `index.html` — app shell
- `styles.css` — game interface styling
- `src/game.js` — gameplay logic and 3D scene
- `.github/workflows/pages.yml` — GitHub Pages deployment

## Important note
This is a starter prototype and not proprietary source code from any existing app. If you want to sell or publish it, use original assets, original code, and your own art/sound.

## Recommended next step
Use Gemini to turn this prototype into a more polished game, then deploy to GitHub Pages. After that, if you want, we can help you convert it into an Android APK wrapper using Capacitor.
