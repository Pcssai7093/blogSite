import { useRef, useState, useEffect } from "react";
import QuillEditor from "react-quill";
import ToolBar, { modules, formats } from "./ToolBar";
import { Box, Button, Card } from "@mui/material";
import { Autocomplete, TextField, Chip, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import { motion } from "framer-motion";
import { styled } from "@mui/system";
import fireDb from "../../firebaseInit";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import Highlight from "react-highlight";
import { format } from "date-fns";

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

  border: "1.5px solid black",

  background: "transparent",
  // border: "none",
  backdropFilter: "blur(10px)", // Blur effect for glassy look
  WebkitBackdropFilter: "blur(10px)",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: -5,
    width: 50,
    height: 50,
    backgroundColor: theme.palette.background.paper, // match the outside background
    borderLeft: "1.5px solid black",
    borderBottom: "4.5px solid black",
    borderRight: "1.5px solid black",
    transform: "rotate(45deg)",
    transformOrigin: "top right",
    zIndex: 1,
    borderRadius:"0 10px 0px 0px"
  },
}));

const ViewBlog = () => {
  // Editor state
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [blogDate, setBlogDate] = useState("");
  const chipColors = [
    "#6B6B6B", // Dim Grey
    "#2B2B2B", // Almost Black
    "#7D7D7D", // Stone Grey
    "#4A4A4A", // Charcoal Grey
    "#A6A6A6", // Light Grey
    "#1C1C1C", // Very Dark Grey
    "#737373", // Grey
    "#3A3A3A", // Gunmetal Grey
    "#5C5C5C", // Medium Dark Grey
    "#969696", // Smokey Grey
    "#8C8C8C", // Medium Grey
    "#2F2F2F", // Dark Grey
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const quillRef = useRef();
  const { bId } = useParams();

  useEffect(() => {
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
      {!value ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className={styles.contentwrapper}
        >
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
                      sm: "100%",
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
                      fontWeight: 700,
                      background:
                        "linear-gradient(45deg, #b3aeae 30%, #2e2727 90%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      WebkitTextStroke: "0.5px black",
                      fontFamily: "sketch2",
                    }}
                  >
                    {title && title}
                  </Typography>
                  <Typography variant="caption">
                    {format(blogDate?.toDate?.(), "dd-MM-yyyy")}
                  </Typography>
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
                      sm: "100%",
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
        </motion.div>
      )}
    </>
  );
};

export default ViewBlog;
