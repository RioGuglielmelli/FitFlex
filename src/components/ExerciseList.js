import React from 'react';

const ExerciseList = ({ exerciseNames }) => {
        return (
            <div>
                <h3>Exercises for the selected category:</h3>
                <ul>
                    {exerciseNames.map((exerciseName, index) => (
                        <li key={index}>{exerciseName}</li>
                    ))}
                </ul>
            </div>
        );
    };

export default ExerciseList;