import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Tooltip} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

var head = {
    color: "white"
}

var userstyle = {
    color: "white",
    paddingTop: "8px"
}

var userstyleicon = {
    color: "white",
    textDecoration: "none"
}

export default class Mainnav extends React.Component {
constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
    isOpen: false
    };
    this.tooltoggle = this.tooltoggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
}
toggle() {
    this.setState({
    isOpen: !this.state.isOpen
    });
}

tooltoggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
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
            {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p style = {userstyle}>
                    <a href="/" id = "user" style={userstyleicon}><FontAwesomeIcon icon={['fas', 'user']} /> </a>
                    <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target="user" toggle={this.tooltoggle}>
                        {this.props.auth.user.username}
                    </Tooltip>
                </p>
            )}
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