"use client";

import { useState } from "react";

interface CommentNode {
  id: string;
  author: string;
  message: string;
  children?: CommentNode[];
}

export function CommentThread({ comments }: { comments: CommentNode[] }) {
  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <CommentItem key={c.id} node={c} />
      ))}
    </div>
  );
}

function CommentItem({ node }: { node: CommentNode }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="rounded-2xl bg-cine-surface p-4">
      <div className="flex justify-between">
        <div className="font-medium text-cine-text-primary">{node.author}</div>
        {node.children && node.children.length > 0 && (
          <button
            className="text-sm text-cine-accent"
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "Collapse" : "Expand"}
          </button>
        )}
      </div>
      <p className="mt-2 text-cine-text-secondary">{node.message}</p>
      {expanded && node.children && node.children.length > 0 && (
        <div className="mt-3 space-y-3 pl-4 border-l border-cine-surface/50">
          {node.children.map((ch) => (
            <CommentItem key={ch.id} node={ch} />
          ))}
        </div>
      )}
    </div>
  );
}
