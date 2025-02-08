import React from "react";
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

const HeroBlogSection = () => {
  const chipColors = ["primary", "secondary", "success"];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {"Recent".split("").map((letter, index) => (
          <Box
            key={index}
            component="span"
            sx={{
              display: "inline-flex",
              transition: "transform 0.3s ease",
              willChange: "transform", // Helps with rendering
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.5)",
              },
            }}
          >
            {letter}
          </Box>
        ))}
        <Box sx={{ display: "inline-flex", width: "5px" }} />
        {"Blogs".split("").map((letter, index) => (
          <Box
            key={index}
            component="span"
            sx={{
              display: "inline-flex",
              transition: "transform 0.3s ease",
              willChange: "transform", // Helps with rendering
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.5)",
              },
            }}
          >
            {letter}
          </Box>
        ))}
      </Typography>
      <Grid container spacing={3}>
        {workExperiences.map((work, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Slide>
              <motion.div
                animate={{
                  x: [0, 5, -5, 3, -3, 0], // Smooth left-right movement
                  y: [0, -3, 3, -4, 4, 0], // Smooth up-down movement
                  rotate: [0, 2, -2, 1.5, -1.5, 0], // Slight rotation for a wavy effect// Small rotations
                }}
                transition={{
                  duration: 3, // Speed of movement
                  repeat: Infinity, // Infinite loop
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CategoryContainer
                    sx={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignItems: "start",
                      minHeight: "100px",
                    }}
                  >
                    {work.categories.map((category, index) => (
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
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {work.title}
                    </Typography>
                    <Typography color="textSecondary">
                      {work.company}
                    </Typography>
                    <Box mt={1} mb={2}>
                      <Typography variant="body2" color="textSecondary">
                        {work.date}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{work.description}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Slide>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HeroBlogSection;
