import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import theme from './theme/theme';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Exercises from './Pages/exercise search/Exercises';
import ExerciseDetails from './Pages/exercise search/ExerciseDetails';
import PlanManagement from './Pages/workout plan/PlanManagement';
import PlanDetails from './Pages/workout plan/PlanDetails';
import NotFoundPage from './Pages/NotFoundPage';
import Footer from './Pages/Footer';
import symbol from './images/symbol.svg';
import name from './images/FitFlexName.svg';


function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <AppBar position="sticky">
              <Toolbar>
                <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                  <img src={symbol} alt="FitFlex Logo" className="glowing-logo" style={{ width: '80px', height: '80px', marginRight: '5px' }} />
                  <img src={name} alt="FitFlex Name" className="glowing-logo" style={{ width: '120px', height: '80px', marginRight: '10px' }} />

                </Box>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/signin">Sign In</Button>
                <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                <Button color="inherit" component={Link} to="/exercises">Exercises</Button>
                <Button color="inherit" component={Link} to="/work-plan-management">Workout Plan</Button>
                <Button color="inherit" component={Link} to="/about">About Us</Button>
                <Button color="inherit" component={Link} to="/contact">Contact</Button>
                <Button color="inherit" component={Link} to="/login">Sign In</Button>
              </Toolbar>
            </AppBar>
            <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/exercises/:id" element={<ExerciseDetails />} />
                <Route path="/work-plan-management" element={<PlanManagement />} />
                <Route path="/work-plan-management/:name" element={<PlanDetails />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
  );
}

export default App;