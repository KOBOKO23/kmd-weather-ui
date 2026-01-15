# Quick Start Guide - KMD NWP System

Get up and running in 5 minutes! ⚡

## 🚀 Super Quick Setup

### Prerequisites Check
```bash
node --version  # Need v18+
npm --version   # Need v9+
```

Don't have Node.js? → [Download here](https://nodejs.org/)

---

## 📦 Installation (3 Commands)

```bash
# 1. Navigate to project folder
cd kmd-nwp-system

# 2. Install dependencies (2-5 minutes)
npm install

# 3. Start the app
npm run dev
```

**Done!** Open http://localhost:3000 in your browser 🎉

---

## 🎮 Basic Usage

### 1. Select Domain
Click **Kenya** or **East Africa** in the left sidebar

### 2. Choose Parameter
Select from:
- 💧 Rainfall Distribution
- 🌡️ Maximum Temperature
- ❄️ Minimum Temperature
- 💨 Relative Humidity
- ⚡ CAPE

### 3. Navigate Time
Use **PREVIOUS** / **NEXT** buttons to move through forecast hours

### 4. View Legend
Click the legend button at bottom-right to see color scale

---

## 🎯 Keyboard Shortcuts

- **Collapse/Expand Sidebar**: Click the circular toggle button
- **Toggle Legend**: Click legend bar at bottom-right

---

## 🛠️ Common Commands

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint
```

---

## 🐛 Quick Troubleshooting

### "Command not found: npm"
→ Install Node.js from https://nodejs.org/

### "Port 3000 already in use"
→ App will auto-try 3001, 3002, etc.
→ Or specify port: `npm run dev -- --port 3001`

### White screen / Not loading
→ Press `F12`, check browser console for errors
→ Try: `npm install` again

### Styles not showing
→ Clear browser cache (Ctrl+Shift+Delete)
→ Restart dev server

---

## 📖 More Help?

- **Full Setup**: See `SETUP_GUIDE.md`
- **Deployment**: See `DEPLOYMENT_GUIDE.md`
- **File Structure**: See `FILE_STRUCTURE.md`
- **Data Integration**: See `DATA_INTEGRATION_GUIDE.md`

---

## ✅ Verify It's Working

You should see:
- ✅ Dark themed interface
- ✅ "Kenya Meteorological Department" header
- ✅ Left sidebar with parameters
- ✅ Center map area
- ✅ Bottom timeline controls
- ✅ No console errors (press F12)

---

## 🎓 First Steps Tutorial

### Exercise 1: Basic Navigation
1. Select **Kenya** domain
2. Select **Rainfall** parameter
3. Click **NEXT** 5 times (move to +15h forecast)
4. Click legend button to view color scale

### Exercise 2: Compare Domains
1. Select **Kenya** domain with **Rainfall**
2. Note the displayed information
3. Switch to **East Africa** domain
4. Compare the coverage area

### Exercise 3: Explore Parameters
1. Try each parameter:
   - Rainfall (mm)
   - Max Temperature (°C)
   - Min Temperature (°C)
   - Relative Humidity (%)
   - CAPE (J/kg)
2. Note different color scales for each

---

## 🔧 Next Steps

### Integrate Real WRF Data
See `DATA_INTEGRATION_GUIDE.md` for:
- Setting up Python/Node.js backend
- Processing NetCDF files
- Creating REST API
- Connecting to frontend

### Deploy to Production
See `DEPLOYMENT_GUIDE.md` for:
- Building production version
- Hosting options (Netlify, Vercel, AWS)
- Server configuration
- Domain setup

### Customize
See `README.md` for:
- Modifying color scales
- Adding new parameters
- Changing branding
- Extending functionality

---

## 📞 Need Help?

**Issue**: Installation fails
**Solution**: Try `npm cache clean --force` then `npm install` again

**Issue**: Can't access after starting
**Solution**: Check firewall, try http://127.0.0.1:3000

**Issue**: Want to stop the server
**Solution**: Press `Ctrl + C` in the terminal

---

## 🎉 Success Criteria

Your setup is successful if:
- [x] No errors during `npm install`
- [x] `npm run dev` starts without errors
- [x] Browser opens automatically or you can access http://localhost:3000
- [x] Interface displays correctly
- [x] Can switch domains
- [x] Can select parameters
- [x] Timeline navigation works
- [x] Sidebar collapses/expands
- [x] Legend toggles on/off

**All green?** You're ready to go! 🚀

---

## 💡 Pro Tips

### Tip 1: Keep Dev Server Running
The dev server watches for file changes and automatically reloads the browser

### Tip 2: Use Browser DevTools
Press `F12` to:
- Check for console errors
- Inspect network requests
- Test responsive design
- Monitor performance

### Tip 3: Test on Multiple Browsers
Works best on:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ IE not supported

### Tip 4: Mobile Testing
1. Start dev server: `npm run dev`
2. Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. On mobile: `http://YOUR-IP:3000`

---

## 🏁 You're All Set!

The Kenya Meteorological Department NWP System is now running on your machine!

**Next?**
- Explore the interface
- Read the full documentation
- Integrate real WRF data
- Deploy to production

**Happy forecasting! ☀️⛈️🌤️**

---

## 📚 Documentation Quick Links

| Document | Purpose |
|----------|---------|
| [README.md](./README.md) | Overview and main documentation |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Detailed setup instructions |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Production deployment |
| [FILE_STRUCTURE.md](./FILE_STRUCTURE.md) | File organization |
| [DATA_INTEGRATION_GUIDE.md](./DATA_INTEGRATION_GUIDE.md) | Connect WRF data |
| [FILES_CHECKLIST.md](./FILES_CHECKLIST.md) | All required files |

---

**Setup Time**: ~5 minutes
**Difficulty**: Beginner friendly ⭐
**Support**: Full documentation provided

**You're awesome! Now go visualize some weather! 🌍**
