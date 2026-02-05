import { Hono } from 'hono';
import { extname } from 'node:path';
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

// Import manifest (generated at build time)
// @ts-ignore
import manifest from './files-manifest.json' with { type: 'json' };

const app = new Hono();

// Home route: List all files from manifest
app.get('/', (c) => {
    try {
        // Use imported manifest instead of readdir
        const entries = manifest as Array<{ name: string, isDirectory: boolean }>;

        // Generate file cards
        const cards = entries.map(entry =>
            createFileCard({
                name: entry.name,
                link: entry.isDirectory ? '#' : `/view/${entry.name}`,
                isDirectory: entry.isDirectory
            })
        );

        // Compose the page content
        const content = createBreadcrumb(['EXPLORER', 'HOME']) + createFileGrid(cards);

        return c.html(createLayout({ title: 'Home', content }));
    } catch (err: any) {
        return c.html(createLayout({ title: 'Error', content: `<p>Error loading file manifest: ${err.message}</p>` }));
    }
});

// File viewer route
app.get('/view/:filename', async (c) => {
    const filename = c.req.param('filename');
    const ext = extname(filename).toLowerCase();

    // In Pages, files are served as static assets
    // We construct the URL to the static asset
    const staticUrl = `/files/${filename}`;

    let viewerHtml = '';

    // Determine viewer type based on file extension
    if (ext === '.pdf') {
        viewerHtml = createPDFViewer({ filename, staticUrl });
    } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
        viewerHtml = createImageViewer({ filename, staticUrl });
    } else if (['.txt', '.md', '.json', '.ts', '.js', '.html', '.css'].includes(ext)) {
        try {
            // Fetch content from the static URL
            const url = new URL(c.req.url);
            const fetchUrl = `${url.origin}/files/${filename}`;
            const response = await fetch(fetchUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch file: ${response.statusText}`);
            }

            const content = await response.text();
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

// Export for Cloudflare Pages
export default app;
