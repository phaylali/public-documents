/**
 * Omniversify UI Library
 * A reusable design system for Hono/Bun applications
 * Based on the Omniversify Design System & Style Guide
 */

// Design Tokens
export const OmniversifyTheme = {
    colors: {
        gold: '#C2B067',
        goldMuted: '#C2B067B3',
        goldLow: 'rgba(194, 176, 103, 0.1)',
        black: '#000000',
        white: '#FFFFFF',
        whiteMuted: '#FFFFFFB3',
        surface: '#0a0a0a',
    },
    fonts: {
        heading: "'Cinzel', serif",
        body: "'Source Sans 3', sans-serif",
    },
    spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
    },
};

// CSS Generator
export function generateStyles(): string {
    const theme = OmniversifyTheme;
    return `
        :root {
            --gold: ${theme.colors.gold};
            --gold-muted: ${theme.colors.goldMuted};
            --gold-low: ${theme.colors.goldLow};
            --black: ${theme.colors.black};
            --white: ${theme.colors.white};
            --white-muted: ${theme.colors.whiteMuted};
            --surface: ${theme.colors.surface};
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            font-family: ${theme.fonts.body};
            background-color: var(--black);
            color: var(--white);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        h1, h2, h3, .heading {
            font-family: ${theme.fonts.heading};
            color: var(--gold);
            text-transform: uppercase;
            letter-spacing: 1.2px;
        }
        header {
            padding: ${theme.spacing.lg} ${theme.spacing.sm};
            text-align: center;
            border-bottom: 1px solid var(--gold-muted);
            margin-bottom: ${theme.spacing.lg};
            background: linear-gradient(to right, transparent, var(--gold-muted), var(--gold-muted), transparent);
            background-size: 100% 1px;
            background-repeat: no-repeat;
            background-position: bottom;
        }
        .container {
            max-width: 1024px;
            margin: 0 auto;
            padding: 0 ${theme.spacing.sm};
            width: 100%;
            flex: 1;
        }
        .file-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: ${theme.spacing.md};
            padding: ${theme.spacing.sm} 0;
        }
        .file-card {
            background: var(--black);
            border: 1px solid var(--gold);
            border-radius: ${theme.borderRadius.md};
            padding: ${theme.spacing.md};
            text-align: center;
            text-decoration: none;
            color: var(--white);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .file-card:hover {
            background: var(--gold-low);
            transform: translateY(-4px);
            box-shadow: 0 4px 20px rgba(194, 176, 103, 0.2);
        }
        .file-icon {
            font-size: 3rem;
            margin-bottom: ${theme.spacing.sm};
            color: var(--gold);
        }
        .file-name {
            font-size: 0.9rem;
            word-break: break-all;
            font-weight: 600;
        }
        .viewer-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: ${theme.spacing.lg};
            padding: ${theme.spacing.lg} 0;
        }
        .viewer-actions {
            display: flex;
            gap: ${theme.spacing.sm};
        }
        .btn {
            background: transparent;
            color: var(--gold);
            border: 1px solid var(--gold);
            padding: 0.8rem 1.5rem;
            font-family: ${theme.fonts.heading};
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: ${theme.borderRadius.sm};
        }
        .btn:hover {
            background: var(--gold);
            color: var(--black);
        }
        .media-viewer {
            width: 100%;
            max-width: 800px;
            border: 1px solid var(--gold-muted);
            border-radius: ${theme.borderRadius.md};
            background: #050505;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        iframe, embed {
            width: 100%;
            height: 80vh;
            border: none;
            border-radius: ${theme.borderRadius.md};
        }
        img {
            max-width: 100%;
            height: auto;
            display: block;
            border-radius: ${theme.borderRadius.md};
        }
        pre {
            width: 100%;
            padding: ${theme.spacing.lg};
            background: #050505;
            color: var(--white-muted);
            white-space: pre-wrap;
            word-wrap: break-word;
            font-size: 0.9rem;
            border-radius: ${theme.borderRadius.md};
            border: 1px solid var(--gold-muted);
            max-height: 70vh;
            overflow-y: auto;
        }
        .breadcrumb {
            margin-bottom: ${theme.spacing.lg};
            font-size: 0.8rem;
            color: var(--gold-muted);
        }
        .breadcrumb a {
            color: var(--gold);
            text-decoration: none;
        }
        .fallback-view {
            text-align: center;
            padding: 4rem ${theme.spacing.lg};
            border: 1px dashed var(--gold-muted);
            border-radius: ${theme.borderRadius.md};
            width: 100%;
        }
    `;
}

