# Deploying to Vercel

This guide explains how to deploy the Omniversify File Explorer to Vercel.

## Important Notes

- **Vercel uses Node.js**, not Bun, so we've created a Vercel-compatible version
- The main `index.ts` is now Vercel-compatible
- For local Bun development, use `index.bun.ts`

## Files Configured for Vercel

1. **package.json** - Added `"type": "module"` for ES module support
2. **vercel.json** - Vercel deployment configuration
3. **index.ts** - Vercel-compatible entry point (no Bun-specific code)

## Deployment Steps

### 1. Push to Git Repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel will auto-detect the settings
5. Click "Deploy"

### 3. Upload Files

Since the `/files` directory contains your documents, you'll need to:
- Commit the `/files` directory to Git, OR
- Use Vercel's file upload feature, OR
- Use a cloud storage solution (S3, Cloudflare R2, etc.)

## Local Development

### With Bun (Recommended for local dev)

```bash
bun run index.bun.ts
```

### With Node.js (Testing Vercel compatibility)

```bash
npm install
node index.ts
```

## Differences Between Versions

| Feature | index.bun.ts | index.ts (Vercel) |
|---------|--------------|-------------------|
| Runtime | Bun | Node.js |
| Static Files | `serveStatic` from `hono/bun` | Custom handler |
| Export | `{ port: 3000, fetch }` | `app.fetch` |
| File Serving | Built-in | Manual with content-type headers |

## Troubleshooting

### "Cannot use import statement outside a module"
- ✅ Fixed by adding `"type": "module"` to package.json

### Static files not loading
- Ensure `/files` directory is included in your deployment
- Check that file paths are correct in Vercel's serverless environment

### Build errors
- Make sure all imports use `.js` extensions for ES modules
- Verify that `ui/omniversify.ts` is being compiled correctly
