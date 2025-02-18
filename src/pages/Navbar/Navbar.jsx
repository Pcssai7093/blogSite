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
const navItems = ["Work", "Blog"];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  function handleNavButtonClick(e) {
    let buttonText = e.target.textContent.toLowerCase();
    console.log(buttonText);
    if (buttonText == "work") {
      console.log("in work");
      navigate("/work");
    } else if (buttonText == "blog") {
      navigate("/blog");
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
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
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
          position: "sticky",
          top: 0,
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
            sx={{ mr: 2, display: { sm: "none" }, color: "#2196F3" }}
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
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
                style={{ display: "inline-block" }}
              >
                <Button
                  key={item}
                  onClick={handleNavButtonClick}
                  sx={{
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 700,
                    background:
                      "linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "scale(2)",
                    },
                  }}
                >
                  {item}
                </Button>
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
