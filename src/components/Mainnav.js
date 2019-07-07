import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';

var head = {
    color: "white"
}

export default class Mainnav extends React.Component {
constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
    isOpen: false
    };
}
toggle() {
    this.setState({
    isOpen: !this.state.isOpen
    });
}
render() {
    return (
    <div>
        <Navbar color="primary" light expand="md">
        <NavbarBrand href="/"> <b style={head}> ProfConn</b> </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink style={head} href="/profs">Professor</NavLink>
            </NavItem>
            <NavItem>
                <NavLink style={head} href="/students">Student</NavLink>
            </NavItem>
            <NavItem>
                <NavLink style={head} href="/admin">Admin</NavLink>
            </NavItem>
            </Nav>
        </Collapse>
        </Navbar>
    </div>
    );
}
}