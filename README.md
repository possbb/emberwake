# Paisley异闻录 · Paisley

Official development showcase for Paisley异闻录: a fairytale survival roguelike with local co-op, evolving magic, companions, and character transformations.

Live website: https://possbb.github.io/emberwake/

Static HTML/CSS/JavaScript, with locally hosted promotional and gameplay videos. No build step or third-party services required.

Use the top-right 中文 / English controls to change language. The preference is remembered locally; `?lang=en` and `?lang=zh` provide direct language links. The homepage and reference archive share translations and controls. Original reference-card artwork retains its Chinese text; names and descriptions are translated.

The gameplay player selects the latest 59-second Chinese or English showcase for the chosen language. Both hero backgrounds use the matching in-engine gameplay video. Background playback runs once and respects reduced-motion preferences.

The previous AI cinematic is withdrawn because it includes withheld content. The game is in development; no release date or store availability is announced here.

## Preview

Run `python -m http.server 4190` from this directory, then open http://localhost:4190.

## Deploy

GitHub Pages publishes the root of the `main` branch. Push site changes to update the public page.

Game visuals and media are included for this game's promotional website. All rights reserved.

## Current showcase — 2026-10-11

The public roster follows formal-mode availability: Princess and Magec only. New art uses the current character-presentation manifest, in-engine captures from 2026-10-10, and the five companion portraits from assets/companions.json. All new assets live in media/current.

Content was checked against survival-config.json, xana.json, magec.json, companions.json, character-growth.json, character-unlocks.json, chapter-tasks.json and little-surprises/rules.json. Disabled catch_stars is intentionally omitted. The lore section remains a reference-art archive, not a current mechanics catalog. Only the reviewed in-engine showcase remains on the page.

## Public content boundary

Use the formal-mode gates, not asset existence or developer access, as the publication boundary. `godot/character_unlocks.gd` withholds bear, xana and guayota. `game.gd` disables the talent screen and talent effects outside developer mode. Only Princess and Magec are shown. Five enabled companions remain available through the formal collection and loadout flow. Hail, lightning and Cloud Serpent reference cards are removed because they are not in the playable formal roster skill pool. The old cinematic and obsolete gameplay video are withdrawn because they include withheld content. Do not restore these through screenshots, archives, translations or future-hero placeholders.
