import { useHistory, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect } from "react";
import BlogContext from "../context/blogs/blogContext";
import { useForm } from "react-hook-form";

const Create = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const history = useHistory();
  const { isPending, setIsPending } = useContext(BlogContext);

  const {
    data,
    isPending: isLoading,
    error,
  } = useFetch(id ? "http://localhost:8000/blogs/" + id : null);

  useEffect(() => {
    if (id && data) {
      // Update/populate form fields with the fetched data
      setValue("title", data.title || "");
      setValue("body", data.body || "");
      setValue("author", data.author || "mario");
    } else {
      // Clear form fields in useForm
      setValue("title", "");
      setValue("body", "");
      setValue("author", "mario");
    }
  }, [data, id, setValue]);

  const onSubmit = async (newBlog, e) => {
    e.preventDefault();

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
      console.error("Error:", error.message);
      setIsPending(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (id && error) return <div>{error}</div>;

  return (
    <div className="create">
      <h2>{id ? "Edit Blog" : "Add a New Blog"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Blog title:</label>
        <input
          type="text"
          // bind the register function of the useForm hook to the title input field
          {...register("title", { required: "Title is required" })}
        />
        <p style={{ color: "red" }}>{errors.title?.message}</p>
        <label>Blog body:</label>
        <textarea
          {...register("body", { required: "Body is required" })}
        ></textarea>
        <p style={{ color: "red" }}>{errors.body?.message}</p>
        <label>Blog author:</label>
        <select {...register("author", { required: "Author is required" })}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <p style={{ color: "red" }}>{errors.author?.message}</p>
        {!isPending && <button>{id ? "Update Blog" : "Add Blog"}</button>}
        {isPending && (
          <button disabled>{id ? "Updating blog..." : "Adding blog..."}</button>
        )}
      </form>
    </div>
  );
};

export default Create;
