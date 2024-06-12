"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Container, Grid, TextField, Typography } from "@mui/material";

const CreateLabsPage = () => {
  const [formData, setFormData] = useState({
    bloodSugar: "",
    cholesterol: "",
    LDL: "",
    HDL: "",
    triglyceride: "",
    findings: "",
    labName: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };
  return (
    <Container maxWidth="sm" component={`form`} onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom>
        Lab Data Form
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="bloodSugar"
            label="Blood Sugar"
            type="number"
            value={formData.bloodSugar}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="cholesterol"
            label="Cholesterol"
            type="number"
            value={formData.cholesterol}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="LDL"
            label="LDL"
            type="number"
            value={formData.LDL}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="HDL"
            label="HDL"
            type="number"
            value={formData.HDL}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="triglyceride"
            label="Triglyceride"
            type="number"
            value={formData.triglyceride}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="findings"
            label="Findings"
            type="text"
            value={formData.findings}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="labName"
            label="Lab Name"
            type="text"
            value={formData.labName}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateLabsPage;