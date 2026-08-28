# <img src="src/assets/icons/icon128.png" height="40" style=""> Twitch Chat Nexus

A browser extension that provides features to enhance Twitch chat experience.

> **Fork note.** Since August 2026 the chat history shows "Access denied": Twitch gates the
> mod-logs panel behind GraphQL queries this extension does not intercept, although the server
> still returns the messages. This fork hooks `ModLogsAccessQuery`, `ViewerCardModLogs` and
> `ChannelPermissionSet` in
> [`forceModPermission.ts`](src/injected/interceptor/modules/ChatLogView/forceModPermission.ts).
> The last one is queried site-wide, so it is only touched on `/viewercard/` pages.
> Upstream report: [fractalo/twitch-chat-nexus#4](https://github.com/fractalo/twitch-chat-nexus/issues/4)

## Features
- View your chat history — button at the bottom of the chat window
- Adds an area to the chat window where you can collect chats of interest
- Indicates in color in the chat text box whether your chat has been sent successfully

## Install
Download the zip from [Releases](https://github.com/vasyok100/twitch-chat-nexus/releases/latest)
and load it unpacked:

- Chrome / Brave / Edge: `chrome://extensions` → Developer mode → Load unpacked
- Firefox: `about:debugging#/runtime/this-firefox` → Load Temporary Add-on → any file in the folder

The upstream [Chrome Web Store](https://chrome.google.com/webstore/detail/twitch-chat-nexus/oopcjaklhenijofoanbpchndknfadldn)
and [Firefox](https://addons.mozilla.org/firefox/addon/twitch-chat-nexus/) listings do **not** have
this fix. If one is installed, disable it first, or both will run on the same page.

## Build
```
npm install
npm run build
```

Output goes to `dist-chrome/` and `dist-firefox/`; load one of those, not the repository root — the
root `manifest.json` is the build input and points at TypeScript sources.

## Documentation
https://twitch-chat-nexus.gitbook.io/docs/
