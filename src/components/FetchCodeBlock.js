import React, { useState, useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";

const FetchDisplay = ({ link, language }) => {
  const [content, setContent] = useState("...");
  useEffect(() => {
    fetch(link)
      .then((res) => res.text())
      .then((res) => setContent(res));
  }, []);
  return <CodeBlock language={language}>{content}</CodeBlock>;
};

export default FetchDisplay;
