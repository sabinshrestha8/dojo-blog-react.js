import { useState } from "react";
import BlogContext from "./blogContext";

const BlogState = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);

  return (
    <BlogContext.Provider
      value={{
        title,
        body,
        author,
        isPending,
        setIsPending,
        setTitle,
        setBody,
        setAuthor,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
