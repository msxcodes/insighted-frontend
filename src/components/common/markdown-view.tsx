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
    <div
      className="prose prose-invert max-w-none 
            prose-headings:text-cyan-400 prose-headings:font-bold
            prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
            prose-p:text-blue-100 prose-strong:text-white
            prose-ul:list-disc prose-ol:list-decimal
            prose-li:marker:text-cyan-400 space-y-4"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="border-b border-cyan-500/30 pb-2 mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-6 mb-3 text-cyan-300">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-4 mb-2 text-blue-200">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-blue-100/90 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="space-y-2 ml-6 marker:text-cyan-400">{children}</ul>
          ),
          li: ({ children }) => (
            <li className="pl-2 text-blue-100/90">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-cyan-200">{children}</strong>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
});

MarkdownRenderer.displayName = "MarkdownRenderer";

export default MarkdownRenderer;
