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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import EditBlog from "./pages/EditBlog/EditBlog";

const theme = createTheme({
  typography: {
    fontFamily: "monospace",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
      // sx={{
      //   backgroundImage: `url('${import.meta.env.BASE_URL}2.png')`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat", // Ensures the background doesn’t repeat
      //   minHeight: "100vh",
      //   width: "100%",
      //   backgroundAttachment: "fixed",
      //   // overflowX: "hidden",
      // }}
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
        </HashRouter>
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
