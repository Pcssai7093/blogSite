import React, { useState, useEffect } from "react";
// just a comment
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { format } from "date-fns";
import { FaEye } from "react-icons/fa";
import PropTypes from "prop-types";
import { Slide } from "react-awesome-reveal";
import { motion } from "framer-motion";
import { IconButton } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { useNavigate } from "react-router-dom";
import fireDb from "../../firebaseInit";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  orderBy,
  limit,
  query,
} from "firebase/firestore";

const CategoryContainer = styled(Box)({
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  // marginTop: 16,
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
  // boxShadow: "8px 8px 0px #21A3F3",
  // border: "2px solid #21A3F3",
  padding: "16px",
  fontFamily: "'Comic Sans MS', 'Fredoka One', cursive",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  // "&:hover": {
  //   transform: "translateY(-4px)",
  //   boxShadow: "8px 8px 0px grey",
  // },
border: "1.5px solid black",
  transform: "translateY(-4px)",
  boxShadow: "8px 8px 0px grey",

  // background: "rgba(255, 255, 255, 0.4)", // Semi-transparent white
  backdropFilter: "blur(10px)", // Blur effect for glassy look
  WebkitBackdropFilter: "blur(10px)",

  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: -4,
    width: 50,
    height: 50,
    backgroundColor: theme.palette.background.paper, // match the outside background
    borderLeft: "1.5px solid black",
    borderBottom: "4.5px solid black",
    borderRight: "1.5px solid black",
    transform: "rotate(45deg)",
    transformOrigin: "top right",
    zIndex: 1,
  },
}));

const workExperiences = [
  {
    title: "Understanding React Fiber: How It Improves UI Performance",
    author: "John Doe",
    date: "Feb 5, 2024",
    description:
      "A deep dive into React Fiber, explaining its architecture, rendering improvements, and how it enhances UI responsiveness.",
    categories: ["Web Development", "React", "Performance"],
  },
  {
    title: "Introduction to Deno: The Secure JavaScript Runtime",
    author: "Jane Smith",
    date: "Jan 20, 2024",
    description:
      "Exploring Deno, the secure alternative to Node.js, with built-in TypeScript support and improved security features.",
    categories: ["JavaScript", "Deno", "Security"],
  },

  // Add more experiences as needed
];

const BlogPage = () => {
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
  const navigate = useNavigate();
  const [heroBlogs, setHeroBlogs] = useState([]);
  useEffect(() => {
    const q = query(collection(fireDb, "blogs"), orderBy("createdAt", "desc"));

    getDocs(q)
      .then((res) => {
        const blogData = res.docs.map((doc) => ({
          id: doc.id, // Firestore document ID
          ...doc.data(), // Spread document data
        }));
        console.log(blogData);
        setHeroBlogs(blogData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 700,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {"Blogs".split("").map((letter, index) => (
          <Box
            key={index}
            component="span"
            sx={{
              display: "inline-flex",
              transition: "transform 0.3s ease",
              willChange: "transform", // Helps with rendering
              background: "linear-gradient(45deg, #b3aeae 30%, #000000 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "0.5px black",
              "&:hover": {
                transform: "scale(1.5)",
              },
            }}
          >
            {letter}
          </Box>
        ))}
        <Box sx={{ display: "inline-flex", width: "5px" }} />
      </Typography>
      <Grid container spacing={3}>
        {heroBlogs &&
          heroBlogs.map((work, index) => (
            <Grid item key={index} xs={12} sm={12} md={12}>
              <Slide>
                <motion.div
                // animate={{
                //   x: [0, 5, -5, 3, -3, 0], // Smooth left-right movement
                //   y: [0, -3, 3, -4, 4, 0], // Smooth up-down movement
                //   rotate: [0, 2, -2, 1.5, -1.5, 0], // Slight rotation for a wavy effect// Small rotations
                // }}
                // transition={{
                //   duration: 3, // Speed of movement
                //   repeat: Infinity, // Infinite loop
                //   repeatType: "mirror",
                //   ease: "easeInOut",
                // }}
                >
                  <CartoonCard>
                    <Card
                      variant="outlined"
                      sx={{
                        height: "100%",
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          transform: "scale(1.01)",
                        },
                        backgroundColor: "transparent",
                        border: "none",
                        boxShadow: "none",
                      }}
                    >
                      <IconButton
                        onClick={() => navigate(`/blog/${work.id}`)}
                        aria-label="View Blog"
                      >
                        <LinkIcon />
                      </IconButton>
                      <CategoryContainer
                        sx={{
                          display: "flex",
                          flexDirection: "row-reverse",
                          alignItems: "start",
                          // minHeight: "100px",
                        }}
                      >
                        {work.BlogCategories.map((category, index) => (
                          <CategoryButton
                            key={category}
                            variant="outlined"
                            size="small"
                            sx={{ fontSize: "0.6rem" }}
                            color={chipColors[index % 3]}
                            bgColor={chipColors[index % 3]}
                          >
                            {category}
                          </CategoryButton>
                        ))}
                      </CategoryContainer>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {work.BlogTitle}
                        </Typography>
                        <Typography variant="body2" component="div">
                          {format(work.createdAt?.toDate?.(), "dd-MM-yyyy")}
                        </Typography>
                        <Typography color="textSecondary">
                          {work.company}
                        </Typography>
                        <Box mt={1} mb={2}>
                          <Typography variant="body2" color="textSecondary">
                            {work.date}
                          </Typography>
                        </Box>
                        <Typography variant="body2">
                          {(work.BlogContent.match(/<p>(.*?)<\/p>/) || [])[1]
                            ?.split(" ")
                            .slice(0, 25)
                            .join(" ") || ""}
                        </Typography>
                      </CardContent>
                    </Card>
                  </CartoonCard>
                </motion.div>
              </Slide>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default BlogPage;
