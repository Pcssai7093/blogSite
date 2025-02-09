import { useRef, useState, useEffect } from "react";
import QuillEditor from "react-quill";
import ToolBar, { modules, formats } from "./ToolBar";
import { Box } from "@mui/material";
// Importing styles
import "react-quill/dist/quill.snow.css";

import styles from "./styles.module.css";

const AddBlog = () => {
  // Editor state
  const [value, setValue] = useState("");
  const quillRef = useRef();

  const [state, setState] = useState({ value: null });

  useEffect(() => {
    const savedContent = localStorage.getItem("blogContent");
    if (savedContent) {
      console.log("loading saved content");
      setValue((prev) => savedContent);
    }
  }, []);

  const handleChange = (value) => {
    const quill = quillRef.current.getEditor(); // Access the Quill instance
    const editorValue = quill.root.innerHTML; // Get the editor's value (HTML)
    console.log(editorValue); //

    clearTimeout(window.autoSaveTimer);
    window.autoSaveTimer = setTimeout(() => {
      localStorage.setItem("blogContent", editorValue);
    }, 500);
    // console.log(quill.currentValue);
  };

  return (
    <>
      <div className={styles.contentwrapper}>
        <ToolBar />
        <div className={styles.wrapper}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              width: { xs: "100%", sm: "90%", md: "80%", lg: "80%", xl: "80%" }, // Full width
              minHeight: "250px", // Adjust based on design
              "& .ql-editor": {
                minHeight: "200px", // Ensures text input space
              },
              backgroundColor: "#F5F5F5",
            }}
          >
            <QuillEditor
              theme="snow"
              ref={quillRef}
              value={value}
              onChange={handleChange}
              modules={modules}
              formats={formats}
            />
          </Box>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
