import { useState } from "react";
import "./App.css";
import AddBlog from "./pages/AddBlog/AddBlog";
import Navbar from "./pages/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import HeroBlogSection from "./components/BlogSection/HeroBlogSection";
import WorkCard from "./components/WorkSection/WorkSection";
import { Routes, BrowserRouter, Route, HashRouter } from "react-router-dom";
import BlogPage from "./components/BlogSection/BlogPage";
import ViewBlog from "./pages/ViewBlog/ViewBlog";
import { Box,IconButton } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import EditBlog from "./pages/EditBlog/EditBlog";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useThemeContext } from "./context/ThemeContext";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles';

function Index() {
  const { mode, toggleColorMode } = useThemeContext();
  const theme = useTheme();
  return (
    <div>
      <Box
         sx={{
          transition: 'background 0.6s ease-in-out', // Smooth transition
          backgroundColor: theme.palette.background.default,
        }}
        
      >
        <HashRouter basename="/">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <br />
                  {/* <BlogCard /> */}
                  <HeroBlogSection />
                  <WorkCard />
                </>
              }
            />
            <Route
              path="/work"
              element={
                <>
                  <Hero />
                  <br />
                  {/* <BlogCard /> */}
                  <HeroBlogSection />
                  <WorkCard />
                </>
              }
            />
            <Route
              path="/blog"
              element={
                <>
                  <BlogPage />
                </>
              }
            />
            <Route
              path="/add-blog"
              element={
                <>
                  <AddBlog />
                </>
              }
            />
            <Route
              path="/blog/:bId"
              element={
                <>
                  <ViewBlog />
                </>
              }
            />
            <Route
              path="/edit-blog/:bId"
              element={
                <>
                  <EditBlog />
                </>
              }
            />
          </Routes>
          <Box
            sx={{
              position: "fixed",
              bottom: 16, // Adjust distance from bottom
              right: 16, // Adjust distance from right
              zIndex: 999, // Ensures it stays above other content
              // backgroundColor: "grey",
            }}
          >
            <Box
              sx={{
                display: "inline-block",
                backgroundColor: "grey",
                paddingRight: "10px",
                position: "relative",
                left: "10px",
                borderRadius:"10px 0px 0px 10px"
              }}
            >
              <IconButton
                // color="primary"
                component="a"
                href="https://www.linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener"
                sx={{
                  bgColor: "transparent",
                }}
              >
                <LinkedInIcon />
              </IconButton>

              <IconButton
                // color="primary"
                component="a"
                href="https://www.linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener"
                sx={{
                  bgColor: "transparent",
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>

            <Fab
              color="primary"
              aria-label="add"
              onClick={() => {
                toggleColorMode();
              }}
              sx={{
                position: "relative",
                backgroundColor: "grey",
              }}
            >
              {mode == "dark" ? <NightsStayIcon /> : <WbSunnyIcon />}
            </Fab>
          </Box>
        </HashRouter>
        {/* <Navbar /> */}

        {/* navbar will be out of router and the page content changes */}
        {/* <div>
    <AddBlog />
  </div> */}
      </Box>
    </div>
  );
}

export default Index;
