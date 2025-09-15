"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  MenuBook as MenuBookIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // ✅ Firebase Auth state
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <AppBar position="static" sx={{ background: "linear-gradient(to right, #2563eb, #1d4ed8)" }}>
        <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "8px" }}>
            <Box sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", p: 1, borderRadius: 1, display: "flex", alignItems: "center" }}>
              <MenuBookIcon sx={{ color: "white", fontSize: 24 }} />
            </Box>
            <Typography variant="h5" component="span" sx={{ fontWeight: "bold", color: "white" }}>
              LearnHub
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Link href="/courses" style={{ textDecoration: "none" }}><Button sx={{ color: "white" }}>Courses</Button></Link>
              <Link href="/my-learning" style={{ textDecoration: "none" }}><Button sx={{ color: "white" }}>My Learning</Button></Link>
              <Link href="/instructor" style={{ textDecoration: "none" }}><Button sx={{ color: "white" }}>Teach</Button></Link>

              {/* Auth-based links */}
              {!user ? (
                <>
                  <Link href="/auth/register" style={{ textDecoration: "none" }}><Button sx={{ color: "white" }}>Register</Button></Link>
                  <Link href="/auth/login" style={{ textDecoration: "none" }}><Button sx={{ color: "white" }}>Login</Button></Link>
                </>
              ) : (
                <>
                  <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                    <Avatar
                      src={user.photoURL || ""}
                      alt={user.displayName || "User"}
                      sx={{ width: 40, height: 40, border: "2px solid rgba(255, 255, 255, 0.2)", bgcolor: "#3b82f6" }}
                    >
                      {user.displayName ? user.displayName[0] : user.email?.[0].toUpperCase()}
                    </Avatar>
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileMenuClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
                      <Typography variant="body2" fontWeight="medium">{user.displayName || "User"}</Typography>
                      <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleProfileMenuClose}>
                      <Link href="/profile" style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                        <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>Profile
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleProfileMenuClose}>
                      <Link href="/settings" style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                        <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>Settings
                      </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                      <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: "error.main" }} /></ListItemIcon>Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          )}

          {/* Mobile Menu Toggle */}
          {isMobile && <IconButton onClick={toggleMobileMenu} sx={{ color: "white" }}>{isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}</IconButton>}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="top" open={isMobileMenuOpen && isMobile} onClose={() => setIsMobileMenuOpen(false)}
        sx={{ "& .MuiDrawer-paper": { background: "linear-gradient(to right, #2563eb, #1d4ed8)", color: "white", mt: "64px" } }}>
        <List sx={{ py: 2 }}>
          <ListItem disablePadding><ListItemButton><Link href="/courses" style={{ textDecoration: "none", color: "inherit", width: "100%" }}><ListItemText primary="Courses" /></Link></ListItemButton></ListItem>
          <ListItem disablePadding><ListItemButton><Link href="/my-learning" style={{ textDecoration: "none", color: "inherit", width: "100%" }}><ListItemText primary="My Learning" /></Link></ListItemButton></ListItem>
          <ListItem disablePadding><ListItemButton><Link href="/instructor" style={{ textDecoration: "none", color: "inherit", width: "100%" }}><ListItemText primary="Teach" /></Link></ListItemButton></ListItem>

          <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.2)" }} />

          {!user ? (
            <>
              <ListItem disablePadding><ListItemButton><Link href="/auth/register" style={{ textDecoration: "none", color: "inherit", width: "100%" }}><ListItemText primary="Register" /></Link></ListItemButton></ListItem>
              <ListItem disablePadding><ListItemButton><Link href="/auth/login" style={{ textDecoration: "none", color: "inherit", width: "100%" }}><ListItemText primary="Login" /></Link></ListItemButton></ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding><ListItemButton><Link href="/profile" style={{ textDecoration: "none", color: "inherit", width: "100%" }}><ListItemIcon><PersonIcon sx={{ color: "white" }} /></ListItemIcon><ListItemText primary="Profile" /></Link></ListItemButton></ListItem>
              <ListItem disablePadding><ListItemButton><Link href="/settings" style={{ textDecoration: "none", color: "inherit", width: "100%" }}><ListItemIcon><SettingsIcon sx={{ color: "white" }} /></ListItemIcon><ListItemText primary="Settings" /></Link></ListItemButton></ListItem>
              <ListItem disablePadding><ListItemButton onClick={handleLogout}><ListItemIcon><LogoutIcon sx={{ color: "#fca5a5" }} /></ListItemIcon><ListItemText primary="Logout" sx={{ color: "#fca5a5" }} /></ListItemButton></ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
