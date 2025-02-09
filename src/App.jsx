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

function App() {
  return (
    <>
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
        </Routes>
      </BrowserRouter>
      {/* <Navbar /> */}

      {/* navbar will be out of router and the page content changes */}
      {/* <div>
        <AddBlog />
      </div> */}
    </>
  );
}

export default App;
