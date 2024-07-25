import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from "@mui/material";
import CreateWorkoutModal from './components/CreateWorkoutModal';
import AddIcon from "@mui/icons-material/Add";
import Card from "./components/Card"


const PlanDetails = () => {
  const { name } = useParams()
  const [openExerciseModal, setOpenExerciseModal] = useState(false)
  const [newExercise, setNewExercise] = useState([])
  const [editExercise, setEditExercise] = useState()

  useEffect(()=>{
    const storedExercise = localStorage.getItem(name)
    if(storedExercise){
      setNewExercise(JSON.parse(storedExercise))
    }
  },[])
  useEffect(()=>{
    localStorage.setItem(name,JSON.stringify(newExercise))
  },[newExercise])
  const handleOpen = () => setOpenExerciseModal(true);
  return (
    <div className="container">
      <div className="title-container">
        <h2 className="title">{name}</h2>
        <Button variant="contained" onClick={handleOpen}>
          Create Exercise
        </Button>
      </div>
      <div className="add-card-container">
        {newExercise.length > 0 ? (
          newExercise?.map((item, index) => (
            <Card
              {...item}
              key={index}
              setMyWorkoutPlan={setNewExercise}
              myWorkoutPlan={newExercise}
              createModal={handleOpen}
              setEditWorkoutPlan={setEditExercise}
              type="exercise"
            />
          ))
        ) : (
          <div className="add-icon" onClick={() => setOpenExerciseModal(true)}>
            <AddIcon sx={{ fontSize: 80, opacity: 0.5, color: "#525252" }} />
          </div>
        )}
      </div>
      <CreateWorkoutModal setMyWorkoutPlan={setNewExercise}
        editWorkoutPlan={editExercise}
        setEditWorkoutPlan={setEditExercise} openModal={openExerciseModal} setOpenModal={setOpenExerciseModal} type="exercise"/>
    </div>
  )
}

export default PlanDetails