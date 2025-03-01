import { useRef, useState, useEffect } from "react";
import QuillEditor from "react-quill";
import ToolBar, { modules, formats } from "./ToolBar";
import { Box, Button, styled, Card, Typography } from "@mui/material";
import { Autocomplete, TextField, Chip, CircularProgress } from "@mui/material";
import fireDb from "../../firebaseInit";
import { useParams } from "react-router-dom";

import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// Importing styles
import "react-quill/dist/quill.snow.css";

import styles from "./styles.module.css";
import DialogBox from "../../components/DialogBox/DialogBox";

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

const categories = ["Technology", "Health", "Business", "Education", "Sports"];

const EditBlog = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState(""); // State to store error message
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

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    console.log("in handle close");
    setOpen((prev) => false);
    console.log(open);
  };

  const [snackOpen, snackSetOpen] = useState(false);
  const [snackContent, setSnackContent] = useState("");

  const snackHandleClick = (info) => {
    setSnackContent(info);
    snackSetOpen(true);
  };

  const snackHandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    snackSetOpen(false);
  };

  useEffect(() => {
    // console.log(fireDb);

    getDoc(doc(fireDb, "blogs", bId))
      .then((docSnap) => {
        if (docSnap.exists()) {
          let bData = docSnap.data();
          console.log("Fetched Blog:", bData);
          setValue(bData.BlogContent);
          setTitle(bData.BlogTitle);
          setSelectedCategories(bData.BlogCategories);
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

  const handleChange = (value) => {
    const quill = quillRef.current.getEditor(); // Access the Quill instance
    const editorValue = quill.root.innerHTML; // Get the editor's value (HTML)
    console.log(editorValue); //
    setValue(editorValue);

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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePasswordSubmit = async (password) => {
    setLoading(true); // Start loading
    let isAdmin = false;
    try {
      let url = String.raw`https://us-central1-blogapp-81127.cloudfunctions.net/isAdmin`;
      let response = await axios.post(url, { password: password });
      isAdmin = response?.data?.status;
    } catch (err) {
      console.log(err);
    }
    console.log("isAdmin", isAdmin);
    if (isAdmin) {
      const docRef = doc(fireDb, "blogs", bId);

      console.log(title);
      console.log(selectedCategories);
      console.log(value);

      let BlogTitle = title;
      let BlogCategories = selectedCategories;
      let BlogContent = value;

      // const today = new Date();
      // const day = String(today.getDate()).padStart(2, "0"); // Ensures 2 digits
      // const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      // const year = today.getFullYear();

      // const formattedDate = `${day}-${month}-${year}`;
      try {
        let saveRes = await updateDoc(docRef, {
          BlogTitle: BlogTitle,
          BlogCategories: BlogCategories,
          BlogContent: BlogContent,
          createdAt: serverTimestamp(),
        });
        console.log(saveRes);
        snackHandleClick("blog submission success");
      } catch (err) {
        console.log(err);
        snackHandleClick("blog submission failed");
      }
    } else {
      snackHandleClick("incorrect password");
    }
    setLoading(false); // S
    handleClose();
  };

  const handleBlogSubmit = async () => {
    setOpen(true);
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
            value={title}
            onChange={handleTitleChange}
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
          {selectedCategories && (
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
          )}
        </Box>
        <Box
          sx={{
            position: "sticky",
            top: "0",
            zIndex: 1000,
            // backgroundColor: "white",
            // padding: "10px",
            // boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <ToolBar />
        </Box>
        <CartoonCard
          sx={{
            width: {
              xs: "100%",
              sm: "90%",
              md: "80%",
              lg: "80%",
              xl: "80%",
            },
            margin: "10px auto",
          }}
        >
          <div className={styles.wrapper}>
            <Box
              sx={{
                // border: "1px solid #ccc",
                borderRadius: "4px",
                // padding: "10px",
                width: "100%", // Full width
                minHeight: "250px", // Adjust based on design
                "& .ql-editor": {
                  minHeight: "200px", // Ensures text input space
                },
                // backgroundColor: "#F5F5F5",
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
                  {title && title}
                </Typography>
                {/* <Typography variant="caption">{blogDate}</Typography> */}
                <CategoryContainer
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "start",
                    // minHeight: "100px",
                  }}
                >
                  {selectedCategories &&
                    selectedCategories.map((category, index) => (
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
        </CartoonCard>
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
            onClick={handleBlogSubmit}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "update Blog"
            )}
          </Button>
        </Box>
      </div>
      {/* <PopupDialog /> */}
      <DialogBox
        open={open}
        handleClose={handleClose}
        handlePasswordSubmit={handlePasswordSubmit}
        title="Enter admin Password"
      />
      <div>
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={snackHandleClose}
        >
          <Alert
            onClose={snackHandleClose}
            severity="info"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackContent}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default EditBlog;
