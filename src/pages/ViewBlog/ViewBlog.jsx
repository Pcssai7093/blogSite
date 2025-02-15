import { useRef, useState, useEffect } from "react";
import QuillEditor from "react-quill";
import ToolBar, { modules, formats } from "./ToolBar";
import { Box, Button } from "@mui/material";
import { Autocomplete, TextField, Chip, Typography } from "@mui/material";
import { styled } from "@mui/system";
import fireDb from "../../firebaseInit";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import Highlight from "react-highlight";

import "highlight.js/styles/github.css";

// Importing styles
import "react-quill/dist/quill.snow.css";

import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
const categories = ["Technology", "Health", "Business", "Education", "Sports"];

const CategoryContainer = styled(Box)({
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 16,
  padding: "0 16px 16px 16px",
});

const CategoryButton = styled(Button)({
  borderRadius: 50,
  textTransform: "none",
  padding: "4px 16px",
  minWidth: "unset",
});

const ViewBlog = () => {
  // Editor state
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [blogDate, setBlogDate] = useState("");
  const chipColors = ["primary", "secondary", "success"];

  const quillRef = useRef();
  const { bId } = useParams();

  useEffect(() => {
    console.log(fireDb);

    getDoc(doc(fireDb, "blogs", bId))
      .then((docSnap) => {
        if (docSnap.exists()) {
          let bData = docSnap.data();
          console.log("Fetched Blog:", bData);
          setValue(bData.BlogContent);
          setTitle(bData.BlogTitle);
          setTags(bData.BlogCategories);
          setBlogDate(bData.createdAt);
          console.log(docSnap.data().BlogContent);
        } else {
          console.log("No such document!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className={styles.contentwrapper}>
        <div className={styles.wrapper}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "90%",
                  md: "80%",
                  lg: "80%",
                  xl: "80%",
                }, //
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography variant="h3">{title}</Typography>
              <Typography variant="caption">{blogDate}</Typography>
              <CategoryContainer
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "start",
                  // minHeight: "100px",
                }}
              >
                {tags &&
                  tags.map((category, index) => (
                    <CategoryButton
                      key={category}
                      variant="outlined"
                      size="small"
                      sx={{ fontSize: "0.6rem" }}
                      color={chipColors[index % 3]}
                    >
                      {category}
                    </CategoryButton>
                  ))}
              </CategoryContainer>
            </Box>

            <Box
              sx={{
                //   border: "1px solid #ccc",
                //   borderRadius: "4px",
                padding: "10px",
                width: {
                  xs: "100%",
                  sm: "90%",
                  md: "80%",
                  lg: "80%",
                  xl: "80%",
                }, // Full width
                minHeight: "250px", // Adjust based on design
                "& .ql-editor": {
                  minHeight: "80vh", // Ensures text input space
                },
                backgroundColor: "#F5F5F5",
              }}
            >
              <QuillEditor
                theme="snow"
                ref={quillRef}
                value={value}
                modules={{ toolbar: false }}
                formats={formats}
                readOnly="true"
              />
            </Box>
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
        ></Box>
      </div>
    </>
  );
};

export default ViewBlog;
