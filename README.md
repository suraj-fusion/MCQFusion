# 🔌 Chrome Extension — Manual Installation Guide (No Chrome Web Store)

This repository contains a Chrome Extension that you can install and use locally on your PC without needing to publish it to the Chrome Web Store.

---

## 📦 What This Extension Does

This extension fetches YouTube video transcripts, generates multiple-choice questions (MCQs) using AI, and lets you test your knowledge right in the browser.

---

## 🚀 Installation Steps (Complete)

Google Chrome blocks direct `.crx` installs outside the Web Store. Follow **all** these steps to get the extension running:

1. **Download the Source Code**  
   - Click the green **Code** button (top-right of this repo) and select **Download ZIP**,  
     **OR**  
   - In your terminal, run:  
     ```bash
     git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
     ```

2. **Extract the ZIP / Verify Folder Structure**  
   - If you downloaded the ZIP, locate it (usually in **Downloads**), right-click → **Extract All**, or use your preferred tool (7-Zip, WinRAR).  
   - Ensure the extracted folder’s root contains:
     - `manifest.json`
     - All your extension source files (`background.js`, `content.js`, `popup.html`, icons/, etc.)

3. **Open Chrome’s Extensions Page**  
   1. Launch Google Chrome.  
   2. Navigate to:  
      ```
      chrome://extensions/
      ```  
   3. Toggle **Developer mode** ON (top-right).

4. **Load the Unpacked Extension**  
   1. On `chrome://extensions/`, click **Load unpacked**.  
   2. Select the **root folder** you extracted in Step 2 (the folder containing `manifest.json`).  
   3. Once loaded, you’ll see your extension in the list and its icon in the toolbar.

---

## 🔄 How to Update

Whenever you change the extension code (or pull updates from GitHub):

1. Go to `chrome://extensions/`.  
2. Find your extension’s card.  
3. Click the **🔄 Reload** button.

Your latest code will be re-applied immediately.

---

## 🧹 How to Uninstall

1. Go to `chrome://extensions/`.  
2. Find your extension.  
3. Click **Remove** and confirm.

---

## ⚙️ Notes & Tips

- **Developer Mode** must remain enabled for the extension to stay active.  
- This method is intended for **development**, **testing**, or **private distribution**.  
- For public distribution at scale, consider publishing to the [Chrome Web Store](https://chrome.google.com/webstore/developer/dashboard), or to other Chromium-based browser stores (Brave, Edge, Opera).

---

## 🛠 Troubleshooting

- **“Manifest is missing or unreadable”**: Double-check that `manifest.json` is in the root of the folder you selected.  
- **Extension icon not showing**: Make sure you’ve defined a browser action or page action in `manifest.json` and provided the icon paths.  
- **Permission errors**: Review the permissions array in `manifest.json`. Chrome will warn you if your code requests permissions not listed there.

---

## 📬 Feedback & Contributing

Found a bug? Want a feature?  
- Open an **Issue** in this repo.  
- Submit a **Pull Request**—all contributions are welcome!

---

## 📄 License

Distributed under the [MIT License](./LICENSE).  
Feel free to fork, modify, and use as you like.

---

Made with ❤️ and ☕ for offline installation convenience.  
