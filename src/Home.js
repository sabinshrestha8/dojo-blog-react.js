import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/blogs')
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    // console.log(data);
                    setBlogs(data);
                    setIsPending(false);
                });
        }, 1000)
    }, []);

    return ( 
        <div className="home">
            {/* when isPending is true it shows Loading... message  */}
            { isPending && <div>Loading...</div> }
            {/* using conditional templating in react */}
            { blogs && <BlogList blogs={ blogs } title="All Blogs" /> }
        </div>
     );
}
 
export default Home;