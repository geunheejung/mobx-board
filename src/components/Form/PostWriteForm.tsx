import {FormEvent, useCallback, useEffect, useRef, useState} from "react";
import {PostStore} from "../../modlues/post";
import './PostWriteForm.css'
import {observer} from "mobx-react-lite";

interface Props {
  postStore: PostStore;
  afterSubmit?: () => void;
}

const PostWriteForm = observer(function PostWriteForm({ postStore, afterSubmit }: Props) {
 const { fetchCreatePost, fetctGetPosts } = postStore;

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
  }, [ title, content ]);

  const cleanup = useCallback(() => {
    setTitle('');
    setContent('');
    afterSubmit && afterSubmit();
  }, []);

  const createPostFlow = useCallback(async () => {
    try {
      await fetchCreatePost({ title, content, user: 'BOB' })
      await fetctGetPosts();

      cleanup();
    } catch (error) {
      console.error(error);
      setError('다시 시도 해주세요');
    }

  }, [title, content]);

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
    createPostFlow();
  }, [title, content]);

  useEffect(() => {
    focusTo(titleInputRef)
  }, []);

  return (
    <form onSubmit={handleSubmit} className='post-write-form-container'>
      <div className='title-input-field'>
        <label htmlFor="title">제목</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} ref={titleInputRef} />
      </div>

      <div className='content-textarea-field'>
        <textarea
          value={content}
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
})

export default PostWriteForm;
