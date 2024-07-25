import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, CircularProgress, Grid, Paper, Modal, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchExercise, fetchExercises, fetchExerciseDetails } from '../../utils/api';
import ExerciseDetails from './ExerciseDetails'; // Import ExerciseDetails component
import SearchBar from '../SearchBar';  //my change
import '../../styles/Exercises.css';

function Exercises() {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

    const loadMoreExercises = useCallback(async () => {
        const data = await fetchExercises(page);
        setExercises(prevExercises => [...prevExercises, ...data.results]);
        setPage(prevPage => prevPage + 1);
        if (!data.next) {
            setHasMore(false);
        }
        setLoading(false);
    }, [page]);

    const handleOpen = async (id) => {
        const exerciseDetails = await fetchExerciseDetails(id);
        setSelectedExercise(exerciseDetails);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedExercise(null);
    };

    useEffect(() => {
        loadMoreExercises();
    }, [loadMoreExercises]);

    return (
        <Box className="exercises-container">
            <SearchBar /> {/*my change*/}
            <Typography variant="h4" className="exercises-title" gutterBottom>
                Exercises
            </Typography>
            {loading && page === 1 ? (
                <CircularProgress />
            ) : (
                <InfiniteScroll
                    dataLength={exercises.length}
                    next={loadMoreExercises}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <Grid container spacing={3} justifyContent="center">
                        {exercises.map((exercise) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={exercise.id} className="exercise-grid-item">
                                <Paper className="exercise-card" elevation={3} onClick={() => handleOpen(exercise.id)}>
                                    <Typography variant="h6" className="exercise-name">
                                        {exercise.name}
                                    </Typography>
                                    <Typography className="exercise-description">
                                        {exercise.description.replace(/(<([^>]+)>)/gi, "")}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>
            )}
            <Modal
                open={open}
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
                        <CloseIcon />
                    </IconButton>
                    {selectedExercise ? (
                        <ExerciseDetails exercise={selectedExercise} />
                    ) : (
                        <CircularProgress />
                    )}
                </Box>
            </Modal>
        </Box>
    );
}

export default Exercises;
