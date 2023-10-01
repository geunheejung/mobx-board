import {useCallback, useState} from "react";

function Search() {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(() => {
    /**
     * TODO: 검색 구현하기
     */
  }, [value]);

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input type="text" value={value}/>
      <button type="submit">검색</button>
    </form>
  )
}

export default Search;
