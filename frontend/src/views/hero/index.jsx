import React from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";
import heroGirl from "../../assets/svgs/heroGirl.svg";
import heroWave from "../../assets/svgs/heroWave.svg";
import "./hero.scss";
import TourSection from '../distinations/TourSection';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="background-images">
                <img src={heroWave} alt="Wave" className="wave-svg" />
                <img src={heroGirl} alt="Traveler" className="traveler-image" />
            </div>
            <Container>
                <Row className="align-items-center">
                    <Col lg={6} xs={12} className="hero-content">
                        <h3 className="subtitle text-accent2 fw-bold">Explore, Discover, and Experience the World</h3>
                        <h1 className="title text-accent1 fw-bolder">Plan your  <span className="text-accent2">perfect gateway</span> with ease</h1>
                        <p className="description text-accent1">
                            Unlock endless adventures with Moventure. Whether you're searching for breathtaking destinations, booking cozy accommodations, or finding the best flight deals, we make travel planning effortless. Embrace your wanderlust and let us guide you to your next great escape.
                        </p>
                        <div className="hero-buttons">
                            <Button variant="accent4" className="me-3">Discover more</Button>
                            <Button variant="outline-accent4">
                                <span className="play-icon">▶</span> Book now
                            </Button>
                        </div>
                    </Col>
                    <Col lg={6} xs={12} className="hero-image">
                        <img src={heroGirl} alt="Traveler" className="img-fluid traveler-image" />
                    </Col>
                </Row>
            </Container>
            <TourSection />
        </section>
    );
}

export default Hero;
