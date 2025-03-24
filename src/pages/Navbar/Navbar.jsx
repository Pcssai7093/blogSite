import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const drawerWidth = 200;
const navItems = ["Home", "Work", "Blog"];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const scrollToWorkSection = () => {
    document
      .getElementById("work_section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  function handleNavButtonClick(e) {
    let buttonText = e?.target?.textContent?.toLowerCase();
    if (!buttonText) {
      buttonText = e.toLowerCase();
    }
    console.log(buttonText);
    if (buttonText == "work") {
      console.log("in work");
      navigate("/work");
      setTimeout(() => {
        scrollToWorkSection();
      }, 500);
      // navigate("/work");
    } else if (buttonText == "blog") {
      navigate("/blog");
    } else if (buttonText == "home") {
      navigate("/work");
    }
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Chandra Sekhar
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #b3aeae 30%, #000000 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "0.5px black",
              fontFamily: "sketch2",
            }}
          >
            <ListItem key={item} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => {
                  handleNavButtonClick(item);
                }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          </Typography>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          position: "sticky", // Stays at the top when scrolled past
          top: 0,
          left: 0,
          bgcolor: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "grey" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6 small"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontWeight: 700,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {/* Chandra Sekhar */}
          </Typography>
          <Box
            sx={{ display: { xs: "none", sm: "block" }, marginRight: "20px" }}
          >
            {navItems.map((item) => (
              <motion.div
                animate={{
                  scale: [1, 1.5, 1], // Zoom in to 1.2x, then back to normal
                }}
                transition={{
                  duration: 1 + Math.random() * 0.5, // Speed of zoom in/out
                  repeat: Infinity, // Infinite loop
                  repeatType: "reverse", // Smoothly zoom in & out
                  ease: "easeInOut",
                }}
                style={{ display: "inline-block", marginLeft: "10px" }}
              >
                <Typography
                  variant="h6 small"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", sm: "block" },
                    fontWeight: 700,
                  }}
                >
                  <Button
                    key={item}
                    onClick={handleNavButtonClick}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.2)",
                      },
                      background:
                        "linear-gradient(45deg, #fefefe 30%, #000000 90%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      // color: "black",
                    }}
                  >
                    {item}
                  </Button>
                </Typography>
              </motion.div>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
