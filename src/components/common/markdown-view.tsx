import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { memo } from "react";

interface MarkdownRendererProps {
    markdown: string;
}

const MarkdownRenderer = memo(({ markdown }: MarkdownRendererProps) => {
    if (!markdown) {
        return null;
    }

    return (
        <div className="prose prose-invert max-w-none prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-white prose-ul:text-gray-300">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ ...props }) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                    h2: ({ ...props }) => <h2 className="text-xl font-semibold mb-3" {...props} />,
                    p: ({ ...props }) => <p className="mb-2" {...props} />,
                    ul: ({ ...props }) => <ul className="list-disc ml-4 mb-3" {...props} />,
                    li: ({ ...props }) => <li className="mb-1" {...props} />
                }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
});

MarkdownRenderer.displayName = "MarkdownRenderer";

export default MarkdownRenderer;