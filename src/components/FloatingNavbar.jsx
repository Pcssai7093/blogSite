import React from "react";
import { Box, IconButton, useTheme ,alpha, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { Rotate } from "react-awesome-reveal";
import useSectionObserver from "./useSectionObserver";

function FloatingNavbar() {
  const navItems = ["About", "Work", "Blogs"];
  const navItems2 = ["About"];
  const navItems3 = ["Work", "Blogs"];
  const theme = useTheme();

  const sectionIds = ["about_section", "work_section", "blogs_section"];

  const activeSection  = useSectionObserver(sectionIds);

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const realActiveSection = isXs ? "all" : activeSection;

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  function handleNavButtonClick(value) {
    console.log("bva")
    let newValue = value.toLowerCase()
    console.log(newValue);
    console.log("bva")
    // if (!value) {
    //   buttonText = new String(value).toLowerCase();
    // }

    if (newValue.includes("work")) {
      console.log("in work");
      scrollToSection("work_section");
    } else if (newValue.includes("blog")) {
      scrollToSection("blogs_section");
    } else if (newValue.includes("about")) {
      scrollToSection("about_section");
    }
  }

  function isActive(item){
    if(realActiveSection == "all"){
      return true;
    }
    let itemString = new String(item)
    itemString = itemString.toLowerCase()
    if(activeSection.includes(itemString)){
      return true
    }
    return false;
  }

  return (
    <div>
    
      <Box
        sx={{
          position: "fixed",
          // top: "10px", // Center vertically
          // left: "40%", // Stick to the left edge
          // transform: "rotate(-90deg)", // Rotate and rep--osition
          // transformOrigin: "top left", // Rotate around top-left corner
          width:"100%",
          zIndex: 999,
          display: "flex",
          justifyContent:"center",
          paddingTop:"5px",
          // backgroundColor:theme.palette.background.anti,
          // padding:"4px 0px",
          // borderBottom:`5px double ${theme.palette.background.anti}`


          ...((activeSection!='about_section') || (realActiveSection == "all")?
            {
              backgroundColor:alpha(theme.palette.background.anti, 1),
            }:
            {

            }
          )
        }}
      >
        <Box
        sx={{
          // backgroundColor:theme.palette.background.anti,
          // color:theme.palette.background.default,
          display: "flex",
          gap: "20px",
          justifyContent:"center",
          padding:"8px 20px",
          // width:"50%",

          // opacity:"0.5",
          // border:`2px solid ${theme.palette.background.anti}`,
          borderRadius:"5px",
          ...((activeSection!='about_section') || (realActiveSection == "all")?
            {
              color:theme.palette.background.default,
            }:
            {
              color:theme.palette.background.anti,
            }
          )
        }}
        >
          {navItems.map((item) => (
          <Box 
          onClick={()=>{handleNavButtonClick(item)}}
          sx={
          {
            cursor: "pointer",fontSize:"20px", 
            transform: "translateY(-2px)",
            padding:"5px",
            ...(isActive(item)?
            { boxShadow: `4px 4px 0px ${((activeSection!='about_section') || (realActiveSection == "all")) ? theme.palette.background.default : theme.palette.background.anti}`,
            backgroundColor: "grey",}:
            {})
          }
        }>{item}</Box>
        ))}

        </Box>
      </Box>
    </div>
  );
}

export default FloatingNavbar;
