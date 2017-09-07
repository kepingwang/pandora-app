import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import buttonStyle from '../../../styles/button-style';
import newId from '../../../utils/new-id';


const Form = styled.form`
  padding: 50px 100px;
`;

const FormItem = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;
const SubmitFormItem = FormItem.extend`
  justify-content: center;
  margin-top: 40px;
`;

const LabelText = styled.label`
  padding-right: 5px;
`;

const SubmitInput = styled.input`
  ${() => buttonStyle}
`;

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
    };
  }

  componentWillMount() {
    this.emailId = newId();
    this.usernameId = newId();
    this.passwordId = newId();
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, username, password } = this.state;
    this.props.signup(email, username, password);
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        {
          this.props.signupMessage
            ? <div>{this.props.signupMessage}</div>
            : null
        }
        <FormItem>
          <label htmlFor={this.emailId}>
            <LabelText>
              email:
            </LabelText>
            <input
              id={this.emailId}
              type="text"
              value={this.state.email}
              onChange={e => this.handleEmailChange(e)}
            />
          </label>
        </FormItem>
        <FormItem>
          <label htmlFor={this.usernameId}>
            <LabelText>
              username:
            </LabelText>
            <input
              id={this.usernameId}
              type="text"
              value={this.state.username}
              onChange={e => this.handleUsernameChange(e)}
            />
          </label>
        </FormItem>
        <FormItem>
          <label htmlFor={this.passwordId}>
            <LabelText>
              password:
            </LabelText>
            <input
              id={this.passwordId}
              type="password"
              value={this.state.password}
              onChange={e => this.handlePasswordChange(e)}
            />
          </label>
        </FormItem>
        <SubmitFormItem>
          <SubmitInput type="submit" value="Signup" />
        </SubmitFormItem>
      </Form>
    );
  }

}

export default withRouter(LoginForm);
