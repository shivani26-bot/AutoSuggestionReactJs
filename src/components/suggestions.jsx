const SuggestionList = ({ suggestions = [], highlight, dataKey, onSelect }) => {
  const getHighLightedText = (text, highlight) => {
    // return text;
    // gi->global case insensitive
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    console.log("text", parts);
    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b style={{ color: "blue" }} key={index}>
              {part}
            </b>
          ) : (
            part
          );
        })}
      </span>
    );
  };
  return (
    <>
      {suggestions.map((suggestion, index) => {
        // datakey is present only in dynamic data through api call not in static data

        const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;
        return (
          <li
            key={index}
            onClick={() => onSelect(suggestion)}
            className="suggestion-item "
          >
            {getHighLightedText(currSuggestion, highlight)}
          </li>
        );
      })}
    </>
  );
};

export default SuggestionList;
