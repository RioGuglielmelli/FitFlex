import React, { useState } from "react";
import { Button, Grid, MenuItem, Select, Typography, TextField, CircularProgress, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SearchBar from "Pages/SearchBar";
import '../../../styles/Exercises.css';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CreateWorkoutBaseExercise = ({ setCreateExerciseModal, createExerciseModal,setSelectedExercise ,selectedExercise}) => {
 




  return (
    <Modal
      open={createExerciseModal}
      onClose={() => setCreateExerciseModal(!createExerciseModal)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <SearchBar setSelectedExercise={setSelectedExercise} selectedExercise={selectedExercise} />

       
      </Box>


    </Modal>
  );
};

export default CreateWorkoutBaseExercise;
