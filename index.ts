import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
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

// Serve static files from the /files directory
app.use('/static/*', serveStatic({
    root: './',
    rewriteRequestPath: (path) => path.replace(/^\/static/, '/files')
}));

// Home route: List all files
app.get('/', async (c) => {
    try {
        const filesDir = join(process.cwd(), 'files');
        const entries = await readdir(filesDir, { withFileTypes: true });

        // Generate file cards
        const cards = entries.map(entry =>
            createFileCard({
                name: entry.name,
                link: entry.isDirectory() ? '#' : `/view/${entry.name}`,
                isDirectory: entry.isDirectory()
            })
        );

        // Compose the page content
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

    // Determine viewer type based on file extension
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

    // Compose the page content
    const content = createBreadcrumb(['<a href="/">EXPLORER</a>', filename.toUpperCase()]) +
        createViewerContainer(viewerHtml);

    return c.html(createLayout({ title: filename, content }));
});

export default {
    port: 3000,
    fetch: app.fetch,
};
