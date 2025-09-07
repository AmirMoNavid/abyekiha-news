import { getCookie } from 'cookies-next';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

import { useEffect, useRef, useState } from 'react';
import { axiosInstance } from '../../../../configs/configs';
import { useAsyncEffect } from '../../../../utils/useAsyncEffect';
import { isJson } from '../../../../utils/isJson';
import { useStore } from '../../../../store/use-hooks';

function openHiddenFileInput() {
  return new Promise((resolve) => {
    var fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    fileInput.addEventListener('change', function () {
      var selectedFile = this.files[0];
      resolve(selectedFile);
    });

    fileInput.click();
    fileInput.remove();
  });
}

async function fileHandler(quill) {
  const image = await openHiddenFileInput();

  const data = new FormData();

  data.append('file', image);

  axiosInstance
    .post(
      `${
        process.env.NODE_ENV === 'production'
          ? 'https://api.abyekiha.ir'
          : 'http://localhost:5000'
      }/api/upload-file`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getCookie('refreshToken')}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', res.data?.filePath);
      } else {
        alert('خطا در آپلود فایل');
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

const toolbarOptions = [
  ['bold', 'italic', 'underline'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ direction: 'rtl' }], // text direction

  [{ size: ['medium', 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ align: [] }],

  ['clean'],
  ['link', 'image', 'video'],

  [{ color: [] }, { background: [] }],
  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  // [{ 'font': [ 'kalameh' ] }],
];
const quillOptions = {
  modules: {
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
    toolbar: toolbarOptions,
  },
  placeholder: '',
  readOnly: false,
  theme: 'snow',
};

const TextEditor = (props) => {
  const [quill, setQuill] = useState(null);
  const [isContentSet, setIsContentSet] = useState(false);

  const textEditorRef = useRef();
  const textareaRef = useRef();

  useAsyncEffect(async () => {
    const Quill = (await import('quill')).default;

    if (!window.document.querySelector(`.ql-toolbar`)) {
      setQuill(
        new Quill(textEditorRef.current, {
          ...quillOptions,
          ...props,
        })
      );
    }
  }, []);

  useEffect(() => {
    const json = isJson(props.defaultValue);

    if (!json) return;

    if (JSON.stringify(json) === JSON.stringify(quill?.getContents()?.ops))
      return () => setIsContentSet(true);

    if (isContentSet) return;

    quill?.setContents(json);
  });

  useAsyncEffect(async () => {
    const toolbar = quill?.getModule('toolbar');
    toolbar?.addHandler('image', () => fileHandler(quill));
    toolbar?.addHandler('video', () => fileHandler(quill));

    textareaRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    quill?.on('text-change', (e) => {
      const textEditor = document.querySelector(`.ql-editor`);
      let inputEvent = new Event('input', { bubbles: true });
      textEditor.dispatchEvent(inputEvent);
    });
  }, [quill]);

  return (
    <>
      <div
        id={props.id}
        onInput={() => {
          textareaRef.current.value = JSON.stringify(quill?.getContents()?.ops);
        }}
        className="textEditor w-full kalamehNormal"
      >
        <h3 className="mb-1">{props.label}</h3>

        <div className="ltr">
          <div ref={textEditorRef}></div>
          <textarea name={props.name} hidden ref={textareaRef}></textarea>
        </div>
      </div>
      {!quill && <p>درحال بارگذاری ویرایشگر متن</p>}
    </>
  );
};

export default TextEditor;