// Component: Page Layout
export interface LayoutOptions {
    title: string;
    content: string;
    appName?: string;
}

export function createLayout(options: LayoutOptions): string {
    const { title, content, appName = 'Omniversify Explorer' } = options;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${appName}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        ${generateStyles()}
    </style>
</head>
<body>
    <header>
        <h1>${appName}</h1>
    </header>
    <main class="container">
        ${content}
    </main>
    <footer style="padding: 2rem; text-align: center; font-size: 0.8rem; color: var(--gold-muted); opacity: 0.5;">
        &copy; 2026 OMNIVERSIFY DESIGN SYSTEM
    </footer>
    <script>
        function printFile() {
             window.print();
        }
    </script>
</body>
</html>
    `;
}

// Component: Breadcrumb
export function createBreadcrumb(path: string[]): string {
    return `<div class="breadcrumb">${path.join(' / ')}</div>`;
}

// Component: File Card
export interface FileCardOptions {
    name: string;
    link: string;
    icon?: string;
    isDirectory?: boolean;
}

export function createFileCard(options: FileCardOptions): string {
    const { name, link, icon, isDirectory = false } = options;
    const displayIcon = icon || (isDirectory ? '📁' : '📄');

    return `
        <a href="${link}" class="file-card">
            <div class="file-icon">${displayIcon}</div>
            <div class="file-name">${name}</div>
        </a>
    `;
}

// Component: File Grid
export function createFileGrid(cards: string[]): string {
    return `<div class="file-grid">${cards.join('')}</div>`;
}

// Component: Button
export interface ButtonOptions {
    text: string;
    href?: string;
    onClick?: string;
    download?: string;
}

export function createButton(options: ButtonOptions): string {
    const { text, href, onClick, download } = options;

    if (href) {
        const downloadAttr = download ? `download="${download}"` : '';
        return `<a href="${href}" ${downloadAttr} class="btn">${text}</a>`;
    } else if (onClick) {
        return `<button onclick="${onClick}" class="btn">${text}</button>`;
    }

    return `<button class="btn">${text}</button>`;
}

// Component: Action Bar
export function createActionBar(buttons: string[]): string {
    return `<div class="viewer-actions">${buttons.join('')}</div>`;
}

// Component: PDF Viewer
export interface PDFViewerOptions {
    filename: string;
    staticUrl: string;
}

export function createPDFViewer(options: PDFViewerOptions): string {
    const { filename, staticUrl } = options;

    return `
        <div class="media-viewer">
            <embed src="${staticUrl}" type="application/pdf" />
        </div>
        ${createActionBar([
        createButton({ text: 'Download PDF', href: staticUrl, download: filename }),
        createButton({ text: 'Print PDF', onClick: 'printFile()' })
    ])}
    `;
}

// Component: Image Viewer
export interface ImageViewerOptions {
    filename: string;
    staticUrl: string;
}

export function createImageViewer(options: ImageViewerOptions): string {
    const { filename, staticUrl } = options;

    return `
        <div class="media-viewer">
            <img src="${staticUrl}" alt="${filename}" />
        </div>
        ${createActionBar([
        createButton({ text: 'Download Image', href: staticUrl, download: filename }),
        createButton({ text: 'Print Image', onClick: 'printFile()' })
    ])}
    `;
}

// Component: Text Viewer
export interface TextViewerOptions {
    content: string;
    filename: string;
    staticUrl: string;
}

export function createTextViewer(options: TextViewerOptions): string {
    const { content, filename, staticUrl } = options;
    const escapedContent = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    return `
        <pre>${escapedContent}</pre>
        ${createActionBar([
        createButton({ text: 'Download File', href: staticUrl, download: filename })
    ])}
    `;
}

// Component: Fallback Viewer
export interface FallbackViewerOptions {
    filename: string;
    staticUrl: string;
}

export function createFallbackViewer(options: FallbackViewerOptions): string {
    const { filename, staticUrl } = options;

    return `
        <div class="fallback-view">
            <div class="file-icon">📄</div>
            <h2 style="margin-bottom: 1rem;">${filename}</h2>
            <p style="margin-bottom: 2rem; color: var(--white-muted);">This file type cannot be previewed directly.</p>
            ${createActionBar([
        createButton({ text: 'Download File', href: staticUrl, download: filename })
    ])}
        </div>
    `;
}

// Component: Viewer Container
export function createViewerContainer(content: string): string {
    return `<div class="viewer-container">${content}</div>`;
}
