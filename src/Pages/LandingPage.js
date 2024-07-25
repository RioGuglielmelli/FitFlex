import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import '../styles/LandingPage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from '../images/logo.svg';
import landingpage1 from '../images/landingpage1.jpg'; // Add your image imports here
import landingpage2 from '../images/landingpage2.jpg';
import landingpage3 from '../images/landingpage3.jpg';

const LandingPage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <Box className="landing-page-container">
            <Container maxWidth="md" className="hero-section">
                <Typography variant="h2" className="hero-title" gutterBottom>
                    Welcome to FitFlex
                </Typography>
                <img src={logo} alt="FitFlex Logo" className="hero-logo" />
                <Typography variant="h5" className="hero-subtitle" paragraph>
                    Your ultimate fitness companion. Track your progress, manage workouts, and stay motivated.
                </Typography>
                <Button variant="contained" size="large" component={Link} to="/login" className="hero-button">
                    Get Started
                </Button>
            </Container>
            <Container maxWidth="md" className="carousel-section">
                <Slider {...settings}>
                    <div>
                        <img src={landingpage1} alt="Slide 1" className="carousel-image" />
                    </div>
                    <div>
                        <img src={landingpage2} alt="Slide 2" className="carousel-image" />
                    </div>
                    <div>
                        <img src={landingpage3} alt="Slide 3" className="carousel-image" />
                    </div>
                </Slider>
            </Container>
        </Box>
    );
};

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#5BB345" }}
            onClick={onClick}
        />
    );
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#5BB345" }}
            onClick={onClick}
        />
    );
};

export default LandingPage;
