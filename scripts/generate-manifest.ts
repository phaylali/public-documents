import { readdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

async function generateManifest() {
    const filesDir = join(process.cwd(), 'files');
    const output = join(process.cwd(), 'files-manifest.json');

    try {
        const entries = await readdir(filesDir, { withFileTypes: true });
        const files = entries.map(entry => ({
            name: entry.name,
            isDirectory: entry.isDirectory()
        }));

        await writeFile(output, JSON.stringify(files, null, 2));
        console.log(`Manifest generated at ${output}`);
    } catch (err) {
        console.error('Error generating manifest:', err);
        // Create empty manifest if directory doesn't exist
        await writeFile(output, JSON.stringify([], null, 2));
    }
}

generateManifest();
