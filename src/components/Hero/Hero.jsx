import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Container,
  Grid,
  styled,
} from "@mui/material";
import Typing from "react-typing-effect";
import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  orderBy,
  limit,
  query,
} from "firebase/firestore";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 250,
  height: 250,
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: theme.shadows[4],
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
  fontSize: "0.75rem",
  transition: "transform 0.2s ease, background 0.3s ease",

  // 🟢 Glassy background with transparency
  background: "rgba(0, 140, 255, 0.822)", // Semi-transparent blue
  backdropFilter: "blur(10px)", // Blur effect
  WebkitBackdropFilter: "blur(10px)",

  // 🟢 Subtle frosted glass border
  border: "1px solid rgba(255, 255, 255, 0.3)",

  // 🟢 Soft glow effect
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",

  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

const Hero = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "./Resume_2024.pdf";
    link.download = "Resume_ChandraSekhar.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        // marginTop: "5vh",
        py: 1,
        display: "flex",
        alignItems: "center",
        // paddingLeft: "10vw",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            alignItems: "center",
            order: { xs: 1, md: 2 },
          }}
        >
          <motion.div
            animate={{
              // Circular jiggle along x and y axes
              x: [0, 5, 0, -5, 0], // Horizontal movement
              y: [0, -5, 0, 5, 0], // Vertical movement

              // Zoom In & Zoom Out
              scale: [1, 1.1, 1], // Zoom in to 1.5x, then back to normal
            }}
            transition={{
              duration: 2, // Controls the speed of the movement
              repeat: Infinity, // Infinite loop
              repeatType: "loop", // Loop the animation
              ease: "easeInOut", // Smooth transition
            }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <StyledAvatar
                alt="John Doe Profile Picture"
                src={`${import.meta.env.BASE_URL}profile_army_crop2.JPG`}
                loading="lazy"
              />
            </Box>
          </motion.div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            order: { xs: 2, md: 1 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "0.5px black",
              }}
            >
              <Typing
                text={["Chandra Sekhar"]}
                speed={100}
                eraseDelay={3000}
                cursor={
                  <span
                    style={{
                      background:
                        "linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      WebkitTextStroke: "0.3px black",
                    }}
                  >
                    |
                  </span>
                }
              />
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 4,
                lineHeight: 1.8,
                fontSize: { xs: "1rem", sm: "1rem", md: "1rem" },
              }}
            >
              A passionate Full Stack Developer with expertise in React,
              Node.js, and Cloud Technologies. I love creating innovative
              solutions and bringing ideas to life through code.
            </Typography>
            <motion.div
              animate={{
                // Circular jiggle along x and y axes
                x: [0, 5, 0, -5, 0], // Horizontal movement
                y: [0, -5, 0, 5, 0], // Vertical movement

                // Zoom In & Zoom Out
              }}
              transition={{
                duration: 2, // Controls the speed of the movement
                repeat: Infinity, // Infinite loop
                repeatType: "loop", // Loop the animation
                ease: "easeInOut", // Smooth transition
              }}
            >
              <StyledButton
                variant="contained"
                color="primary"
                startIcon={<FiDownload />}
                onClick={handleDownload}
                aria-label="Download Resume"
              >
                Download Resume
              </StyledButton>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Hero;
