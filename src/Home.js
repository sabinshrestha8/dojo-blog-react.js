import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/blogs')
                .then(res => {
                    if(!res.ok) {
                        throw Error('could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    // console.log(data);
                    setBlogs(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch((err) => {
                    // console.log(err.message);
                    setIsPending(false);
                    setError(err.message);
                })
        }, 1000)
    }, []);

    return ( 
        <div className="home">
            { error && <div>{ error }</div> }
            {/* when isPending is true it shows Loading... message  */}
            { isPending && <div>Loading...</div> }
            {/* using conditional templating in react */}
            { blogs && <BlogList blogs={ blogs } title="All Blogs" /> }
        </div>
     );
}
 
export default Home;