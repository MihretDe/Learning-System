"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
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
} from "@mui/material"
import {
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  MenuBook as MenuBookIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material"

function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  // Mock user data - replace with actual auth context
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/diverse-user-avatars.png",
  }

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...")
    setAnchorEl(null)
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right, #2563eb, #1d4ed8)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid rgba(59, 130, 246, 0.2)",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
          {/* Logo */}
          <Link
            href="/"
            style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                p: 1,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
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
              <Link href="/courses" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontWeight: 500,
                    "&:hover": {
                      color: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Courses
                </Button>
              </Link>
              <Link href="/my-learning" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontWeight: 500,
                    "&:hover": {
                      color: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  My Learning
                </Button>
              </Link>

              {/* User Profile */}
              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{
                  p: 0,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Avatar
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  sx={{
                    width: 40,
                    height: 40,
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    bgcolor: "#3b82f6",
                  }}
                >
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{ mt: 1 }}
              >
                <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
                  <Typography variant="body2" fontWeight="medium">
                    {user.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleProfileMenuClose}>
                  <Link
                    href="/profile"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleProfileMenuClose}>
                  <Link
                    href="/settings"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              onClick={toggleMobileMenu}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="top"
        open={isMobileMenuOpen && isMobile}
        onClose={() => setIsMobileMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            background: "linear-gradient(to right, #2563eb, #1d4ed8)",
            color: "white",
            mt: "64px", // Height of AppBar
          },
        }}
      >
        <List sx={{ py: 2 }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/courses" style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                <ListItemText primary="Courses" />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/my-learning" style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                <ListItemText primary="My Learning" />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/instructor" style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                <ListItemText primary="Teach" />
              </Link>
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.2)" }} />

          <ListItem sx={{ px: 2, py: 1 }}>
            <Avatar
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              sx={{
                width: 32,
                height: 32,
                mr: 2,
                border: "1px solid rgba(255, 255, 255, 0.2)",
                bgcolor: "#3b82f6",
              }}
            >
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {user.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                {user.email}
              </Typography>
            </Box>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsMobileMenuOpen(false)}>
              <ListItemIcon>
                <PersonIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <Link href="/profile" style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                <ListItemText primary="Profile" />
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsMobileMenuOpen(false)}>
              <ListItemIcon>
                <SettingsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <Link href="/settings" style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                <ListItemText primary="Settings" />
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#fca5a5" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: "#fca5a5" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default Navbar
