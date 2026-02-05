import { Hono } from 'hono';
import { readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import {
    createLayout,
    createBreadcrumb,
    createFileCard,
    createFileGrid,
    createViewerContainer,
    createPDFViewer,
    createImageViewer,
    createTextViewer,
    createFallbackViewer,
} from './ui/omniversify';

const app = new Hono();

// Serve static files
app.get('/static/:filename', async (c) => {
    const filename = c.req.param('filename');
    const filePath = join(process.cwd(), 'files', filename);

    try {
        const file = await readFile(filePath);
        const ext = extname(filename).toLowerCase();

        const contentTypes: Record<string, string> = {
            '.pdf': 'application/pdf',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
            '.txt': 'text/plain',
            '.md': 'text/markdown',
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.json': 'application/json',
        };

        const contentType = contentTypes[ext] || 'application/octet-stream';

        return new Response(file, {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `inline; filename="${filename}"`,
            },
        });
    } catch (err: any) {
        return c.text('File not found', 404);
    }
});

// Home route: List all files
app.get('/', async (c) => {
    try {
        const filesDir = join(process.cwd(), 'files');
        const entries = await readdir(filesDir, { withFileTypes: true });

        const cards = entries.map(entry =>
            createFileCard({
                name: entry.name,
                link: entry.isDirectory() ? '#' : `/view/${entry.name}`,
                isDirectory: entry.isDirectory()
            })
        );

        const content = createBreadcrumb(['EXPLORER', 'HOME']) + createFileGrid(cards);

        return c.html(createLayout({ title: 'Home', content }));
    } catch (err: any) {
        const errorContent = `<p>Error reading files directory: ${err.message}</p>`;
        return c.html(createLayout({ title: 'Error', content: errorContent }));
    }
});

// File viewer route
app.get('/view/:filename', async (c) => {
    const filename = c.req.param('filename');
    const filePath = join(process.cwd(), 'files', filename);
    const ext = extname(filename).toLowerCase();
    const staticUrl = `/static/${filename}`;

    let viewerHtml = '';

    if (ext === '.pdf') {
        viewerHtml = createPDFViewer({ filename, staticUrl });
    } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
        viewerHtml = createImageViewer({ filename, staticUrl });
    } else if (['.txt', '.md', '.json', '.ts', '.js', '.html', '.css'].includes(ext)) {
        try {
            const content = await readFile(filePath, 'utf-8');
            viewerHtml = createTextViewer({ content, filename, staticUrl });
        } catch (err: any) {
            viewerHtml = `<p>Error reading file content: ${err.message}</p>`;
        }
    } else {
        viewerHtml = createFallbackViewer({ filename, staticUrl });
    }

    const content = createBreadcrumb(['<a href="/">EXPLORER</a>', filename.toUpperCase()]) +
        createViewerContainer(viewerHtml);

    return c.html(createLayout({ title: filename, content }));
});

// Export for Cloudflare Pages
export default app;
