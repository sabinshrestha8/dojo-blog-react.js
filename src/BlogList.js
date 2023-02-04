// step 2: receiving blogs data in the Bloglist component as an argument i.e. props obj
// const BlogList = (props) => {
//     const blogs = props.blogs;
//     const title = props.title;
const BlogList = ({ blogs, title }) => {    // Destructuring the props
    return (
        <div className="blog-list">
            <h2>{ title }</h2>
            { blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                </div>
            )) }
        </div>
    );
}
 
export default BlogList;