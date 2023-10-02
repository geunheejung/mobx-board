import {useCallback, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import {PostStore} from "../../modlues/post";
import './Search.css'
import {IPost} from "../../data";

interface Props {
  postStore: PostStore
}

const Search = observer(function Search({ postStore }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const { filteredList, fetchSearchPost } = postStore;

  const [detailItem, setDetailItem] = useState<IPost | null>();
  const [value, setValue] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const searchFlow = useCallback(async (value: string) => {
    await fetchSearchPost({ keyword: value });
  }, [value])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handleChange = useCallback((e:  React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setValue(value)
    searchFlow(value)
  }, [value]);

  const handleFocus = useCallback(() => {
    setIsSearch(true);
  }, []);

  const handleBlur = useCallback(() => {
    // setIsSearch(false)
  }, []);

  const handleItemClick = useCallback((post: IPost) => {
    // 클릭 시 상세 게시글로 이동 해야 함.
    setDetailItem(post);
    setValue(post.title);
    setIsSearch(false);
  }, []);

  useEffect(() => {
    window.addEventListener('click', (e: MouseEvent) => {
      if (containerRef.current && resultRef.current) {
        if (e.target) {
          const { className } = e.target as HTMLElement;

          if (
            containerRef.current.className.includes(className) ||
            resultRef.current.className.includes(className)
          ) {
            return;
          }

          setIsSearch(false);
        }
      }
    })
  }, []);

  return (
    <div className='search-container' ref={containerRef}>
      <form onSubmit={handleSubmit} className='search-input-field'>

        <input type="text" value={value} onChange={handleChange} placeholder="Search..." onFocus={handleFocus} onBlur={handleBlur} />
        <button type="submit">검색</button>

      </form>
      {/* input이 활성화 되어 있으면 열리도록 */}
      <div className={`search-result-container --${isSearch ? 'show' : 'hide'}`} ref={resultRef}>
        <ul className="list-container">
        {filteredList.map(row => (
          <li key={row.id} className="list-item">
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
