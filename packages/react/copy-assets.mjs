import { readdir, mkdir, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));
const srcDir = join(rootDir, 'src');
const distDir = join(rootDir, 'dist');

async function copyCssFiles(directory = '') {
    const sourceDir = join(srcDir, directory);
    const entries = await readdir(sourceDir, { withFileTypes: true });

    await Promise.all(
        entries.map(async (entry) => {
            const relativePath = join(directory, entry.name);
            const sourcePath = join(srcDir, relativePath);
            const targetPath = join(distDir, relativePath);

            if (entry.isDirectory()) {
                await copyCssFiles(relativePath);
                return;
            }

            if (entry.isFile() && relativePath.endsWith('.css')) {
                await mkdir(dirname(targetPath), { recursive: true });
                await copyFile(sourcePath, targetPath);
            }
        })
    );
}

async function main() {
    try {
        await copyCssFiles();
        console.log('Copied CSS assets to dist/');
    } catch (error) {
        console.error('Failed to copy CSS assets:', error);
        process.exit(1);
    }
}

main();
