const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const archiver = require("archiver");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const DOWNLOAD_DIR = path.join(__dirname, "downloads");
if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR);

app.post("/download", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ success: false, message: "No URL provided" });
  }

  const timestamp = Date.now();
  const folderPath = path.join(DOWNLOAD_DIR, `playlist_${timestamp}`);
  fs.mkdirSync(folderPath);

  // yt-dlp command
  const command = `yt-dlp --ignore-errors -f b --match-filter "!is_live & !is_upcoming" -o "${folderPath}/%(title)s.%(ext)s" "${url}"`;

  console.log(`▶️ Downloading playlist from: ${url}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Download error:", stderr || stdout || error.message);
      return res.status(500).json({ success: false, message: "Download failed" });
    }

    const zipPath = path.join(__dirname, "public", "playlist.zip");
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", err => {
      console.error("❌ Archive error:", err);
      return res.status(500).json({ success: false, message: "Zipping failed" });
    });

    output.on("close", () => {
      console.log("✅ Zipping complete. File ready for download.");
      res.json({ success: true });
    });

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
  });
});

app.get("/download-zip", (req, res) => {
  const zipPath = path.join(__dirname, "public", "playlist.zip");
  if (fs.existsSync(zipPath)) {
    res.download(zipPath);
  } else {
    res.status(404).send("ZIP file not found");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
