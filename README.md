# dsc.pics Stats Extension

<p align="center">
  <a href="https://chromewebstore.google.com/detail/dscpics-global-stats/hgfcfjggpadjoaedngakcghlimbibmjk" target="_blank"><img src="https://img.shields.io/badge/Chrome%20Web%20Store-Install-blue?style=for-the-badge&logo=googlechrome" alt="Install from Chrome Web Store"></a>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License: MIT">
  <img src="https://img.shields.io/badge/Version-1.0-orange?style=for-the-badge" alt="Version 1.0">
</p>

This Chrome extension provides a quick and convenient way to monitor the global statistics of the dsc.pics platform, directly from your browser. Future updates will include personalized user statistics for a comprehensive overview of your dsc.pics activity.

---

## ✨ Features

*   **Instant Global Overview:** Get real-time data on dsc.pics' total users, images uploaded, and short links created.
*   **Performance Metrics:** Track overall storage usage and recent platform activity (e.g., uploads/link views in the last 24 hours or 30 days).
*   **Offline Access:** Data is cached locally, allowing you to view the latest statistics even when offline. The extension automatically fetches fresh data when connectivity is restored.
*   **Lightweight & Fast:** Designed for efficiency, ensuring it won't impact your browsing performance.
*   **Future Personal Stats (Coming Soon):** Upcoming updates will allow you to securely connect your dsc.pics account via an API token to view your individual image count, storage usage, link creations, and total link views.

---

## 🚀 Installation

### From Chrome Web Store (Recommended)

The easiest way to install the extension is directly from the Chrome Web Store:

1.  Visit the [dsc.pics Stats Extension page](https://chromewebstore.google.com/detail/dscpics-global-stats/hgfcfjggpadjoaedngakcghlimbibmjk) (Link will be updated once published).
2.  Click the "Add to Chrome" button.
3.  Confirm the installation in the dialog box.

### Manually (For Developers/Testing)

If you wish to install the extension manually for development or testing:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/EuropeHost/dsc-pics-stats-extension.git
    cd dsc-pics-stats-extension
    ```
2.  **Open Chrome Extensions Page:**
    *   Open your Chrome browser.
    *   Navigate to `chrome://extensions/`.
3.  **Enable Developer Mode:**
    *   Toggle the "Developer mode" switch, usually located in the top-right corner of the page.
4.  **Load Unpacked Extension:**
    *   Click the "Load unpacked" button that appears.
    *   Select the `dsc_pics_stats_extension` folder (the root directory where `manifest.json` is located).
5.  **Pin the Extension:**
    *   After loading, the extension icon (a small bar chart) should appear in your Chrome toolbar. If not, click the puzzle piece icon (`🧩`) in your toolbar and then click the pin icon (`📌`) next to "dsc.pics Stats" to make it visible.

---

## 💡 Usage

1.  **Click** the "dsc.pics Stats" extension icon in your Chrome toolbar.
2.  The popup will display the latest global statistics for the dsc.pics platform.
3.  The data is automatically refreshed periodically in the background.

## ⚙️ Configuration (for local development)

If you are running a local instance of dsc.pics:

1.  **Locate `background.js`:** Open the `dsc_pics_stats_extension/background.js` file in a text editor.
2.  **Update `API_BASE_URL`:** Change the line:
    ```javascript
    const API_BASE_URL = "https://dsc.pics/api";
    ```
    to your local API endpoint, for example:
    ```javascript
    const API_BASE_URL = "http://localhost/api"; // Or your Homestead/Valet URL like "http://yourproject.test/api"
    ```
3.  **Reload Extension:** Go back to `chrome://extensions/`, find "dsc.pics Stats", and click the refresh/reload button (circular arrow icon).

---

## 👨‍💻 Development

This extension is built using standard web technologies:

*   **HTML** (for `popup.html`)
*   **CSS** (for `popup.css`)
*   **JavaScript** (for `popup.js` and `background.js`)

### Project Structure:
```
dsc_pics_stats_extension/
├── manifest.json       # Extension manifest (defines properties, permissions, etc.)
├── popup.html          # User interface for the extension popup
├── popup.css           # Styles for the popup UI
├── popup.js            # JavaScript logic for the popup UI
├── background.js       # Service worker script (runs in the background, fetches data)
└── icons/              # Folder for extension icons (16x16, 48x48, 128x128 PNGs)
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```
Feel free to explore the code, suggest improvements, or submit pull requests!

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for new features, bug fixes, or improvements, please:

1.  **Fork** the repository.
2.  **Create a new branch** for your changes.
3.  **Commit your changes** with descriptive messages.
4.  **Push your branch** to your fork.
5.  **Open a Pull Request** against the `main` branch of this repository.

Please ensure your code adheres to a clean and readable style.

---

## 📜 License

This project is open-source and licensed under the [MIT License](LICENSE).
