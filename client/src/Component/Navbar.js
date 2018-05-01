import React, { Component } from 'react';
import { Navbar,NavItem,NavDropdown,Nav,MenuItem } from 'react-bootstrap';

export default function DisplayNavbar(){
  return(
      <Navbar inverse >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">E-Commerce</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">
              Link
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Link Right
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link Right
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}