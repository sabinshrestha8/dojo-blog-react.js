import { useParams } from "react-router-dom";

const BlogDetails = () => {
    /* To grab route parameters from the route or url, we have to use import useParams hook */
    const  { id } = useParams();

    return (
        <div className="blog-details">
            <h2>Blog details - {id}</h2>
        </div>
    );
}
 
export default BlogDetails;