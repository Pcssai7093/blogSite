import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Container,
  Grid,
   Card,
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

const StyledButton = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5, 4),
  // borderRadius: 0,
  width:"250px",
  textTransform: "none",
  fontSize: "0.75rem",
  transition: "transform 0.2s ease, background 0.3s ease",

  // 🟢 Glassy background with transparency
  // background: "rgba(0, 140, 255, 0.822)", // Semi-transparent blue
  backdropFilter: "blur(10px)", // Blur effect
  WebkitBackdropFilter: "blur(10px)",

  // 🟢 Subtle frosted glass border

  // 🟢 Soft glow effect
  // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",

  transform: "translateY(-4px)",
  // boxShadow: "3px 3px 0px rgba(255, 255, 255, 0.589)",
  


  "&:hover": {
    transform: "translateY(-4px)",
  // boxShadow: "3px 3px 0px rgba(255, 255, 255, 0.758)",
  },

  cursor:"pointer",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
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
          md={4}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "center",
            order: { xs: 1, md: 1 },
          }}
        >
          <motion.div
            animate={
              {
                // Circular jiggle along x and y axes
                // x: [0, 2, 0, -2, 0], // Horizontal movement
                // y: [0, -2, 0, 2, 0], // Vertical movement
                // // Zoom In & Zoom Out
                // scale: [1, 1.1, 1], // Zoom in to 1.5x, then back to normal
              }
            }
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
                sx={{ border: "5px solid grey", filter: "grayscale(100%)" }}
              />
            </Box>
          </motion.div>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
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
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #b3aeae 30%, #000000 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "0.5px black",
                fontFamily: "sketch2",
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
              Full-Stack Web & Mobile Developer Experienced in building scalable microservices, React.js web applications, and android
apps with Flutter. Skilled in Node.js, Express.js, MongoDB, SQL, and Elastic DB for robust backend systems, with expertise
in Docker, Firebase, and Azure for deployment and cloud solutions. Passionate about architecting efficient systems through
clean, performant code for web and mobile platforms.
            </Typography>
            <motion.div>
              <StyledButton
                variant="contained"
                // color="primary"
                startIcon={<FiDownload />}
                onClick={handleDownload}
                aria-label="Download Resume"
                sx={{
                  backgroundColor: "grey",
                  border: "1.5px solid black",
                 margin: {
                      xs: "0 auto",       // center on extra-small screens
                      sm: "0 auto",       // center on small
                      md: "0",            // align left on medium and above
                    },
                  
                }} 
              >
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    WebkitBackgroundClip: "text",
                    // WebkitTextFillColor: "transparent",
                    // WebkitTextStroke: "0.5px black",
                    // fontFamily: "sketch2",
                    color: "white",
                  }}
                >
                  Download Resume
                </Typography>
              </StyledButton>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Hero;
