import React,{useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { createworkout, editworkout } from "utils/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function CreateWorkoutModal({
  openModal,
  setOpenModal,
  editWorkoutPlan,
  setEditWorkoutPlan,
  type,
  fetchWorkoutPlan,
  workoutId
}) {
  const [name, setName] = useState(
    editWorkoutPlan ? editWorkoutPlan.name : ""
  );
  const [description, setDescription] =useState(
    editWorkoutPlan ? editWorkoutPlan.description : ""
  );

  useEffect(()=>{
    if (editWorkoutPlan) {
      setName(editWorkoutPlan.name);
      setDescription(editWorkoutPlan.description);
    }

  },[editWorkoutPlan])
  const handleClose = () => setOpenModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newWorkoutPlan = { name, description };

    if (editWorkoutPlan) {
      await editworkout(newWorkoutPlan,workoutId)
      // console.log(newWorkoutPlan)
      fetchWorkoutPlan()
     
    } else {
       await createworkout(newWorkoutPlan);
       fetchWorkoutPlan()
    }
   
    handleClose();
    setName('')
    setDescription('')
    setEditWorkoutPlan('')
  };



 



  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {
            type === 'exercise' ? ("Create Exercise") : ( editWorkoutPlan ? "Edit Workout Plan" : "Create Workout Plan")
          }
         
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={6}>
              <TextField
                required
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="description"
                label="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" sx={{ width: 100 }}>
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
