import React, { useState, useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";

const FetchDisplay = ({ link, language }) => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    fetch(link)
      .then((res) => res.text())
      .then((res) => setContent(res));
  }, []);
  return (
    <CodeBlock language={content ? language : "plain"}>
      {content || `fetching from ${link} ...`}
    </CodeBlock>
  );
};

export default FetchDisplay;
