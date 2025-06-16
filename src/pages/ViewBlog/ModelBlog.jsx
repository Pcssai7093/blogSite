import { useRef, useState, useEffect } from "react";
import QuillEditor from "react-quill";
import ToolBar, { modules, formats } from "./ToolBar";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  CircularProgress,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import fireDb from "../../firebaseInit";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { format } from "date-fns";
import { motion } from "framer-motion";

import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/github.css";
import styles from "./styles.module.css";

const categories = ["Technology", "Health", "Business", "Education", "Sports"];

const CategoryContainer = styled(Box)({
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 16,
  padding: "0 16px 16px 16px",
});

const CategoryButton = styled(Button)(({ theme, bgColor }) => ({
  borderRadius: 20,
  textTransform: "none",
  padding: "6px 18px",
  fontWeight: "bold",
  fontFamily: "'Comic Sans MS', 'Fredoka One', cursive",
  fontSize: "0.75rem",
  background: bgColor,
  color: "#fff",
  border: `2px solid white`,
  boxShadow: `4px 4px 0px ${bgColor}`,
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
  padding: "16px",
  fontFamily: "'Comic Sans MS', 'Fredoka One', cursive",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-4px)",
  },
  border: "1.5px solid black",
  background: "transparent",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: -5,
    width: 50,
    height: 50,
    backgroundColor: theme.palette.background.paper,
    borderLeft: "1.5px solid black",
    borderBottom: "4.5px solid black",
    borderRight: "1.5px solid black",
    transform: "rotate(45deg)",
    transformOrigin: "top right",
    zIndex: 1,
    borderRadius: "0 10px 0px 0px",
  },
}));

const ModelBlog = ({ open, onClose, bId }) => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [blogDate, setBlogDate] = useState("");

  const chipColors = [
    "#6B6B6B", "#2B2B2B", "#7D7D7D", "#4A4A4A", "#A6A6A6",
    "#1C1C1C", "#737373", "#3A3A3A", "#5C5C5C", "#969696",
    "#8C8C8C", "#2F2F2F"
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const quillRef = useRef();

  useEffect(() => {
    if (!bId) return;

    getDoc(doc(fireDb, "blogs", bId))
      .then((docSnap) => {
        if (docSnap.exists()) {
          const bData = docSnap.data();
          setValue(bData.BlogContent);
          setTitle(bData.BlogTitle);
          setTags(bData.BlogCategories);
          setBlogDate(bData.createdAt);
        } else {
          console.log("No such document!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [bId]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" scroll="body">
      {!value ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
          <CircularProgress />
        </Box>
      ) : (
        <DialogContent sx={{ padding: 0, position: "relative" }}>
          {/* Close Button */}
         <IconButton
    aria-label="close"
    onClick={onClose}
    sx={{
      position: "fixed",
      top: 20,
      right: 20,
      backgroundColor: "grey",
      color: "white",
      zIndex: 9999,
      "&:hover": {
        backgroundColor: "#c62828",
      },
    }}
  >
    <CloseIcon />
  </IconButton>
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
                      },
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        background: "linear-gradient(45deg, #b3aeae 30%, #2e2727 90%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        WebkitTextStroke: "0.5px black",
                        fontFamily: "sketch2",
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography variant="caption">
                      {format(blogDate?.toDate?.(), "dd-MM-yyyy")}
                    </Typography>
                    <CategoryContainer sx={{ flexDirection: "row-reverse" }}>
                      {tags.map((category, index) => (
                        <CategoryButton
                          key={category}
                          variant="outlined"
                          size="small"
                          sx={{ fontSize: "0.6rem" }}
                          bgColor={chipColors[index % 10]}
                        >
                          {category}
                        </CategoryButton>
                      ))}
                    </CategoryContainer>
                  </Box>

                  <Box
                    sx={{
                      padding: "10px",
                      width: {
                        xs: "100%",
                        sm: "100%",
                        md: "80%",
                        lg: "80%",
                        xl: "80%",
                      },
                      minHeight: "250px",
                      "& .ql-editor": {
                        minHeight: "80vh",
                      },
                    }}
                  >
                    <QuillEditor
                      theme="snow"
                      ref={quillRef}
                      value={value}
                      modules={{ toolbar: false }}
                      formats={formats}
                      readOnly={true}
                    />
                  </Box>
                </Box>
              </CartoonCard>
            </div>
          </motion.div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ModelBlog;
