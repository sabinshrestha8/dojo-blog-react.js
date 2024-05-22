import { useHistory, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect } from "react";
import BlogContext from "../context/blogs/blogContext";

const Create = () => {
  const {
    title,
    body,
    author,
    isPending,
    setIsPending,
    setTitle,
    setBody,
    setAuthor,
  } = useContext(BlogContext);

  const history = useHistory();
  const { id } = useParams();
  const { data } = useFetch(id ? "http://localhost:8000/blogs/" + id : null);

  useEffect(() => {
    if (id && data) {
      setTitle(data.title || "");
      setBody(data.body || "");
      setAuthor(data.author || "mario");
    } else {
      // Clear form fields when id is not present (Add Blog)
      setTitle("");
      setBody("");
      setAuthor("mario");
    }
  }, [data, id, setTitle, setBody, setAuthor]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = { title, body, author };

    try {
      setIsPending(true);

      const response = await fetch(
        `http://localhost:8000/blogs${id ? "/" + id : ""}`,
        {
          method: id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBlog),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to " + (id ? "update" : "add") + " blog");
      }

      console.log(id ? "Blog updated" : "New blog added");
      setIsPending(false);
      history.push("/");
    } catch (error) {
      console.error(error);
      setIsPending(false);
    }
  };

  return (
    <div className="create">
      <h2>{id ? "Edit Blog" : "Add a New Blog"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {!isPending && <button>{id ? "Update Blog" : "Add Blog"}</button>}
        {isPending && (
          <button disabled>{id ? "Updating blog..." : "Adding blog..."}</button>
        )}
      </form>
    </div>
  );
};

export default Create;
