import BlogList from "./BlogList";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const getBlogs = () => {
    return fetch("http://localhost:8000/blogs").then((res) => res.json());
  };

  // grab the data but call it blogs in this context
  const {
    data: blogs,
    isPending,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {/* when isPending is true it shows Loading... message  */}
      {isPending && <div>Loading...</div>}
      {/* using conditional templating in react */}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
};

export default Home;
