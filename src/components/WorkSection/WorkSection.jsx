import React, { useState, useEffect } from "react";
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
import {
  collection,
  addDoc,
  getDocs,
  doc,
  orderBy,
  limit,
  query,
} from "firebase/firestore";
import fireDb from "../../firebaseInit";

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
  const [workData, setWorkData] = useState([]);
  useEffect(() => {
    console.log("hello");

    const q = query(collection(fireDb, "workExperiences"));

    getDocs(q)
      .then((res) => {
        const workData = res.docs.map((doc) => ({
          id: doc.id, // Firestore document ID
          ...doc.data(), // Spread document data
        }));
        setWorkData(workData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        id="work_section"
        sx={{
          fontWeight: 700,
          background: "linear-gradient(45deg, #060505 30%, #000000 90%)",
          WebkitBackgroundClip: "text",
          // display: "inline-block", // Ensures gradient applies correctly
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: "0.5px black",
          fontFamily: "sketch2",
          letterSpacing: "0.02rem",
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
              background: "linear-gradient(45deg, #fefefe 30%, #000000 90%)",
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
              background: "linear-gradient(45deg, #fefefe 30%, #000000 90%)",
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
        {workData &&
          workData.map((work, index) => (
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
                      {work.role}
                    </Typography>
                    <Typography color="textSecondary">
                      {work.company}
                    </Typography>
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
                            <ListItemIcon
                              sx={{
                                minWidth: "30px",
                                filter: "grayscale(100%)",
                              }}
                            >
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
