import { useCallback, useState } from "react";
import { useEffect } from "react";
import "./styles.css";
import SuggestionList from "./suggestions";
import debounce from "lodash/debounce";
const Autocomplete = ({
  staticData,
  fetchSuggestions,
  placeholder = "",
  customLoading = "",
  onSelect = () => {},
  onBlur = () => {},
  onFocus = () => {},
  onChange = () => {},
  customStyles = {},
  dataKey = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("suggestions", suggestions);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // perform some action externally when the component changes
    onChange(e.target.value);
  };

  //   get suggestions for static or dynamic data
  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    // make api call inside try catch block
    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query);
      }
      setSuggestions(result);
    } catch (error) {
      setError("Failed to fetch suggestions.");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };
  // time after how much time it will check once keystrock has stopped
  //   useCallback to make sure it doesn't run or created every single time
  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );
  // runs only when input value changes
  useEffect(() => {
    // search only when user enters more than one letter
    if (inputValue.length > 1) {
      //   getSuggestions(inputValue);
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestions([]);
  };
  return (
    <div className="container">
      <h1> AutoComplete/TypeAhead</h1>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
      />
      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestions-list">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          <SuggestionList
            dataKey={dataKey}
            highlight={inputValue}
            suggestions={suggestions}
            onSelect={handleSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
