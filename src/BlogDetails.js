import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    /* To grab route parameters from the route or url, we have to use import useParams hook */
    const  { id } = useParams();

    /* To call data property with other specific name
    use ':' and the 'name' you want to call it */
    const { data: blog, isPending, error } = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();

    /* An “options object” is a programming pattern that you can
    use to pass any number of named arguments to a function */
    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    return (
        <div className="blog-details">
            { isPending && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                    <button onClick={ handleClick }>delete</button>
                </article>
            )}

            {/* <h2>Blog details</h2>
            { blog && <h3>{ blog.title }</h3>}
            { blog && <p>{ blog.body }</p>}
            { blog && <h4>-{ blog.author }</h4>} */}
        </div>
    );
}
 
export default BlogDetails;