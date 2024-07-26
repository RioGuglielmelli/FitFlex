import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";
import DialogBox from "./DialogBox";
import { Link } from "react-router-dom";
import { deleteworkout } from "utils/api";

const options = ["Edit", "Delete"];

export default function BasicCard({
  id,
  name,
  description,
  createModal,
  setEditWorkoutPlan,
  type,
  setWorkoutId,
  workoutId,
  fetchWorkoutPlan
}) {
  // menu items and functions------------------------------------------
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option) => {
    if (option === "Edit") {
      setWorkoutId(id)
      createModal()
      setEditWorkoutPlan({ name, description });
    } else {
      handleClickOpen();
      setWorkoutId(id)
    }
    handleClose();
  };

  // dialog open ----------------------------------------------------
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const deleteWoroutHandler = async() => {
   await deleteworkout(workoutId)
   fetchWorkoutPlan()
    handleDialogClose();
  };

  return (
    <Card
      sx={{
        width: 275,
        border: "none",
        outline: "none",
        boxShadow: "none",
        transition: "transform 0.3s, box-shadow 0.3s",
        boxShadow: "box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        },
        mt:4
      }}
    >
      {
        type === 'exercise' ? (<CardContent>
          <Typography variant="h2" component="div" sx={{ mb: 1 }}>
            {name}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>) : (<Link to={`/work-plan-management/${id}`}>
          {" "}
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{mb:1}}>{description}</Typography>
          </CardContent>
        </Link>)
      }



      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {options.map((option) => (
            <MenuItem key={option} onClick={() => handleSelect(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <DialogBox
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        onClick={deleteWoroutHandler}
        handleDialogClose={handleDialogClose}
        type="exercise"
      />
    </Card>
  );
}
