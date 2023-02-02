import './App.css';

function App() {
  // step 1: storing string in a variable
  const title = 'Welcome to the new blog';
  const likes = 50;
  // const person = { name: 'yoshi', age: 30 };  // cannot output objects & booleans in browser directly
  const link = "https://www.google.com";

  return (
    <div className="App">
      <div className="content">
        {/* step 2: outputting the stored value dynamically */}
        <h1>{ title }</h1>
        <p>Liked { likes } times</p>

        {/* <p>{ person }</p> */}
        
        <p>{ 10 }</p>
        <p>{ "hello, ninjas" }</p>
        <p>{ [1,2,3,4,5] }</p>
        <p>{ Math.random() * 10 }</p>

         <a href={ link }>Google Site</a>
      </div>
    </div>
  );
}

export default App;
