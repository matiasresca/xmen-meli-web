import React from "react";

import { Formik, Form as FormikForm, Field } from "formik";
import { Form, Row, Col, Button, Card, Alert } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

class NewDna extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values, { setSubmitting }) {
        setSubmitting(false);
        const self = this;
        const data = {};
        data.dna = JSON.parse(values.dna.replace(/\s/g, ''));
        axios.post('http://35.188.141.104/mutant/', data)
            .then( response =>
                self.props.history.push('/')
            )
            .catch(error => {
                if (error.response.status === 403) {
                    self.props.history.push('/')
                } else {
                    self.setState({
                        error: error.response.data.error
                    })
                }
            });
    }

    render() {
        const initialValues = {
            dna: ''
        };
        const error = this.state.error;
        let errorAlert;
        if (error) {
            errorAlert = <Alert variant="danger" onClose={() => this.setState({error: ''})} dismissible>
                <Alert.Heading>Error!</Alert.Heading>
                {error}
            </Alert>;
        }
        return (
            <Card border="primary" text='dark' className="mb-2">
                <Card.Header>Nuevo ADN</Card.Header>
                <Card.Body>
                    <Card.Title>Ingresar el ADN que se quiere analizar</Card.Title>
                    {errorAlert}
                    <Formik initialValues={initialValues}
                            onSubmit={this.onSubmit}>
                        {({ isSubmitting }) => (
                            <Form as={FormikForm}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2" lg="1">
                                        ADN
                                    </Form.Label>
                                    <Col sm="10" lg="11">
                                        <Form.Control name="dna" placeholder={"[\"AGACGA\",\"CAGTGC\",\"TCATGT\",\"AGAAGT\",\"CCCCTC\",\"TCACGG\"]"} required as={Field} />
                                    </Col>
                                </Form.Group>
                                <Button type="submit" disabled={isSubmitting}>Analizar</Button>
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
        );
    }
};

export default withRouter(NewDna);