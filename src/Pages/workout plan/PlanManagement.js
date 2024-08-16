import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import "../../styles/workout.css";
import { Button } from "@mui/material";
import CreateWorkoutModal from "./components/CreateWorkoutModal";
import AddIcon from "@mui/icons-material/Add";
import { getWorkout } from "utils/api";

const PlanManagement = () => {
  // useState Function-------------------------------------------------
  const [openModal, setOpenModal] = useState(false);
  const [editWorkoutPlan, setEditWorkoutPlan] = useState();

  // ---------------------------------------------------------------------------------------------------------------------------
  const [workoutPlan,setWorkoutPlan] = useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [workoutId,setWorkoutId] = useState()



  //   modal open Handler--------------------------------------------------
  const handleOpen = () => setOpenModal(true);
  const fetchWorkoutPlan = async () => {
    setIsLoading(true)
    try {
      const data = await getWorkout()
        setWorkoutPlan(data)
      } catch (error) {
        console.log("Failed to fetch workout plan",error)
      }finally{
        setIsLoading(false)
      }
    }   

  useEffect(()=>{
                                                                                 
  
    if(workoutPlan.length === 0){
      fetchWorkoutPlan()
      setIsLoading(false)

    }
  },[workoutPlan,isLoading])

  if(isLoading){
    return <p>Loading...</p>
  }
  return (
    <div className="container">
      <div className="title-container">
        <h2 className="title">Create Your Workout</h2>
        <Button variant="contained" onClick={handleOpen}>
          Create
        </Button>
      </div>

      <div className="add-card-container">
        {workoutPlan.length > 0 ? (
          workoutPlan?.map((item, index) => (
            <Card
              {...item}
              key={index}
              createModal={handleOpen}
              setEditWorkoutPlan={setEditWorkoutPlan}
              setWorkoutId={setWorkoutId}
              workoutId={workoutId}
        fetchWorkoutPlan={fetchWorkoutPlan}

            />
          ))
        ) : (
          <div className="add-icon" onClick={handleOpen}>
            <AddIcon sx={{ fontSize: 80, opacity: 0.5, color: "#525252" }} />
          </div>
        )}
      </div>
      <CreateWorkoutModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        editWorkoutPlan={editWorkoutPlan}
        setEditWorkoutPlan={setEditWorkoutPlan}
        fetchWorkoutPlan={fetchWorkoutPlan}
        workoutId={workoutId}
      />
    </div>
  );
};

export default PlanManagement;
