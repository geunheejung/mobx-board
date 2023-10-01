import {FormEvent, useCallback, useEffect, useRef, useState} from "react";
import {postStore} from "../../modlues/post";
import './PostWriteForm.css'

function PostWriteForm() {
  const { fetchCreatePost } = postStore;

  const titleInputRef = useRef<HTMLInputElement>(null)
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null)

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const focusTo = (ref: typeof titleInputRef | typeof contentTextareaRef) => {
    if (!ref.current) {
      console.error(ref + 'focus fail')
      return;
    }

    ref.current.focus();
  }

  const validate = useCallback(() => {
    if (!title) {
      focusTo(titleInputRef);
      return {
        message: '제목을 입력해주세요',
        id: 'title',
      }
    }
    if (!content) {
      focusTo(contentTextareaRef)
      return {
        message: '내용을 입력해주세요',
        id: 'content'
      }
    }

    return;
  }, [ title, content ])

  const handleTitleChange = useCallback((e:  React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTitle(value)
  }, [title]);

  const handleContentChange = useCallback((e:  React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trim();
    setContent(value);
  }, [content]);

  const handleSubmit = useCallback((e:  FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validate();

    if (error) {
      setError(error.message);
      return;
    }

    fetchCreatePost({ title, content, user: 'BOB' });
  }, [title, content]);

  useEffect(() => {
    focusTo(titleInputRef)
  }, []);

  return (
    <form onSubmit={handleSubmit} className='post-write-form-container'>
      <div className='title-input-field'>
        <label htmlFor="title">제목</label>
        <input type="text" id="title" onChange={handleTitleChange} ref={titleInputRef} />
      </div>
      <div className="user-info-input-field">
        <label htmlFor="nickname">닉네임</label>
        <input type="text" id="nickname" maxLength={5} />
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" maxLength={8} autoComplete="on" />
      </div>
      <div className='content-textarea-field'>
        <textarea
          name="content"
          id="contentTextArea"
          cols={30}
          rows={10}
          onChange={handleContentChange}
          ref={contentTextareaRef}
        />
      </div>
      <p className="error-text-container"><strong>{error}</strong></p>
      <button type='submit' className="submit-button">작성</button>
    </form>
  )
}

export default PostWriteForm;
