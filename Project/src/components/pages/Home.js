import React from "react";
import Layout from "../Layout/Layout";
import { ShortnerForm } from "../helper/ShortnerForm";
import { Typography } from "@mui/material";
export default function Home() {
  return (
    <>
      <Layout>
        <Typography variant="h4" component="div" textAlign="center" pt="100px">
          URL Shortner Aplication
        </Typography>
        <ShortnerForm />
      </Layout>
    </>
  );
}
