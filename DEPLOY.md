# Deploying to Cloudflare Pages

This guide explains how to deploy the Omniversify File Explorer to Cloudflare Pages (recommended - fast and free!).

## Why Cloudflare Pages?

- ✅ **Native Hono Support** - Works perfectly with Hono framework
- ✅ **Fast Deployment** - Builds in seconds, not minutes
- ✅ **Free Tier** - Generous free tier with unlimited bandwidth
- ✅ **Global CDN** - Fast worldwide
- ✅ **No Configuration Needed** - Auto-detects everything

## Deployment Steps

### 1. Push to Git Repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy on Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Workers & Pages** → **Create Application** → **Pages**
3. Connect your Git repository (GitHub/GitLab)
4. Configure build settings:
   - **Framework preset**: None
   - **Build command**: Leave empty (or `echo "No build needed"`)
   - **Build output directory**: `/`
   - **Root directory**: `/`
5. Click **Save and Deploy**

### 3. Environment Variables (Optional)

No environment variables needed for basic setup!

## Local Development

### With Bun (Recommended)

```bash
bun run index.bun.ts
```

Visit `http://localhost:3000`

### With Wrangler (Cloudflare's CLI - for testing)

```bash
npm install -g wrangler
wrangler pages dev index.ts
```

## File Structure

```
├── index.ts              # Main app (Cloudflare compatible)
├── index.bun.ts          # Bun version for local dev
├── ui/
│   └── omniversify.ts    # UI library
├── files/                # Your documents (will be deployed)
└── package.json
```

## Troubleshooting

### Build taking too long?
- Cloudflare Pages builds are typically under 30 seconds
- No TypeScript compilation needed - Cloudflare handles it

### Files not showing up?
- Ensure `/files` directory is committed to Git
- Check that file paths are correct

### Want to use a custom domain?
- Go to your Pages project → **Custom domains**
- Add your domain and follow DNS instructions

## Alternative: Cloudflare Workers

For even more control, you can deploy as a Cloudflare Worker:

```bash
npm install -g wrangler
wrangler init
wrangler deploy
```

But Pages is simpler and recommended for this use case!
