import React from 'react';

const SearchSuggestion = (props) => {
  return (
    <div className="search-suggestion">
      <img src={props.image} alt="Recipe" className="suggestion-image" />
      <div className="suggestion-title">{props.title}</div>
    </div>
  );
};

export default SearchSuggestion;