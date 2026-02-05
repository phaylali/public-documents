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

// Import bundled manifest (generated at build time)
// @ts-ignore
import manifest from './files-manifest.json' with { type: 'json' };

interface BundledFile {
    name: string;
    isDirectory: boolean;
    content?: string;
    type: 'text' | 'binary';
    size: number;
    mime: string;
}

const app = new Hono();

const fileMap = new Map<string, BundledFile>();
(manifest as BundledFile[]).forEach(file => {
    fileMap.set(file.name, file);
});

// Serve bundled files via virtual path
app.get('/files/:filename', (c) => {
    const filename = c.req.param('filename');
    const file = fileMap.get(filename);

    if (!file || file.isDirectory) {
        return c.text('File not found', 404);
    }

    if (file.type === 'text') {
        return c.text(file.content || '', 200, {
            'Content-Type': file.mime
        });
    } else {
        // Binary (Base64)
        const binaryString = atob(file.content || '');
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        return c.body(bytes, 200, {
            'Content-Type': file.mime,
            'Content-Disposition': `inline; filename="${filename}"`
        });
    }
});

// Home route: List all files
app.get('/', (c) => {
    try {
        const cards = (manifest as BundledFile[]).map(entry =>
            createFileCard({
                name: entry.name,
                link: entry.isDirectory ? '#' : `/view/${entry.name}`,
                isDirectory: entry.isDirectory
            })
        );

        const content = createBreadcrumb(['EXPLORER', 'HOME']) + createFileGrid(cards);
        return c.html(createLayout({ title: 'Home', content }));
    } catch (err: any) {
        return c.html(createLayout({ title: 'Error', content: `<p>Error loading files: ${err.message}</p>` }));
    }
});

// File viewer route
app.get('/view/:filename', (c) => {
    const filename = c.req.param('filename');
    const file = fileMap.get(filename);

    if (!file) {
        return c.html(createLayout({
            title: 'Not Found',
            content: createBreadcrumb(['EXPLORER', 'ERROR']) + '<p>File not found.</p>'
        }));
    }

    const staticUrl = `/files/${filename}`;
    const ext = extname(filename).toLowerCase();
    let viewerHtml = '';

    // Determine viewer type based on file extension
    if (ext === '.pdf') {
        viewerHtml = createPDFViewer({ filename, staticUrl });
    } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
        viewerHtml = createImageViewer({ filename, staticUrl });
    } else if (file.type === 'text') { // Use type from bundle
        viewerHtml = createTextViewer({
            content: file.content || '',
            filename,
            staticUrl
        });
    } else {
        viewerHtml = createFallbackViewer({ filename, staticUrl });
    }

    const content = createBreadcrumb(['<a href="/">EXPLORER</a>', filename.toUpperCase()]) +
        createViewerContainer(viewerHtml);

    return c.html(createLayout({ title: filename, content }));
});

// Export for Cloudflare Pages
export default app;
