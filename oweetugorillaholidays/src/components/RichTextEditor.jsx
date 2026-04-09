import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaHeading, FaCode, FaLink } from 'react-icons/fa';
import { MdFormatQuote } from 'react-icons/md';

export default function RichTextEditor({ value, onChange, placeholder, rows = 10 }) {
    const [showPreview, setShowPreview] = useState(false);
    const textareaRef = useRef(null);

    const insertFormatting = (before, after = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);
        const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

        onChange({ target: { value: newText } });

        // Set cursor position after the inserted formatting
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 0);
    };

    const insertBold = () => insertFormatting('**', '**');
    const insertItalic = () => insertFormatting('*', '*');
    const insertUnderline = () => insertFormatting('<u>', '</u>');
    const insertHeading = () => insertFormatting('\n## ', '\n');
    const insertBulletList = () => insertFormatting('\n- ');
    const insertNumberedList = () => insertFormatting('\n1. ');
    const insertQuote = () => insertFormatting('\n> ');
    const insertCode = () => insertFormatting('`', '`');
    const insertLink = () => {
        const url = prompt('Enter URL:', 'https://');
        if (url) insertFormatting(`[Link text](${url})`);
    };

    const insertLineBreak = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const newText = value.substring(0, start) + '\n\n' + value.substring(start);
        onChange({ target: { value: newText } });

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + 2, start + 2);
        }, 0);
    };

    const formatText = (format) => {
        switch (format) {
            case 'bold': insertBold(); break;
            case 'italic': insertItalic(); break;
            case 'underline': insertUnderline(); break;
            case 'heading': insertHeading(); break;
            case 'bullet': insertBulletList(); break;
            case 'numbered': insertNumberedList(); break;
            case 'quote': insertQuote(); break;
            case 'code': insertCode(); break;
            case 'link': insertLink(); break;
            case 'linebreak': insertLineBreak(); break;
            default: break;
        }
    };

    const renderPreview = () => {
        let html = value;

        // Convert markdown to HTML for preview
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = html.replace(/<u>(.*?)<\/u>/g, '<u>$1</u>');
        html = html.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>');
        html = html.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-semibold mt-3 mb-2">$1</h3>');
        html = html.replace(/^- (.*?)$/gm, '<li class="ml-4">$1</li>');
        html = html.replace(/^\d+\. (.*?)$/gm, '<li class="ml-4 list-decimal">$1</li>');
        html = html.replace(/^> (.*?)$/gm, '<blockquote class="border-l-4 border-amber-400 pl-4 my-2 italic">$1</blockquote>');
        html = html.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded font-mono text-sm">$1</code>');
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-amber-600 hover:underline" target="_blank">$1</a>');
        html = html.replace(/\n/g, '<br/>');

        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    };

    const ToolbarButton = ({ icon: Icon, onClick, title }) => (
        <Button type="button" variant="outline" size="sm" onClick={onClick} title={title} className="h-8 w-8 p-0 hover:bg-amber-50 hover:text-amber-600">
            <Icon className="h-4 w-4" />
        </Button>
    );

    return (
        <div className="border border-gray-300 bg-gray-200 rounded-lg overflow-y-auto">
            <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
                <ToolbarButton icon={FaBold} onClick={() => formatText('bold')} title="Bold (Ctrl+B)" />
                <ToolbarButton icon={FaItalic} onClick={() => formatText('italic')} title="Italic (Ctrl+I)" />
                <ToolbarButton icon={FaUnderline} onClick={() => formatText('underline')} title="Underline (Ctrl+U)" />
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <ToolbarButton icon={FaHeading} onClick={() => formatText('heading')} title="Heading" />
                <ToolbarButton icon={FaListUl} onClick={() => formatText('bullet')} title="Bullet List" />
                <ToolbarButton icon={FaListOl} onClick={() => formatText('numbered')} title="Numbered List" />
                <ToolbarButton icon={MdFormatQuote} onClick={() => formatText('quote')} title="Quote" />
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <ToolbarButton icon={FaCode} onClick={() => formatText('code')} title="Inline Code" />
                <ToolbarButton icon={FaLink} onClick={() => formatText('link')} title="Insert Link" />
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <Button type="button" variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)} className={`h-8 px-2 text-xs ${showPreview ? 'bg-amber-100 text-amber-700' : ''}`}>
                    {showPreview ? 'Edit' : 'Preview'}
                </Button>
            </div>

            {/* Editor or Preview */}
            {!showPreview ? (
                <Textarea ref={textareaRef} value={value} onChange={onChange} placeholder={placeholder} rows={rows} className="border-0 rounded-none focus-visible:ring-0 font-mono text-sm max-h-100" />
            ) : (
                <div className="p-4 min-h-50 max-h-100 overflow-y-auto bg-white prose prose-sm max-w-none">
                    {value ? renderPreview() : <p className="text-gray-400 italic">No content to preview</p>}
                </div>
            )}

            {/* Helper text */}
            <div className="bg-gray-50 border-t border-gray-300 p-2 text-xs text-gray-500">
                <span>Tip: Use **bold**, *italic*, - for bullet lists, 1. for numbered lists, for quotes, ` for code</span>
            </div>
        </div>
    );
}