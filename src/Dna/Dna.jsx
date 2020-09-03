import React from "react";

import { Switch, Route, withRouter, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import NewDna from "./NewDna";
import Stadistics from "./Stadistics";

class Dna extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar bg="light" expand="lg" className="mb-2">
                    <Navbar.Brand>XMEN - MeLi</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/xmen/" className="nav-link">Estadísticas</Link>
                            <Link to="/xmen/new" className="nav-link">Ingresar ADN</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route path="/xmen/new">
                        <NewDna/>
                    </Route>
                    <Route exact path="/xmen">
                        <Stadistics/>
                    </Route>
                </Switch>
            </React.Fragment>
        );
    }
}

export default withRouter(Dna);