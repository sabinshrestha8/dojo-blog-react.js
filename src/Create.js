import { useState } from "react";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);

        setTimeout(() => {
            fetch('http://localhost:8000/blogs', {
                method: 'Post',
                // content type that is being sent
                headers: { "content-Type": "application/json" },
                /* To convert an object data into json string,
                we 've to use json object then we use a method
                called stringify() and pass in the object we
                want to turn into a json string */
                body: JSON.stringify(blog)
            })
            .then(() => {
                console.log('new blog added');
                setIsPending(false);
            })
        }, 500);
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={ handleSubmit }>
                <label>Blog title:</label>
                <input
                    type="text"
                    required
                    value={ title }

                    /* To change the value of input we 've to use onChange event
                    and inside the event we should define anonymous function
                    which then updates the state of that input field */
                    onChange={ (e) => setTitle(e.target.value) }
                />
                <label>Blog body:</label>
                <textarea
                    required
                    value={ body }
                    onChange={ (e) => setBody(e.target.value) }
                ></textarea>
                <label>Blog author:</label>
                <select 
                    value={ author }
                    onChange={ (e) => setAuthor(e.target.value) }
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isPending && <button>Add Blog</button>}
                { isPending && <button disabled>Adding blog...</button>}
            </form>
        </div>
    );
}
 
export default Create;