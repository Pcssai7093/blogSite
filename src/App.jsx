import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AddBlog from "./pages/AddBlog/AddBlog";
import Navbar from "./pages/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import HeroBlogSection from "./components/BlogSection/HeroBlogSection";
import WorkCard from "./components/WorkSection/WorkSection";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import BlogPage from "./components/BlogSection/BlogPage";
import ViewBlog from "./pages/ViewBlog/ViewBlog";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: "'Comic Sans MS', 'Fredoka One', cursive",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: "url('../../src/assets/2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat", // Ensures the background doesn’t repeat
          minHeight: "100vh",
          width: "100%",
          backgroundAttachment: "fixed",
          // overflowX: "hidden",
        }}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
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
          </Routes>
        </BrowserRouter>
        {/* <Navbar /> */}

        {/* navbar will be out of router and the page content changes */}
        {/* <div>
        <AddBlog />
      </div> */}
      </Box>
    </ThemeProvider>
  );
}

export default App;
