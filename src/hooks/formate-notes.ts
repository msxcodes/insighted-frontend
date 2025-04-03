export const convertToMarkdown = (data: string): string => {
    // Split input into lines, trim whitespace, and remove empty lines
    const lines = data
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);
    
    const formatLine = (line: string): string => {
        // Handle headings with colon (e.g. "* **Heading:**")
        if (line.startsWith("* **") && line.endsWith(":**")) {
            const heading = line.replace(/\*\*|\:/g, "").trim();
            return `\n## ${heading}\n\n`;
        }
        
        // Handle nested bullet points (e.g. "* Sub-point")
        if (line.startsWith("*")) {
            const content = line.replace("*", "").trim();
            return `- ${content}\n\n`;
        }
        
        // Handle key-value pairs with colons (e.g. "Key: Value") 
        if (line.includes(":")) {
            const [key, value] = line.split(":");
            return `${key.trim()}:\n${value.trim()}\n\n`;
        }
        
        // Default case - return line with extra spacing
        return `${line}\n\n`;
    };

    // Process each line, join results and trim extra whitespace
    const formattedContent = lines.map(formatLine).join("");
    
    // Remove any triple+ newlines and ensure consistent double newlines
    return formattedContent
        .replace(/\n{3,}/g, '\n\n')
        .trim() + '\n';
};