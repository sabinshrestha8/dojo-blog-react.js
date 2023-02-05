import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
    const [blogs, setBlogs] = useState([
        { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
        { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
        { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
    ]);

    const [name, setName] = useState('mario');

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    }

    /* have to be careful while changing state inside use effect hook 
        i.e. could end up in continuous loop */

    // use effect hook fires on every render
    useEffect(() => {
        console.log('use effect ran');
        console.log(name);
    }, [name]);     // setting name as dependency and useEffect hook will trigger as the state of the name changes

    return ( 
        <div className="home">
            <BlogList blogs={ blogs } title="All Blogs" handleDelete={ handleDelete } />
            <button onClick={() => setName('luigi')}>change name</button>
            <p>{ name }</p>
        </div>
     );
}
 
export default Home;