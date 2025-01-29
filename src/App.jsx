import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AddBlog from "./pages/AddBlog/AddBlog";
import Navbar from "./pages/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      {/* <Navbar /> */}
      {/* navbar will be out of router and the page content changes */}
      <div>
        <AddBlog />
      </div>
    </>
  );
}

export default App;
