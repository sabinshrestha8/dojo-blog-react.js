import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Create = () => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required.")
      .min(4, "Title must be at least 4 characters"),
    body: Yup.string().required("Body is required."),
    author: Yup.string()
      .required("Author is required.")
      .min(4, "Author must be at least 4 characters"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // Integrate the Yup schema with React Hook Form
    // resolver is just where we specify how our schema will look like
    resolver: yupResolver(validationSchema),
  });

  const { id } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await fetch(`http://localhost:8000/blogs/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }

      return response.json();
    },
  });

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

  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: async (newBlog) => {
      const res = await fetch(
        `http://localhost:8000/blog${id ? "/" + id : ""}`,
        {
          method: id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBlog),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to " + (id ? "update" : "add") + " blog");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blog"]);
      history.push("/");
    },
    onError: (error) => {
      console.error("Error:", error.message);
    },
  });

  const onSubmit = (newBlog, e) => {
    e.preventDefault();
    mutate(newBlog);
  };

  if (isLoading) return <div>Loading...</div>;

  if (id && error) return <div>{error}</div>;

  return (
    <div className="create">
      <h2>{id ? "Edit Blog" : "Add a New Blog"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Blog title:</label>
        <input type="text" {...register("title")} />
        <p className="error-message">{errors.title?.message}</p>
        <label>Blog body:</label>
        <textarea {...register("body")}></textarea>
        <p className="error-message">{errors.body?.message}</p>
        <label>Blog author:</label>
        <select {...register("author")}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <p className="error-message">{errors.author?.message}</p>
        {!isMutating && <button>{id ? "Update Blog" : "Add Blog"}</button>}
        {isMutating && (
          <button disabled>{id ? "Updating blog..." : "Adding blog..."}</button>
        )}
      </form>
    </div>
  );
};

export default Create;
