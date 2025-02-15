import React from "react";
import { Quill } from "react-quill";
import styles from "./ToolBar.module.css";

const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);
// Override Quill's bold icon
const icons = Quill.import("ui/icons");
// icons.bold = CustomUndo;

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <polygon fill="black" points="12 10 14 12 16 10 12 10" />
    <path
      stroke="black"
      fill="none"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {},
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

// Quill Toolbar component
export const ToolBar = () => {
  // useEffect(() => {
  //   document.dispatchEvent(new Event("DOMContentLoaded")); // Force Quill to re-render
  // }, []);
  return (
    <div className={styles.toolBarWrapper}>
      <div className={styles.toolbar} id="toolbar">
        <div className={`ql-formats ${styles.formats}`}>
          <div className={styles.LongToolIconWrapper}>
            <select
              className={`ql-font ${styles.boldLongIcon}`}
              defaultValue="arial"
            >
              <option value="arial">Arial</option>
              <option value="comic-sans">Comic Sans</option>
              <option value="courier-new">Courier New</option>
              <option value="georgia">Georgia</option>
              <option value="helvetica">Helvetica</option>
              <option value="lucida">Lucida</option>
            </select>
          </div>

          <div className={styles.LongToolIconWrapper}>
            <select
              className={`ql-size ${styles.boldLongIcon}`}
              defaultValue="medium"
            >
              <option value="extra-small">Size 1</option>
              <option value="small">Size 2</option>
              <option value="medium">Size 3</option>
              <option value="large">Size 4</option>
            </select>
          </div>

          <div className={styles.LongToolIconWrapper}>
            <select
              className={`ql-header ${styles.boldLongIcon}`}
              defaultValue="3"
            >
              <option value="1">Heading</option>
              <option value="2">Subheading</option>
              <option value="3">Normal</option>
            </select>
          </div>

          <div className={styles.toolIconWrapper}>
            <button className={`ql-bold ${styles.boldIcon}`}></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button className={`ql-italic ${styles.boldIcon}`}></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button className={`ql-underline ${styles.boldIcon}`}></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button className={`ql-strike ${styles.boldIcon}`}></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button
              className={`ql-list ${styles.boldIcon}`}
              value="ordered"
            ></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button
              className={`ql-list ${styles.boldIcon}`}
              value="bullet"
            ></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button
              className={`ql-indent ${styles.boldIcon}`}
              value="-1"
            ></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button
              className={`ql-indent ${styles.boldIcon}`}
              value="+1"
            ></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button
              className={`ql-script ${styles.boldIcon}`}
              value="super"
            ></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button
              className={`ql-script ${styles.boldIcon}`}
              value="sub"
            ></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button className={`ql-blockquote ${styles.boldIcon}`}></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <select className={`ql-align ${styles.boldIcon}`}></select>
          </div>

          <div className={styles.toolIconWrapper}>
            <select className={`ql-color ${styles.boldIcon}`}></select>
          </div>

          <div className={styles.toolIconWrapper}>
            <select className={`ql-background ${styles.boldIcon}`}></select>
          </div>

          <div className={styles.toolIconWrapper}>
            <button className={`ql-link ${styles.boldIcon}`}></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button className={`ql-image ${styles.boldIcon}`}></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button className={`ql-video ${styles.boldIcon}`}></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button className={`ql-formula ${styles.boldIcon}`}></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button className={`ql-code-block ${styles.boldIcon}`}></button>
          </div>

          <div className={styles.toolIconWrapper}>
            <button className={`ql-clean ${styles.boldIcon}`}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
