import React from "react";
import {
  Modal,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  rowData: any;
}

interface EditFormData {
  name: string;
  email: string;
  contact: string;
  isWeekday: boolean;
  gender: string;
  dob: string;
}
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  zIndex: "1",
  p: 4,
};

const EditModal: React.FC<EditModalProps> = ({
  open,
  onClose,
  onSave,
  rowData,
}) => {
  const { register, handleSubmit, setValue }: any = useForm<EditFormData>({
    defaultValues: rowData,
  });

  const onSubmitHandler: SubmitHandler<EditFormData> = (data) => {
    onSave(data);
    toast.success("Record Saved");
    onClose();
  };

  React.useEffect(() => {
    for (const key in rowData) {
      setValue(key, rowData[key]);
    }
  }, [rowData, setValue]);

  return (
    <Modal
      style={{
        left: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "450px",
        height: "400px",
        padding: "20px", // Adjust the padding
        margin: "10px",
        borderRadius: "4px",
        backgroundColor: "#f0f1f2",
      }}
      open={open}
      onClose={onClose}
    >
      <Box sx={style}>
        <h3 style={{ margin: 0 }}>Edit Entries</h3>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <TextField
            label="Name"
            {...register("name")}
            fullWidth
            margin="normal"
            size="small"
          />
          <TextField
            label="Contact"
            {...register("contact")}
            fullWidth
            margin="normal"
            size="small"
          />

          <FormControlLabel
            style={{ paddingTop: "20px" }}
            control={
              <Checkbox
                {...register("isWeekday")}
                defaultChecked={rowData?.isWeekday || false}
              />
            }
            label="Weekday"
          />
          <FormControl style={{ paddingLeft: "60px" }}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              defaultValue={rowData?.gender || ""}
            >
              <FormControlLabel
                value="Male"
                control={<Radio {...register("gender")} />}
                label="Male"
              />
              <FormControlLabel
                value="Female"
                control={<Radio {...register("gender")} />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>DOB</FormLabel>
            <TextField
              style={{ margin: 0 }}
              {...register("dob")}
              fullWidth
              margin="normal"
              type="date"
              size="small"
            />
          </FormControl>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              padding: "40px",
            }}
          >
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default EditModal;
