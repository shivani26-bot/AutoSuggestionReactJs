import "./App.css";
import Autocomplete from "./components/autocomplete";
// https://dummyjson.com/recipes/search?q=Mar
function App() {
  const staticData = [
    "apple",
    "banana",
    "berrl",
    "orange",
    "grape",
    "mango",
    "melon",
    "berry",
    "peach",
    "cherry",
    "plum",
  ];
  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    // sends the array of objects
    return result.recipes;
  };
  return (
    <div>
      {/* <h1> AutoComplete/TypeAhead</h1> */}
      <Autocomplete
        placeholder={"Enter recipe"}
        fetchSuggestions={fetchSuggestions}
        // to support static data from local
        // staticData={staticData}
        // name contains the actual name of recipes
        dataKey={"name"}
        customLoading={<>Loading Recipes..</>}
        // what happens when particular option is selected

        onSelect={(res) => console.log("res", res)}
        onChange={(e) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customStyles={{}}
      />
    </div>
  );
}

export default App;
