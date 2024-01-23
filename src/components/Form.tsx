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
  const { register, handleSubmit, setValue, reset } = useForm<FormData>();

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
    console.log(data);
    onSubmit(data);
    toast.success("Record Saved");
    reset();
  };

  return (
    <div className="formComponent">
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
              required
            />

            <TextField
              label="Email"
              {...register("email")}
              margin="normal"
              size="small"
              fullWidth
            />

            <TextField
              label="Contact"
              {...register("contact")}
              margin="normal"
              type="number"
              size="small"
              fullWidth
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
            </Grid>
          </Grid>
          <div className="submitBtn">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Form;
