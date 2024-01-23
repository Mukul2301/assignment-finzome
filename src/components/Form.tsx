import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Checkbox,
  Radio,
  FormControlLabel,
  Button,
  FormLabel,
  RadioGroup,
  Paper,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import "./styles/mainForm.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  contact: yup.string().required("Contact is required"),
  gender: yup.string().required("Gender is required").oneOf(["Male", "Female"]),
  dob: yup.string().required("Date of Birth is required"),
  isWeekday: yup.boolean().required(),
});

interface FormData {
  name: string;
  email: string;
  contact: string;
  isWeekday: boolean;
  gender: string;
  dob: string;
}

interface FormProps {
  onSubmit: (formData: FormData) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;

    if (type === "checkbox") {
      setValue(name as keyof FormData, checked);
    } else if (type === "radio" && checked) {
      setValue(name as keyof FormData, value);
    } else {
      setValue(name as keyof FormData, value);
    }
  };

  const submitHandler = (data: FormData) => {
    onSubmit(data);
    toast.success("Record Saved");
    reset();
    setValue("isWeekday", false);
  };

  return (
    <div className="formComponent" style={{ margin: 0, padding: 0 }}>
      <Paper className="paperComponent">
        <form className="mainForm" onSubmit={handleSubmit(submitHandler)}>
          <Grid container spacing={2}>
            <h2>Registration Form</h2>
            <TextField
              fullWidth
              label="Name"
              {...register("name")}
              margin="normal"
              size="small"
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              {...register("email")}
              margin="normal"
              size="small"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Contact"
              {...register("contact")}
              margin="normal"
              type="number"
              size="small"
              fullWidth
              error={!!errors.contact}
              helperText={errors.contact?.message}
            />
            <Grid item xs={12} sm={6}>
              <RadioGroup
                name="gender"
                defaultValue=""
                onChange={handleInputChange}
              >
                <FormLabel>Gender</FormLabel>
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Date of Birth</FormLabel>
              <TextField
                {...register("dob")}
                fullWidth
                type="date"
                onChange={handleInputChange}
                size="small"
                error={!!errors.dob}
                helperText={errors.dob?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("isWeekday")}
                    defaultChecked={false}
                    onChange={handleInputChange}
                  />
                }
                label="Weekday"
              />
              {errors.isWeekday && <p className="error">Weekday is required</p>}
            </Grid>
            <Grid xs={12}>
              <div className="submitBtn">
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default Form;
