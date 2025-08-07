# Windows Setup Guide for AitheduConnect

If you're running this project on Windows and encounter the error:
```
'NODE_ENV' is not recognized as an internal or external command
```

Here are multiple solutions to fix this issue:

## Solution 1: Use the Windows-compatible Node.js script
```bash
node dev.js
```

## Solution 2: Use the batch file
```bash
dev.bat
```

## Solution 3: Use cross-env (Recommended)
```bash
npx cross-env NODE_ENV=development tsx server/index.ts
```

## Solution 4: Use PowerShell
```powershell
$env:NODE_ENV="development"; npx tsx server/index.ts
```

## Why this happens
Windows Command Prompt doesn't support the Unix-style environment variable syntax `NODE_ENV=development` that works on Mac/Linux. The solutions above provide Windows-compatible ways to set environment variables.

## For Production
For production builds, use:
```bash
node start.js
```

Or manually:
```bash
npx cross-env NODE_ENV=production node dist/index.js
```

## Installation Notes
Make sure you have:
1. Node.js 20+ installed
2. Run `npm install` first
3. The `cross-env` package is already included in dependencies

Choose any solution that works best for your Windows environment!