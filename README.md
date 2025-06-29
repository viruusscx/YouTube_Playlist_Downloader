# 📥 YouTube Playlist Downloader

A complete Node.js-based web app to download full YouTube playlists as **ZIP**.  
Works locally with a clean UI, download progress bar, and one-click download.  
Powered by `yt-dlp`, `Node.js`, and `Express`.

---

## 🚀 Features

- 🎞️ Paste any YouTube playlist URL
- 🧠 Automatically skips live/scheduled videos
- 🧾 Shows live download progress
- 📦 Downloads all videos and zips them
- 🧍 Beginner friendly and works offline
- 💽 MP4 format supported (can extend to MP3)

---

## 📦 First-Time Setup (for Beginners)

Follow these steps even if you've never used Node.js before.

---

### ✅ Step 1: Install Required Tools

#### 1. Install Node.js  
Go to [https://nodejs.org](https://nodejs.org) and download the **LTS version**.  
After install, verify:

```bash
node -v
npm -v
```

#### 2. Install yt-dlp

##### Windows:

1. Download `yt-dlp.exe` from  
   https://github.com/yt-dlp/yt-dlp/releases/latest  
2. Rename it to just `yt-dlp`
3. Place it in the same folder as your project

##### macOS/Linux:

```bash
sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp
```

Test it:
```bash
yt-dlp --version
```

---

## 🧰 Project Setup

1. Open Terminal or Command Prompt
2. Clone or move to your project folder
3. Run:

```bash
npm install
```

That installs these dependencies (already listed in `package.json`):

- express  
- cors  
- body-parser  
- archiver

---

## ▶️ Run the App

```bash
npm start
```

or

```bash
node server.js
```

Then open your browser and go to:

```
http://localhost:3000
```

---

## 🖱️ How to Use the App

1. Paste a full **YouTube playlist URL**
2. Click the **Download Playlist in HD** button
3. Progress bar will animate
4. When done, click **Download ZIP** link to save all videos!

---

## 📁 Folder Structure

```
yt-playlist-downloader/
├── public/
│   ├── index.html       ← UI page
│   ├── style.css        ← frontend design
│   └── script.js        ← frontend logic
│
├── downloads/           ← downloaded videos (auto-created)
├── server.js            ← backend logic
├── package.json         ← npm config
├── README.md            ← this file
```

---

## 🚫 Recommended .gitignore

```
node_modules/
downloads/
playlist.zip
```

---

## 📝 Notes

- By default, all videos are downloaded in best available format (MP4)
- You can extend this to MP3 by modifying `yt-dlp` command in `server.js`

---
