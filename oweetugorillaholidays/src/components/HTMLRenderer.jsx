import { useEffect, useState } from 'react';

export default function HTMLRenderer({ htmlContent, className = "" }) {
    const [sanitizedHtml, setSanitizedHtml] = useState("");

    useEffect(() => {
        if (htmlContent) {
            // First, check if content contains HTML tags
            const hasHtmlTags = /<[a-z][\s\S]*>/i.test(htmlContent);

            let formattedContent = htmlContent;

            if (!hasHtmlTags) {
                // Convert markdown-style formatting to HTML
                formattedContent = convertMarkdownToHtml(htmlContent);
            }

            // Basic sanitization to prevent XSS while preserving HTML structure
            const sanitizeHtml = (content) => {
                // Remove script tags and their contents
                let sanitized = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

                // Remove on* attributes (onclick, onload, etc.)
                sanitized = sanitized.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');

                // Remove javascript: protocol from href and src
                sanitized = sanitized.replace(/(href|src)\s*=\s*["']javascript:[^"']*["']/gi, '');

                return sanitized;
            };

            setSanitizedHtml(sanitizeHtml(formattedContent));
        }
    }, [htmlContent]);

    const convertMarkdownToHtml = (text) => {
        let html = text;

        // Convert **bold** to <strong>bold</strong>
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Convert *italic* to <em>italic</em>
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Convert __underline__ to <u>underline</u>
        html = html.replace(/__(.*?)__/g, '<u>$1</u>');

        // Convert day headers (Day 1:, Day 2:, etc.)
        html = html.replace(/\*\*Day (\d+):(.*?)\*\*/g, '<span class="text-lg font-bold text-amber-700 mt-6 mb-3">Day $1:$2</span>');
        html = html.replace(/Day (\d+):/g, '<span class="text-lg font-bold text-amber-700 mt-6 mb-3">Day $1:</span>');

        // Convert line breaks to paragraphs
        const paragraphs = html.split('\n\n');
        html = paragraphs.map(para => {
            if (para.trim() && !para.startsWith('<h3') && !para.startsWith('<div')) {
                if (para.includes('- ') && !para.includes('<li>')) {
                    const lines = para.split('\n');
                    const listItems = lines.map(line => {
                        if (line.trim().startsWith('-')) {
                            return `<li class="ml-5 mb-1">${line.trim().substring(1).trim()}</li>`;
                        }
                        return line;
                    }).join('\n');
                    return `<ul class="list-disc mt-2 mb-3">${listItems}</ul>`;
                }
                return `<p class="mb-3">${para.trim()}</p>`;
            }
            return para;
        }).join('');

        html = html.replace(/\n/g, '<br/>');

        return html;
    };

    return (
        <div
            className={`html-renderer prose prose-amber max-w-none ${className}`}
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            style={{
                lineHeight: 1.6,
                fontFamily: 'inherit'
            }}
        />
    );
}