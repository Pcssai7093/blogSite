import { useRef, useState, useEffect } from "react";
import QuillEditor from "react-quill";
import ToolBar, { modules, formats } from "./ToolBar";
import { Box, Button, Card } from "@mui/material";
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

const CategoryButton = styled(Button)(({ theme, bgColor }) => ({
  borderRadius: 20, // More rounded but not a full pill shape
  textTransform: "none",
  padding: "6px 18px",
  // minWidth: "unset",
  fontWeight: "bold",
  fontFamily: "'Comic Sans MS', 'Fredoka One', cursive", // Playful font
  fontSize: "0.75rem",
  background: bgColor, // Warm cartoonish color
  color: "#fff",
  border: `2px solid white`,
  boxShadow: `4px 4px 0px ${bgColor}`, // Cartoon pop-out effect
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `6px 6px 0px white`,
  },
  "&:active": {
    transform: "translateY(2px)",
    boxShadow: `2px 2px 0px ${bgColor}`,
  },
}));

const CartoonCard = styled(Card)(({ theme }) => ({
  // borderRadius: 7,
  // background: "linear-gradient(145deg, #ffea00, #ffcc00)",
  // boxShadow: "8px 8px 0px white",
  // border: "2px solid #21A3F3",
  padding: "16px",
  fontFamily: "'Comic Sans MS', 'Fredoka One', cursive",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    // boxShadow: "8px 8px 0px #21A3F3",
    // background: "rgba(255, 255, 255, 1)", // Semi-transparent white
  },

  background: "rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(10px)", // Blur effect for glassy look
  WebkitBackdropFilter: "blur(10px)",
}));

const ViewBlog = () => {
  // Editor state
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [blogDate, setBlogDate] = useState("");
  const chipColors = [
    "#28A745", // Dark Green
    "#D32F2F", // Strong Red
    "#6A1B9A", // Deep Purple
    "#FFAA00", // Deep Orange-Yellow
    "#007ACC", // Bright Blue
    "#FF5722", // Vivid Orange
    "#00897B", // Teal Green
    "#1976D2", // Dark Blue
    "#C2185B", // Dark Pink
    "#795548", // Warm Brown
  ];

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
          <CartoonCard>
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
                <Typography
                  variant="h3"
                  sx={{
                    color: "white",
                    WebkitBackgroundClip: "text",
                    WebkitTextStroke: "0.6px black",
                  }}
                >
                  {title}
                </Typography>
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
                        color={chipColors[index % 10]}
                        bgColor={chipColors[index % 10]}
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
                  // backgroundColor: "#F5F5F5",
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
          </CartoonCard>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
