import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import "./workout.css";
import { Button } from "@mui/material";
import CreateWorkoutModal from "./components/CreateWorkoutModal";
import AddIcon from "@mui/icons-material/Add";

const PlanManagement = () => {
  // useState Function-------------------------------------------------
  const [openModal, setOpenModal] = useState(false);
  const [myWorkoutPlan, setMyWorkoutPlan] = useState([]);
  const [editWorkoutPlan, setEditWorkoutPlan] = useState();


   // Load workout plans from localStorage on component mount
   useEffect(() => {
    const storedPlans = localStorage.getItem("myWorkoutPlan");
    if (storedPlans) {
      setMyWorkoutPlan(JSON.parse(storedPlans));
    }
  }, []);

  // Save workout plans to localStorage whenever myWorkoutPlan changes
  useEffect(() => {
    localStorage.setItem("myWorkoutPlan", JSON.stringify(myWorkoutPlan));
  }, [myWorkoutPlan]);


  //   modal open Handler--------------------------------------------------
  const handleOpen = () => setOpenModal(true);

  return (
    <div className="container">
      <div className="title-container">
        <h2 className="title">Create Your Workout</h2>
        <Button variant="contained" onClick={handleOpen}>
          Create
        </Button>
      </div>

      <div className="add-card-container">
        {myWorkoutPlan.length > 0 ? (
          myWorkoutPlan?.map((item, index) => (
            <Card
              {...item}
              key={index}
              setMyWorkoutPlan={setMyWorkoutPlan}
              myWorkoutPlan={myWorkoutPlan}
              createModal={handleOpen}
              setEditWorkoutPlan={setEditWorkoutPlan}
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
        setMyWorkoutPlan={setMyWorkoutPlan}
        editWorkoutPlan={editWorkoutPlan}
        setEditWorkoutPlan={setEditWorkoutPlan}
      />
    </div>
  );
};

export default PlanManagement;
