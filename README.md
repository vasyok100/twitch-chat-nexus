# <img src="src/assets/icons/icon128.png" height="40" style=""> Twitch Chat Nexus

A browser extension that provides features to enhance Twitch chat experience.

> Fork of [fractalo/twitch-chat-nexus](https://github.com/fractalo/twitch-chat-nexus), fixing the
> chat history that has shown "Access denied" since August 2026
> ([#4](https://github.com/fractalo/twitch-chat-nexus/issues/4)). The store versions below do not
> have this fix.

## Features
- View your chat history
- Adds an area to the chat window where you can collect chats of interest
- Indicates in color in the chat text box whether your chat has been sent successfully

## Install
Download from [Releases](https://github.com/vasyok100/twitch-chat-nexus/releases/latest) and load
it unpacked: `chrome://extensions` → Developer mode → Load unpacked.

## Build
```
npm install
npm run build
```
Load `dist-chrome/` or `dist-firefox/` — not the repository root.

## Documentation
https://twitch-chat-nexus.gitbook.io/docs/

## Upstream
[Chrome Web Store](https://chrome.google.com/webstore/detail/twitch-chat-nexus/oopcjaklhenijofoanbpchndknfadldn) ·
[Firefox Add-ons](https://addons.mozilla.org/firefox/addon/twitch-chat-nexus/)
