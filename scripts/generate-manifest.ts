import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

interface BundledFile {
    name: string;
    isDirectory: boolean;
    content?: string; // Base64 or text
    type: 'text' | 'binary';
    size: number;
    mime: string;
}

const MIME_TYPES: Record<string, string> = {
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

async function generateManifest() {
    const filesDir = join(process.cwd(), 'files');
    const output = join(process.cwd(), 'files-manifest.json');

    try {
        const entries = await readdir(filesDir, { withFileTypes: true });
        const bundledFiles: BundledFile[] = [];

        for (const entry of entries) {
            if (entry.isDirectory()) {
                bundledFiles.push({
                    name: entry.name,
                    isDirectory: true,
                    type: 'binary',
                    size: 0,
                    mime: ''
                });
                continue;
            }

            const filePath = join(filesDir, entry.name);
            const ext = extname(entry.name).toLowerCase();
            const stats = await stat(filePath);
            const mime = MIME_TYPES[ext] || 'application/octet-stream';

            // Limit file size to 5MB to prevent bundle overflow
            if (stats.size > 5 * 1024 * 1024) {
                console.warn(`Skipping ${entry.name}: File too large (${stats.size} bytes)`);
                continue;
            }

            const buffer = await readFile(filePath);
            const isText = mime.startsWith('text/') || mime === 'application/json' || mime === 'application/javascript';

            bundledFiles.push({
                name: entry.name,
                isDirectory: false,
                content: buffer.toString(isText ? 'utf-8' : 'base64'),
                type: isText ? 'text' : 'binary',
                size: stats.size,
                mime
            });
        }

        await writeFile(output, JSON.stringify(bundledFiles, null, 2));
        console.log(`Bundled manifest generated at ${output} with ${bundledFiles.length} entries`);
    } catch (err) {
        console.error('Error generating bundled manifest:', err);
        await writeFile(output, JSON.stringify([], null, 2));
    }
}

generateManifest();
