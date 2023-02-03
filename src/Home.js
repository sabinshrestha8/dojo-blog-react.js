import { useState } from "react";

const Home = () => {
    // non-reactive value
    // let name = 'mario';

    // const handleClick = () => {
    //     name = 'luigi';
    //     console.log(name);
    // }

    // create a reactive value
    // The useState hook returns two value to us which is destructured an array
    const [name, setName] = useState('mario');
    const [age, setAge] = useState(25);

    const handleClick = () => {
        setName('luigi');
        setAge(26);
    }

    return ( 
        <div className="home">
            <h2>Homepage</h2>
            <p>{ name } is { age } years old</p>
            <button onClick={ handleClick }>Click me</button>
        </div>
     );
}
 
export default Home;