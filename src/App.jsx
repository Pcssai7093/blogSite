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
import { ThemeProvider } from "./context/ThemeContext";
import Index from ".";

const theme = createTheme({
  typography: {
    fontFamily: "monospace",
  },
});

function App() {
  const style = document.createElement("style");

  style.textContent = `
  @font-face {
    font-family: sketch1;
    src: url("${
      import.meta.env.BASE_URL
    }fonts/sketch-book-font/SketchBook-B5pB.ttf")
      format("truetype");
  }

  @font-face {
    font-family: sketch2;
    src: url("${import.meta.env.BASE_URL}fonts/madane-font/Madane-lxMry.ttf")
      format("truetype");
  }
`;
  document.head.appendChild(style);

  return (
    <ThemeProvider>
      <Index />
    </ThemeProvider>
  );
}

export default App;
