# <img src="src/assets/icons/icon128.png" height="40" style=""> Twitch Chat Nexus

A browser extension that provides features to enhance Twitch chat experience.

> **Fork note.** Since August 2026 the chat history shows "Access denied". Twitch gates the
> mod-logs panel behind GraphQL queries this extension does not intercept, so Twitch's own UI
> blocks the panel even though the server still returns the data — `viewerCardModLogs.messages`
> still comes back as a normal connection. This fork adds response hooks in
> `src/injected/interceptor/modules/ChatLogView/forceModPermission.ts` for
> `ModLogsAccessQuery`, `ViewerCardModLogs` and `ChannelPermissionSet`.
> The last one is queried site-wide, so it is only touched on `/viewercard/` pages.
> The store listings do not have this fix. Grab a prebuilt zip from
> [Releases](https://github.com/vasyok100/twitch-chat-nexus/releases/latest), or build it
> yourself — but load `dist-chrome`, **not** the repository root; see Build below.
> Upstream report: https://github.com/fractalo/twitch-chat-nexus/issues/4

## Features
- View your chat history
- Adds an area to the chat window where you can collect chats of interest
- Indicates in color in the chat text box whether your chat has been sent successfully

## Build
```
npm install
npm run postinstall
npm run build
```

The output is written to `dist-chrome/` and `dist-firefox/`. Load **that folder** as an unpacked
extension — not the repository root. The `manifest.json` in the root is the build input and points
at TypeScript sources, so loading the root gives an extension that installs but does nothing: no
chat history icon appears.

- Chrome / Brave / Edge: `chrome://extensions` → enable Developer mode → Load unpacked → `dist-chrome`
- Firefox: `about:debugging#/runtime/this-firefox` → Load Temporary Add-on → pick any file inside `dist-firefox`

The history icon is added at the bottom of the chat window. Its position can be moved to the chat
settings menu in the extension options.

## Install
[![Available in the Chrome Web Store](https://github-production-user-asset-6210df.s3.amazonaws.com/42487844/237139321-1569748d-9179-4bc8-93d0-332f7d3f8eb6.png)](https://chrome.google.com/webstore/detail/twitch-chat-nexus/oopcjaklhenijofoanbpchndknfadldn)

[![get-the-addon](https://github-production-user-asset-6210df.s3.amazonaws.com/42487844/293645728-1792c780-9716-43d2-b416-bc2ab02678ba.png)](https://addons.mozilla.org/firefox/addon/twitch-chat-nexus/)

## Documentation
https://twitch-chat-nexus.gitbook.io/docs/
