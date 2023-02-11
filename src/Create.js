import { useState } from "react";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form>
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
                <button>Add Blog</button>
                <p>{ title }</p>
                <p>{ body }</p>
                <p>{ author }</p>
            </form>
        </div>
    );
}
 
export default Create;