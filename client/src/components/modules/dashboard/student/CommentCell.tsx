import { useState } from "react";

const CommentCell = ({ comment }: { comment: string }) => {
    const [expanded, setExpanded] = useState(false);
    const isLong = comment.length > 200;
  
    return (
        <div className="max-w-[300px] whitespace-pre-wrap text-sm py-2 align-middle text-justify" style={{ textJustify: "inter-word" }}>
        <span>
          {expanded ? comment : `${comment.slice(0, 20)}${isLong ? "..." : ""}`}
        </span>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-secondary hover:underline text-sm"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    );
  };
  

  export default CommentCell;