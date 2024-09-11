import React from 'react';
import "./sectionHeading.scss";
import { Col, Row } from 'react-bootstrap';

const SectionHeading = ({ subHeading, heading, textAlign = "start" }) => {
    return (
        <Row className={`section-heading ms-2 text-${textAlign}`}>
            <Col sm={10} md={8} lg={6}>
                <h6 className="h6 text-accent2">{subHeading}</h6>
                <h2 className="h2 text accent1 fw-bolder">{heading}</h2>
            </Col>
        </Row>
    );
}

export default SectionHeading;