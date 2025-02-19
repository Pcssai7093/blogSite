import React from "react";
import { styled } from "@mui/system";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";

const workExperiences = [
  {
    title: "Software Developer",
    company: "Tech Solutions Ltd.",
    duration: "Jan 2020 - Present",
    description: [
      "Designed and implemented scalable web applications using React and Next.js.",
      "Developed and optimized GraphQL APIs for efficient data fetching.",
      "Integrated Firebase for authentication, real-time data, and cloud storage.",
      "Collaborated with cross-functional teams to deliver high-quality software solutions.",
      "Enhanced application performance by implementing advanced state management techniques.",
    ],
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "GraphQL",
      "Firebase",
      "REST APIs",
      "Flutter",
      "Dart",
      "State Management",
    ],
  },
  // Add more experiences as needed
];

const CategoryContainer = styled(Box)({
  display: "flex",
  gap: 4,
  flexWrap: "wrap",
  justifyContent: "left",
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

const WorkCard = () => {
  const chipColors = [
    "#FFAA00", // Deep Orange-Yellow
    "#007ACC", // Bright Blue
    "#28A745", // Dark Green
    "#D32F2F", // Strong Red
    "#6A1B9A", // Deep Purple
    "#FF5722", // Vivid Orange
    "#00897B", // Teal Green
    "#1976D2", // Dark Blue
    "#C2185B", // Dark Pink
    "#795548", // Warm Brown
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          background: "linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {"Work".split("").map((letter, index) => (
          <Box
            key={index}
            component="span"
            sx={{
              display: "inline-flex",
              transition: "transform 0.3s ease",
              willChange: "transform", // Helps with rendering
              background: "linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "0.3px black", // Adds a thin black outline
              "&:hover": {
                transform: "scale(1.5)",
              },
            }}
          >
            {letter}
          </Box>
        ))}
        <Box sx={{ display: "inline-flex", width: "5px" }} />
        {"Experience".split("").map((letter, index) => (
          <Box
            key={index}
            component="span"
            sx={{
              display: "inline-flex",
              transition: "transform 0.3s ease",
              willChange: "transform", // Helps with rendering
              background: "linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "0.3px black",
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
          <Grid item key={index} xs={12} sm={12} md={12}>
            <CartoonCard>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    {work.title}
                  </Typography>
                  <Typography color="textSecondary">{work.company}</Typography>
                  <Box mt={1} mb={2}>
                    <Typography variant="body2" color="textSecondary">
                      {work.duration}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    <List>
                      {work.description.map((point, index) => (
                        <ListItem
                          key={index}
                          sx={{ display: "list-item", pl: 2 }}
                        >
                          <ListItemIcon sx={{ minWidth: "30px" }}>
                            📌
                          </ListItemIcon>
                          {point}
                        </ListItem>
                      ))}
                    </List>
                  </Typography>
                </CardContent>
                <CategoryContainer
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "start",
                    // minHeight: "100px",
                  }}
                >
                  {work.skills.map((category, index) => (
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
              </Card>
            </CartoonCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WorkCard;
