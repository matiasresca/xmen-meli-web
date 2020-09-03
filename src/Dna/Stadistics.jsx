import React from "react";

import {Row, Col, CardDeck, Card} from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

class Stadistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countMutantDna: 0,
            countHumanDna: 0,
            ratio: 0
        };
    }

    getStats() {
        axios.get(`http://35.188.141.104/stats`)
            .then(res => {
                const response = res.data;
                this.setState({
                    countMutantDna: response.count_mutant_dna,
                    countHumanDna: response.count_human_dna,
                    ratio: response.ratio
                });
            });
    }

    componentDidMount() {
        this.getStats();
    }

    render() {
        const data = {
            labels: [
                'Humanos',
                'Mutantes'
            ],
            datasets: [{
                data: [this.state.countMutantDna, this.state.countHumanDna],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                ]
            }]
        };
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <CardDeck>
                            <Card border="primary" text="dark" className="mb-2">
                                <Card.Header>Total de ADN</Card.Header>
                                <Card.Body>
                                    <Card.Title>{this.state.countHumanDna + this.state.countMutantDna}</Card.Title>
                                </Card.Body>
                            </Card>
                            <Card border="primary" text="dark" className="mb-2">
                                <Card.Header>Cantidad de Humanos</Card.Header>
                                <Card.Body>
                                    <Card.Title>{this.state.countHumanDna}</Card.Title>
                                </Card.Body>
                            </Card>
                            <Card border="primary" text="dark" className="mb-2">
                                <Card.Header>Cantidad de Mutantes</Card.Header>
                                <Card.Body>
                                    <Card.Title>{this.state.countMutantDna}</Card.Title>
                                </Card.Body>
                            </Card>
                            <Card border="primary" text="dark" className="mb-2">
                                <Card.Header>Promedio de Mutantes / Humanos</Card.Header>
                                <Card.Body>
                                    <Card.Title>{Math.round(this.state.ratio * 100)}%</Card.Title>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card border="primary">
                            <Card.Header>Estadísticas</Card.Header>
                            <Card.Body>
                                <Doughnut data={data} width={500} height={100}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
};

export default Stadistics;
