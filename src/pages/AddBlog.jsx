import { useRef, useState } from "react";
import QuillEditor from "react-quill";
import ToolBar, { modules, formats } from "./ToolBar";

// Importing styles
import "react-quill/dist/quill.snow.css";

import styles from "./styles.module.css";

const AddBlog = () => {
  // Editor state
  const [value, setValue] = useState("");
  const quillRef = useRef();

  const [state, setState] = useState({ value: null });
  const handleChange = (value) => {
    const quill = quillRef.current.getEditor(); // Access the Quill instance
    const editorValue = quill.root.innerHTML; // Get the editor's value (HTML)
    console.log(editorValue); //
    // console.log(quill.currentValue);
  };

  // Handler to handle button clicked
  function handler() {
    console.log(value);
  }

  return (
    <>
      <label className={styles.label}>Editor Content</label>
      <ToolBar />
      <div className={styles.wrapper}>
        <QuillEditor
          theme="snow"
          ref={quillRef}
          className={styles.editor}
          value={state.value}
          onChange={handleChange}
          //   placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
        />
      </div>
      <button onClick={handler} className={styles.btn}>
        Submit
      </button>
    </>
  );
};

export default AddBlog;
