import React from "react";
import { Box, TextField, Grid, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { shortUrl, saveToLocalStorage } from "../../lib/library";
// form validation schema (yup)
const validationSchema = yup.object({
  url: yup
    .string("Enter a long url to make it short")
    .matches(
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
      "Enter correct url!"
    )
    .min(10, "Min length 10")
    .required("First Name is required"),
});

export function ShortnerForm() {
  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const shortData = await shortUrl(values.url);
      saveToLocalStorage(shortData);
      alert("Short URL saved to local storage!");
    },
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "65vh",
        minWidth: "70vw",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Grid item className="form__inputs">
            <TextField
              fullWidth
              id="url"
              name="url"
              label="Enter a long URL here!"
              type="text"
              value={formik.values.url}
              onChange={formik.handleChange}
              error={formik.touched.url && Boolean(formik.errors.url)}
              helperText={formik.touched.url && formik.errors.url}
            />
          </Grid>
          <Grid item className="form__inputs">
            <Button color="primary" variant="contained" fullWidth type="submit">
              Make Short URL
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
