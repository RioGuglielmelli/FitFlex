import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { DatePicker } from '@mui/lab';
import { loadData, saveData } from '../utils/localStorage';
import '../styles/Dashboard.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const localizer = momentLocalizer(moment);

function Dashboard() {
    const [timeFrame, setTimeFrame] = useState('week');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Weight',
            data: [],
            fill: false,
            borderColor: 'blue'
        }]
    });
    const [date, setDate] = useState(new Date());
    const [weight, setWeight] = useState('');
    const [weights, setWeights] = useState(loadData('weights') || []);
    const myEvents = [
        {
            title: 'Big Meeting',
            allDay: true,
            start: new Date(2023, 6, 0),
            end: new Date(2023, 6, 1),
        },
        {
            title: 'Vacation',
            start: new Date(2023, 6, 7),
            end: new Date(2023, 6, 10),
        }
    ];

    const updateChartData = () => {
        const filteredWeights = weights.filter(entry => {
            const entryDate = new Date(entry.date);
            switch (timeFrame) {
                case 'week':
                    return entryDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                case 'month':
                    return entryDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                case 'sixMonths':
                    return entryDate > new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
                case 'year':
                    return entryDate > new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000);
                default:
                    return true;
            }
        });
        setChartData({
            labels: filteredWeights.map(entry => entry.date),
            datasets: [{
                label: 'Weight',
                data: filteredWeights.map(entry => entry.weight),
                fill: false,
                borderColor: 'blue'
            }]
        });
    };

    useEffect(() => {
        updateChartData();
    }, [timeFrame, weights]);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };

    const handleSaveWeight = () => {
        const newWeights = [...weights, { date: date.toISOString().split('T')[0], weight: parseFloat(weight) }];
        setWeights(newWeights);
        saveData('weights', newWeights);
    };

    return (
        <Box className="dashboard-container">
            <Typography className="dashboard-header" variant="h4" gutterBottom>
                Your Fitness Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper className="dashboard-paper" elevation={3}>
                        <Typography variant="h6">Weight Progress</Typography>
                        <FormControl className="form-control" fullWidth>
                            <InputLabel>Timeframe</InputLabel>
                            <Select
                                value={timeFrame}
                                label="Timeframe"
                                onChange={(e) => setTimeFrame(e.target.value)}
                            >
                                <MenuItem value="week">Week</MenuItem>
                                <MenuItem value="month">Month</MenuItem>
                                <MenuItem value="sixMonths">6 Months</MenuItem>
                                <MenuItem value="year">Year</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="chart-container">
                            <Line data={chartData} />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper className="dashboard-paper" elevation={3}>
                        <Typography variant="h6">Enter Your Weight</Typography>
                        <div className="weight-entry-container">
                            <TextField
                                label="Weight (lbs)"
                                type="number"
                                fullWidth
                                value={weight}
                                onChange={handleWeightChange}
                            />
                            <DatePicker
                                label="Date"
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(props) => <TextField {...props} fullWidth />}
                            />
                            <Button
                                className="button-save"
                                variant="contained"
                                fullWidth
                                onClick={handleSaveWeight}
                            >
                                Save Weight
                            </Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper className="calendar-container" elevation={3}>
                        <Typography variant="h6">Workout Calendar</Typography>
                        <div style={{ height: 500, margin: '20px' }}>
                            <Calendar
                                localizer={localizer}
                                events={myEvents}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: '100%' }}
                            />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;
