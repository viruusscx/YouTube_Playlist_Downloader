function startDownload() {
  const url = document.getElementById('url').value;
  const progressText = document.getElementById('progress-text');
  const zipLink = document.getElementById('zipLink');
  const progressBar = document.getElementById('progress-bar');

  if (!url) {
    alert("Please paste a YouTube playlist URL");
    return;
  }

  progressText.innerText = "⏳ Downloading... Please wait";
  progressBar.style.width = "10%";
  zipLink.style.display = 'none';

  let progress = 10;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 90) {
      clearInterval(interval);
    }
    progressBar.style.width = `${Math.min(progress, 90)}%`;
    progressText.innerText = `Downloading... Please wait: ${Math.min(Math.floor(progress), 90)}%`;
  }, 800);

  fetch('/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  })
    .then(res => res.json())
    .then(data => {
      clearInterval(interval);
      if (data.success) {
        progressBar.style.width = "100%";
        progressText.innerText = "✅ Done! Click below to download ZIP.";
        zipLink.style.display = 'block';
      } else {
        progressText.innerText = "❌ Download failed";
      }
    })
    .catch(err => {
      clearInterval(interval);
      console.error(err);
      progressText.innerText = "❌ Error occurred";
    });
}
