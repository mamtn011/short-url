import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Box
        sx={{ textAlign: "center", bgcolor: "#090909", color: "#f1f1f1", p: 3 }}
      >
        <Typography variant="p">Al Mobin &copy; All Rights Reserved</Typography>
      </Box>
    </>
  );
}
