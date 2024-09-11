import React, { useEffect, useState } from 'react';
import './tourSection.scss';

import { Button, Card, Modal, Form } from 'react-bootstrap';
import SectionHeading from '../../components/SectionHeading';
import API from '../../utilities/api';

// Import images
import image1 from '../../assets/images/random-1.webp';
import image2 from '../../assets/images/random-2.webp';
import image3 from '../../assets/images/random-3.webp';
import image4 from '../../assets/images/random-4.webp';
import ReviewButton from '../../components/reviewButton';

const CardComponent = ({ id, name, description, country, city, imageUrl, reviewId }) => {
    // console.log(reviewId)
    const images = [image1, image2, image3, image4];
    return (
        <Card className="tour-card">
            <Card.Img variant="top" src={images[Math.floor(Math.random() * images.length)]} alt={name} />
            <Card.Body>
                <Card.Title className='text-accent2 fw-bold'>{name}</Card.Title>
                <Card.Subtitle className='text-accent3'>{city}, {country}</Card.Subtitle>
                <Card.Text>{description || 'Explore the beauty of this destination, where history meets culture.'}</Card.Text>
                <div className="details-section">
                    <div className="price-rating">
                        <span className="rating">
                            <i className="fas fa-star"></i> {reviewId || '4.5'}
                        </span>
                        <span className="price">${Math.floor(Math.random() * 500) + 100}</span>
                    </div>
                    <span className="days">{Math.floor(Math.random() * 10) + 2} days tour</span>
                </div>
                <ReviewButton entityType={"destination"} entityId={id}/>
            </Card.Body>
        </Card>
    );
};

const CarouselComponent = ({ tours }) => {
    const handlePrevClick = () => {
        // Logic to move carousel left
    };

    const handleNextClick = () => {
        // Logic to move carousel right
    };

    return (
        <div className="carousel-container">
            <Button variant="accent2" className="carousel-control left" onClick={handlePrevClick}>
                <i className="fas fa-chevron-left"></i>
            </Button>
            <div className="carousel-items">
                {tours.map((tour) => (
                    <CardComponent key={tour.id} {...tour} />
                ))}
            </div>
            <Button variant="accent3" className="carousel-control right" onClick={handleNextClick}>
                <i className="fas fa-chevron-right"></i>
            </Button>
        </div>
    );
};

const TourSection = () => {
    const [tours, setTours] = useState([]); // Initialize tours as an empty array

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await API.get("/destination");
                // console.log("🚀 ~ useEffect ~ response:", response);
                const fetchedTours = response.data?.data || [];
                // console.log("🚀 ~ useEffect ~ tours:", fetchedTours);
                setTours(fetchedTours); // Set the fetched tours in the state
            } catch (error) {
                console.log("🚀 ~ useEffect ~ error:", error);
            }
        };

        fetchTours(); // Call the function to fetch data
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    return (
        <section className="tour-section">
            <SectionHeading subHeading="Tour Packages" heading="The amazing places around the world" />
            <CarouselComponent tours={tours} /> {/* Duplicate tours for carousel */}
        </section>
    );
};

export default TourSection;
