# Visual Archive | Standardized Dreams

A minimalist, brutalist-inspired web archive for photographic series. This project is designed to be hosted on **GitHub Pages**.

## 📁 Project Structure

- `/index.html`: The main landing page (The Hub).
- `/standardized-dreams`: Dedicated folder for the first series.
- `/style.css`: Global styles (typography, colors, transitions).

## 🛠 Asset Preparation Workflow

To maintain high performance and the correct atmosphere, follow these steps before uploading new content:

### 1. Image Optimization

- **Format:** Convert all images to `.webp` (it offers better compression than JPG).
- **Resolution:** Limit the long edge to **2000px**.
- **Compression:** Use [TinyPNG / TinyJPG](https://tinypng.com/) to reduce file size without losing visual quality.
- **Cover Image:** Ensure each series folder has a `cover.jpg` (or .webp) for the landing page card.

### 2. Audio Generation

- Use the provided Python script with the `edge-tts` library.
- **Voice:** `en-US-ChristopherNeural` (recommended for its deep, calm tone).
- **Settings:** Rate `-15%`, Pitch `-5Hz`.
- **Placement:** Save the output as `narration.mp3` inside the series folder.

### 3. Deployment

Simply push your changes to the `main` branch. GitHub Pages will automatically update the live site.

---

## 🖋 Design Philosophy

The UI is built on **Brutalist principles**:

- **High Contrast:** Deep blacks and concrete greys.
- **Typography:** Bold, Swiss-style sans-serif.
- **Meaningful Color:** Red (`#ff3e3e`) is used only for "active" signals or critical links, reminiscent of industrial aesthetics.
