import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from "@mui/material";
import Card from "./components/Card"
import { getWorkoutById } from 'utils/api';
import CreateWorkoutBaseExercise from './components/CreateWorkoutBaseExercise';
import {  fetchExerciseDetails } from '../../utils/api';
import { Box,  CircularProgress, Modal, IconButton  } from '@mui/material';
import ExerciseDetails from 'Pages/exercise search/ExerciseDetails';




const PlanDetails = () => {
  const { id } = useParams()


  const [isLoading, setIsLoading] = useState(false)
  const [myWorkoutPlan, setMyWorkoutPlan] = useState({})
  const [createExerciseModal, setCreateExerciseModal] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState([]);
  const [exerciseDetails,setExerciseDetails] = useState()
  const [exerciseDetailsModal,setExerciseDetailsModal] = useState(false)

  const fetchMyWorkoutPlanById = async () => {
    setIsLoading(true)
    try {
      const data = await getWorkoutById(id)
      setMyWorkoutPlan(data)
    } catch (error) {
      console.log("fetch my workout plan is failed", error)
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    fetchMyWorkoutPlanById()

  }, [])

  const handleOpen = () => setCreateExerciseModal(true);
  if (isLoading) {
    return <p>Loading....</p>
  }

  const handleOpenExercise = async (id) => {
    const exerciseDetails = await fetchExerciseDetails(id);
    setExerciseDetails(exerciseDetails);
    setExerciseDetailsModal(true);
};

const handleClose = () => {
  setExerciseDetailsModal(false);
  setExerciseDetails(null);
};
  return (
    <>
    <div className="container">
      <div className="title-container">
        <h2 className="title">{myWorkoutPlan.name}</h2>
        <Button variant="contained" onClick={handleOpen}>
          Create Exercise
        </Button>
      </div>
      <div className="add-card-container">
        {selectedExercise.length > 0 ? (
          selectedExercise?.map((item, index) => (
            <Card
              {...item}
              key={index}
              setMyWorkoutPlan={setSelectedExercise}
              myWorkoutPlan={selectedExercise}
              type="exercise"
              selectedExercise={selectedExercise}
              setSelectedExercise={setSelectedExercise}
              handleOpenExercise={handleOpenExercise}
            />
          ))
        ) : (
          <div style={{width:"100%"}}>
            <h3>No Exercises Currently, Create One ...</h3>
          </div>
        )
        }
      </div>
      <CreateWorkoutBaseExercise 
      setCreateExerciseModal={setCreateExerciseModal} 
      createExerciseModal={createExerciseModal}
       setSelectedExercise={setSelectedExercise} 
       selectedExercise={selectedExercise} />
    </div>
    <Modal
                open={exerciseDetailsModal}
                onClose={handleClose}
                aria-labelledby="exercise-details-title"
                aria-describedby="exercise-details-description"
            >
                <Box className="exercise-modal">
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        className="modal-close-button"
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                    </IconButton>
                    {exerciseDetails ? (
                        <ExerciseDetails exercise={exerciseDetails}/>
                    ) : (
                        <CircularProgress />
                    )}
                </Box>
            </Modal>
    </>
    
  )
}

export default PlanDetails