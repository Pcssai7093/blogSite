import { useRef, useState, useEffect } from "react";
import QuillEditor from "react-quill";
import ToolBar, { modules, formats } from "./ToolBar";
import { Box, Button } from "@mui/material";
import { Autocomplete, TextField, Chip } from "@mui/material";
import fireDb from "../../firebaseInit";
import { collection, addDoc } from "firebase/firestore";
// Importing styles
import "react-quill/dist/quill.snow.css";

import styles from "./styles.module.css";
const categories = ["Technology", "Health", "Business", "Education", "Sports"];

const AddBlog = () => {
  // Editor state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState(""); // State to store error message

  const quillRef = useRef();

  useEffect(() => {
    console.log(fireDb);

    // addDoc(collection(fireDb, "test1"), { name: "chandra" })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

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

  const handleChangeCategory = (event, newValue) => {
    console.log("Selected Tags:", newValue);
    if (newValue.length > 3) {
      setError("You can only add up to 3 tags.");
    } else {
      setError(""); // Clear error if valid
      setSelectedCategories(newValue);
    }
  };
  return (
    <>
      <div className={styles.contentwrapper}>
        <Box
          sx={{
            display: "flex",
            // flexDirection: "column",
            width: { xs: "100%", sm: "90%", md: "80%", lg: "80%", xl: "80%" },
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "20px",
            margin: "0 auto",
          }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            multiline
            // variant="standard"
            maxRows={4}
            sx={{
              // width: "100%",
              // height: "40px",
              flex: "0 1 40%",
              marginTop: "10px",
              // width: {
              //   xs: "90%",
              //   sm: "85%",
              //   md: "74%",
              //   lg: "74%",
              //   xl: "70%",
              // },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#999", // Optional: Change on hover
                },
                "&.Mui-focused fieldset": {
                  border: "1px solid #999",
                  boxShadow: "none", // Ensures no glow effect
                },
              },
            }}
            slotProps={{
              input: {
                sx: {
                  // fontSize: "0.8rem",
                  // height: "40px",
                  // padding: "auto", // Reduce padding inside the text input
                  width: "100%",
                  background: "#F5F5F5",
                }, // Ensures input field stretches fully
              },
            }}
          />
          <Autocomplete
            multiple
            freeSolo
            options={categories} // Predefined category suggestions
            value={selectedCategories}
            onChange={handleChangeCategory}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            sx={{
              flex: "0 1 40%",
              fontSize: "0.8rem",
              // width: {
              //   xs: "90%",
              //   sm: "85%",
              //   md: "74%",
              //   lg: "74%",
              //   xl: "70%",
              // },
              marginTop: "10px",
              backgroundColor: "#F5F5F5",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                placeholder="Add up to 3 tags"
                error={!!error} // Show error state on TextField
                helperText={error} // Display error message
              />
            )}
          />
        </Box>
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
        <Box
          sx={{
            width: { xs: "100%", sm: "90%", md: "80%", lg: "80%", xl: "80%" },
            margin: "0 auto",
            display: "flex",
            // background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            }}
          >
            Create Blog
          </Button>
        </Box>
      </div>
    </>
  );
};

export default AddBlog;
