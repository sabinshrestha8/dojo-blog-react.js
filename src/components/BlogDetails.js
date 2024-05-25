import { useHistory, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BlogDetails = () => {
  /* To grab route parameters from the route or url, we have to use import useParams hook */
  const { id } = useParams();
  const history = useHistory();

  const getBlogById = () => {
    return fetch("http://localhost:8000/blogs/" + id).then((res) => res.json());
  };

  /* To call data property with other specific name
    use ':' and the 'name' you want to call it */
  const {
    data: blog,
    isPending,
    error,
  } = useQuery({
    queryKey: ["blogs", id],

    // When the id changes, TanStack Query will correctly invalidate the
    // previous cache entry and fetch the new data for the updated id.
    queryFn: () => getBlogById(id),
  });

  const queryClient = useQueryClient();

  const deleteBlog = async (id) => {
    const res = await fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
    });

    return res.json();
  };

  const { mutate } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const handleClick = (id) => () => {
    mutate(id);
    history.push("/");
  };

  const handleUpdate = () => {
    history.push(`/blogs/update/${id}`);
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick(id)}>delete</button>
          <button onClick={handleUpdate}>update</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
