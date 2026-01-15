# Complete Setup Guide - KMD Numerical Weather Prediction System

This guide will walk you through setting up the application from scratch on your local machine.

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Installing Node.js](#installing-nodejs)
3. [Project Setup](#project-setup)
4. [Running the Application](#running-the-application)
5. [Troubleshooting](#troubleshooting)
6. [Building for Production](#building-for-production)

---

## 🖥️ System Requirements

### Minimum Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **RAM**: 4 GB minimum, 8 GB recommended
- **Disk Space**: 500 MB for project files and dependencies
- **Internet Connection**: Required for initial setup

### Software Requirements
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)
- **Modern Web Browser**: Chrome, Firefox, Edge, or Safari

---

## 📦 Installing Node.js

### Windows

1. **Download Node.js**
   - Visit https://nodejs.org/
   - Download the LTS (Long Term Support) version
   - Choose the Windows Installer (.msi) for your system (64-bit recommended)

2. **Run the Installer**
   - Double-click the downloaded file
   - Click "Next" through the installation wizard
   - Accept the license agreement
   - Keep the default installation path
   - Make sure "npm package manager" is checked
   - Click "Install"

3. **Verify Installation**
   - Open Command Prompt (Press `Win + R`, type `cmd`, press Enter)
   - Type: `node --version`
   - You should see something like: `v18.19.0`
   - Type: `npm --version`
   - You should see something like: `9.8.1`

### macOS

1. **Option A: Using the Installer**
   - Visit https://nodejs.org/
   - Download the LTS version for macOS
   - Open the downloaded .pkg file
   - Follow the installation wizard

2. **Option B: Using Homebrew (Recommended)**
   ```bash
   # Install Homebrew if you don't have it
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node
   ```

3. **Verify Installation**
   - Open Terminal
   - Type: `node --version`
   - Type: `npm --version`

### Linux (Ubuntu/Debian)

```bash
# Update package manager
sudo apt update

# Install Node.js from NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

---

## 🚀 Project Setup

### Step 1: Extract Project Files

1. Extract the project ZIP file to a location of your choice, for example:
   - Windows: `C:\Projects\kmd-nwp-system`
   - macOS/Linux: `~/Projects/kmd-nwp-system`

2. **Important File Structure**:
   ```
   kmd-nwp-system/
   ├── components/
   ├── styles/
   ├── App.tsx
   ├── main.tsx
   ├── index.html
   ├── package.json
   ├── vite.config.ts
   ├── tsconfig.json
   └── README.md
   ```

### Step 2: Open Terminal/Command Prompt

**Windows:**
1. Navigate to the project folder in File Explorer
2. Click on the address bar and type `cmd`, press Enter
3. Or right-click in the folder while holding Shift, select "Open PowerShell window here"

**macOS:**
1. Open Terminal
2. Type: `cd ` (with a space after cd)
3. Drag the project folder into the Terminal window
4. Press Enter

**Linux:**
1. Open Terminal
2. Navigate to the project: `cd ~/Projects/kmd-nwp-system`

### Step 3: Install Dependencies

In the terminal/command prompt, run:

```bash
npm install
```

This will:
- Download all required packages (React, TypeScript, Vite, Tailwind CSS, etc.)
- Create a `node_modules` folder with all dependencies
- Take 2-5 minutes depending on your internet speed

**Expected Output:**
```
added 324 packages, and audited 325 packages in 2m

97 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

---

## ▶️ Running the Application

### Starting Development Server

In the terminal, run:

```bash
npm run dev
```

**Expected Output:**
```
  VITE v6.0.3  ready in 432 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Accessing the Application

1. The application should automatically open in your default browser
2. If not, manually open your browser and go to: `http://localhost:3000`
3. You should see the KMD Numerical Weather Prediction System interface

### Stopping the Server

- Press `Ctrl + C` in the terminal
- Or close the terminal window

---

## 🔧 Troubleshooting

### Problem: "npm: command not found" or "node: command not found"

**Solution:**
- Node.js is not installed or not in your system PATH
- Reinstall Node.js and make sure to check "Add to PATH" during installation
- Restart your terminal/command prompt after installation

### Problem: Port 3000 Already in Use

**Solution:**
```bash
# The app will automatically try port 3001, 3002, etc.
# Or you can specify a different port:
npm run dev -- --port 3001
```

### Problem: Installation Fails with Permission Errors (macOS/Linux)

**Solution:**
```bash
# Don't use sudo! Instead, fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile

# Then retry installation
npm install
```

### Problem: Installation Fails with Permission Errors (Windows)

**Solution:**
- Run Command Prompt or PowerShell as Administrator
- Navigate to project folder
- Run `npm install` again

### Problem: "Cannot find module" Errors

**Solution:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Problem: Blank White Screen

**Solution:**
1. Check browser console for errors (Press F12)
2. Make sure all files are present in the project
3. Try clearing browser cache (Ctrl + Shift + Delete)
4. Restart the development server

### Problem: Styles Not Loading

**Solution:**
1. Make sure `styles/globals.css` exists
2. Check that `main.tsx` imports the CSS file
3. Restart the development server

---

## 🏗️ Building for Production

### Create Production Build

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Optimize and minify all code
- Process Tailwind CSS classes
- Generate optimized assets
- Create a `dist/` folder with production files

**Expected Output:**
```
vite v6.0.3 building for production...
✓ 245 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.30 kB
dist/assets/index-B7Gf8K9L.css   12.34 kB │ gzip:  3.21 kB
dist/assets/index-CvM8xH3k.js   142.56 kB │ gzip: 45.87 kB
✓ built in 3.42s
```

### Testing Production Build Locally

```bash
npm run preview
```

This starts a local server to preview the production build at `http://localhost:4173`

### Deploying Production Build

The `dist/` folder contains all files needed for deployment. You can:

1. **Upload to Web Server**
   - Copy all files from `dist/` folder to your web server
   - Configure server to serve `index.html` as the entry point

2. **Deploy to Netlify**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Deploy
   netlify deploy --prod --dir=dist
   ```

3. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy
   vercel --prod
   ```

---

## 📱 Testing on Different Devices

### Testing on Mobile (Same Network)

1. Start the dev server: `npm run dev`
2. Find your computer's IP address:
   - **Windows**: `ipconfig` (look for IPv4 Address)
   - **macOS/Linux**: `ifconfig` or `ip addr show`
3. On your mobile device, open browser and go to: `http://YOUR-IP-ADDRESS:3000`
   - Example: `http://192.168.1.100:3000`

---

## 🎯 Quick Reference Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Update all dependencies
npm update

# Check for outdated packages
npm outdated
```

---

## 📞 Getting Help

If you encounter issues not covered in this guide:

1. **Check the main README.md** for additional information
2. **Review error messages carefully** - they often contain the solution
3. **Search for the error message** online (Stack Overflow, GitHub Issues)
4. **Check Node.js and npm versions** are up to date
5. **Contact technical support** at your organization

---

## ✅ Verification Checklist

Before considering setup complete, verify:

- [ ] Node.js and npm are installed and working
- [ ] Project files are extracted to a folder
- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts the server successfully
- [ ] Browser opens and displays the application
- [ ] Can switch between Kenya and East Africa domains
- [ ] Can select different weather parameters
- [ ] Timeline navigation works (NEXT/PREVIOUS buttons)
- [ ] Sidebar can collapse and expand
- [ ] Legend can be toggled on/off
- [ ] No console errors in browser (press F12 to check)

---

## 🎓 Learning Resources

If you want to understand or modify the code:

- **React**: https://react.dev/learn
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vite**: https://vitejs.dev/guide/

---

**Setup Complete! You're ready to use the KMD Numerical Weather Prediction System! 🎉**
