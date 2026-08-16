// Simple rehype plugin to add id attributes to h2, h3 headings
// No external deps beyond what's already in MDX

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\u4e00-\u9fa5]/g, (s) => s) // keep Chinese chars
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, any>;
  children?: HastNode[];
  value?: string;
};

function extractText(node: HastNode): string {
  if (node.type === "text") return node.value || "";
  if (!node.children) return "";
  return node.children.map(extractText).join("");
}

// Walk the entire tree
function walkTree(node: HastNode, callback: (n: HastNode) => void) {
  callback(node);
  if (node.children) {
    for (const child of node.children) {
      walkTree(child, callback);
    }
  }
}

export function rehypeSlugify() {
  return (tree: HastNode) => {
    const slugCounts = new Map<string, number>();

    walkTree(tree, (node) => {
      if (node.type !== "element") return;
      if (!["h2", "h3"].includes(node.tagName!)) return;

      const rawText = extractText(node);
      const cleanText = rawText.replace(/^(\d+\.)\s+/, "").trim();
      let id = slugify(cleanText || rawText);
      if (!id) return;

      const count = slugCounts.get(id) ?? 0;
      slugCounts.set(id, count + 1);
      if (count > 0) {
        id = `${id}-${count}`;
      }

      if (!node.properties) node.properties = {};
      node.properties.id = id;

      // Add anchor link for clickable link
      const anchor: HastNode = {
        type: "element",
        tagName: "a",
        properties: {
          href: `#${id}`,
          class:
            "heading-anchor opacity-0 -ml-5 pr-1 text-neutral-600 hover:text-blue-400 transition-opacity no-underline border-none",
          "aria-label": `Link to ${cleanText || rawText}`,
        },
        children: [{ type: "text", value: "#" }],
      };

      if (node.children) {
        node.children.unshift(anchor);
      }
    });
  };
}
