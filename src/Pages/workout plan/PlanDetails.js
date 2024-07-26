import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from "@mui/material";
import CreateWorkoutModal from './components/CreateWorkoutModal';
import AddIcon from "@mui/icons-material/Add";
import Card from "./components/Card"
import { getWorkoutById } from 'utils/api';


const PlanDetails = () => {
  const { id } = useParams()
  const [openExerciseModal, setOpenExerciseModal] = useState(false)
  const [newExercise, setNewExercise] = useState([])
  const [editExercise, setEditExercise] = useState()

  
  const [isLoading,setIsLoading] = useState(false)
  const [myWorkoutPlan,setMyWorkoutPlan] = useState({})


  const fetchMyWorkoutPlanById = async () => {
    setIsLoading(true)
    try {
      const data = await getWorkoutById(id)
      setMyWorkoutPlan(data)
    } catch (error) {
      console.log("fetch my workout plan is failed",error)
    }finally{
      setIsLoading(false)
    }
  }

  
  useEffect(()=>{
      fetchMyWorkoutPlanById()
 
  },[])
  
  const handleOpen = () => setOpenExerciseModal(true);
  if(isLoading){
    return <p>Loading....</p>
  }
  return (
    <div className="container">
      <div className="title-container">
        <h2 className="title">{myWorkoutPlan.name}</h2>
        {/* <Button variant="contained" onClick={handleOpen}>
          Create Exercise
        </Button> */}
      </div>
      {/* <div className="add-card-container">
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
        setEditWorkoutPlan={setEditExercise} openModal={openExerciseModal} setOpenModal={setOpenExerciseModal} type="exercise"/> */}
    </div>
  )
}

export default PlanDetails