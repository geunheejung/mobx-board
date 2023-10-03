import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import {IPost} from "../../data";
import {PostStoreContext} from "../../index";
import './Search.css'
import {debug} from "util";


const Search = observer(function Search() {
  const inputRef = useRef<HTMLInputElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const { postStore } = useContext(PostStoreContext)

  const [detailItem, setDetailItem] = useState<IPost | null>();
  const [isSearch, setIsSearch] = useState(false);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSearch === false) setIsSearch(true);
    postStore.setSearchKeyword(e.target.value);
  }, []);

  const handleFocus = useCallback(() => {
    setIsSearch(true);
  }, []);


  const handleItemClick = useCallback((post: IPost) => {
    setDetailItem(post);
    postStore.setSearchKeyword('')
    setIsSearch(false);
  }, []);

  const handleKeyDown = useCallback((e:  React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      setIsSearch(false)
    }
  }, []);

  useEffect(() => {
    const listener = ({ target }: MouseEvent) => {
      if (!isSearch) return;

      if (target === resultRef.current || target === inputRef.current){
        return;
      }

      setIsSearch(false);
    }
    window.addEventListener('click', listener)

    return () => {
      window.removeEventListener('click', listener);
    }
  }, []);

  return (
    <div className='search-container'>
      <form onSubmit={handleSubmit} className='search-input-field'>

        <input
          type="text"
          value={postStore.searchKeyword}
          onChange={handleChange}
          placeholder="Search..."
          onClick={handleFocus}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button type="submit">검색</button>
      </form>
      <div
        className={`search-result-container --${isSearch ? 'show' : 'hide'}`}
        ref={resultRef}
      >
        <ul className="list-container" >

        {postStore.filteredPostList.map(row => (
          <li key={row.id} className="list-item" >
            <a href="#" onClick={() => handleItemClick(row)}>
            {row.title}
            {row.content}
            </a>
          </li>
        ))}
        </ul>
      </div>
    </div>
  )
})

export default Search;
