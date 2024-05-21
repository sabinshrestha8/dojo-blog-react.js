import BlogList from "./BlogList";
import useFetch from "../hooks/useFetch";

const Home = () => {
  // grab the data but call it blogs in this context
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch("http://localhost:8000/blogs");
  // const { data, isPending, error } = useFetch('http://localhost:8000/blogs');

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
