import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { LinkedIn, GitHub, Instagram } from "@mui/icons-material";
import Logo from "../assets/images/Logo-1.png";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "60px",
        px: { xs: 2, md: 6 },
        py: 2, // 🔥 reduced height
        backgroundColor: "#FFF3F4", // same color
        borderTop: "1px solid #f0d6d8",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {/* Logo */}
        <Box
          component="img"
          src={Logo}
          alt="logo"
          sx={{ width: "120px" }} // smaller
        />

        {/* Social Icons */}
        <Stack direction="row" spacing={1}>
          <IconButton
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            size="small"
            sx={{ color: "#555", "&:hover": { color: "#0A66C2" } }}
          >
            <LinkedIn fontSize="small" />
          </IconButton>

          <IconButton
            href="https://github.com/your-profile"
            target="_blank"
            size="small"
            sx={{ color: "#555", "&:hover": { color: "#000" } }}
          >
            <GitHub fontSize="small" />
          </IconButton>

          <IconButton
            href="https://instagram.com/your-profile"
            target="_blank"
            size="small"
            sx={{ color: "#555", "&:hover": { color: "#E1306C" } }}
          >
            <Instagram fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {/* Bottom Text */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          mt: 1,
          fontSize: "12px",
          color: "#777",
        }}
      >
        © {new Date().getFullYear()} Exercise. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;