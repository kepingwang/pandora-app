import React, { Component } from 'react';
import styled from 'styled-components';
import LoginForm from './login-form';
import SignupForm from './signup-form';

const Wrapper = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const WelcomeTitle = styled.h1`
  display: inline-block;
  margin-bottom: 40px;
`;

const BoxWrapper = styled.div`
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


class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registering: false,
    };
  }

  render() {
    const { signup, login, signupMessage, loginMessage } = this.props;

    return (
      <Wrapper>
        <WelcomeTitle>
          Welcome to Pandora Game
        </WelcomeTitle>
        <BoxWrapper>
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
            this.state.registering
              ? <SignupForm {...{ signup, signupMessage }} />
              : <LoginForm {...{ login, loginMessage }} />
          }
        </BoxWrapper>
      </Wrapper>
    );
  }
}

export default Welcome;
