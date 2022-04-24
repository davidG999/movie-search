import API_KEY from './API_KEY';

const API_URL = `http://www.omdbapi.com/apikey=${API_KEY}`;
console.log(API_URL)

const App = () => {
  return (
    <h1>Movie search</h1>
  );
}

export default App;