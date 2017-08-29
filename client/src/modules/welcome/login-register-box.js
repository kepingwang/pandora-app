import React, { Component } from 'react';
import styled from 'styled-components';
import LoginForm from './login-form';
import RegisterForm from './register-form';

const Wrapper = styled.div`
  width: 400px;
  height: 400px;
  box-shadow: 0px 1px 3px 2px #aaa;
`;

const NavBar = styled.div`
  display: flex;
`;
const Nav = styled.div`
  height: 100%;
  width: 50%;
  text-align: center;
  padding: 20px 5px;
  cursor: pointer;
  background: ${props => (props.selected ? '#fff' : '#ccc')};
`;


class LoginRegisterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registering: false,
    };
  }

  render() {
    return (
      <Wrapper>
        <NavBar>
          <Nav
            onClick={() => this.setState({ registering: false })}
            selected={!this.state.registering}
          >
            Login
          </Nav>
          <Nav
            onClick={() => this.setState({ registering: true })}
            selected={this.state.registering}
          >
            Register
          </Nav>
        </NavBar>
        {
          this.state.registering ? <RegisterForm /> : <LoginForm />
        }
      </Wrapper>
    );
  }
}

export default LoginRegisterBox;
