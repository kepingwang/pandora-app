import React, { Component } from 'react';
import styled from 'styled-components';
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
      password: '',
    };
  }

  componentWillMount() {
    this.emailId = newId();
    this.passwordId = newId();
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        {
          this.props.loginMessage
            ? <div>{this.props.loginMessage}</div>
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
          <SubmitInput type="submit" value="Login" />
        </SubmitFormItem>
      </Form>
    );
  }

}

export default LoginForm;
