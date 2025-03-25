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
import { Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import EditBlog from "./pages/EditBlog/EditBlog";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useThemeContext } from "./context/ThemeContext";

function Index() {
  const { mode, toggleColorMode } = useThemeContext();
  return (
    <div>
      <Box
        sx={
          {
            // backgroundColor: "black",
            // overflowX: "hidden",
          }
        }
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
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              toggleColorMode();
            }}
            sx={{
              position: "fixed",
              bottom: 16, // Adjust distance from bottom
              right: 16, // Adjust distance from right
              zIndex: 999, // Ensures it stays above other content
              backgroundColor: "grey",
            }}
          >
            {/* <AddIcon /> */}
            {mode == "dark" ? <NightsStayIcon /> : <WbSunnyIcon />}
          </Fab>
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
