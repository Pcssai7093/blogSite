import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const workExperiences = [
  {
    title: "Software Developer",
    company: "Tech Solutions Ltd.",
    duration: "Jan 2020 - Present",
    description:
      "Developed and maintained web applications using React and Node.js.",
  },
  {
    title: "Web Developer",
    company: "Creative Agency",
    duration: "Jun 2018 - Dec 2019",
    description: "Worked on client projects to deliver scalable web solutions.",
  },
  // Add more experiences as needed
];

const WorkCard = () => {
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
        {"Work".split("").map((letter, index) => (
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
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
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
                <Typography variant="body2">{work.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WorkCard;
