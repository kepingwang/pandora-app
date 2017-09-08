import React, { Component } from 'react';
import styled from 'styled-components';
import { List } from 'immutable';

const Wrapper = styled.div`
  height: 100%;
`;
const Title = styled.h2`
  text-align: center;
`;
const ActionsBox = styled.div`
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
`;
const ActionItem = styled.div`
  padding: 5px 8px;
  margin: 5px 5px;
  border: 1px solid #aaa;
  user-select: none;
  cursor: pointer;
  ${props => (props.selected ? (`
    color: #fff;
    background-color: #333
  `) : '')}
`;
const Description = styled.div` 
  text-align: center;
  margin: 20px 10px;
`;
const ScopeChooser = styled.div`
  display: flex;
  justify-content: center;
`;
const SubmitItem = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;
const SubmitButton = styled.button`
  padding: 8px 10px;
  border: 1px solid #aaa;
  justify-content: center;
  font-size: 16px;
  background-color: #fff;
  box-shadow: none;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  ${props => (props.disabled ? 'opacity: 0.65;' : '')}
`;

const actionOptions = List(['sleep', 'eat a good meal', 'watch TV', 'play computer games', 'surf the internet', 'chat with friends', 'play soccer', 'watch youtube videos']);

class ActionChooser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      actionChosen: null,
      scope: 'private',
    };
  }

  chooseAction(actionName) {
    this.setState({
      actionChosen: actionName,
    });
  }

  render() {
    let numCoins = 4;
    if (this.state.scope === 'community') {
      numCoins = 6;
    } else if (this.state.scope === 'global') {
      numCoins = 12;
    }

    let actionInfo = 'No action is chosen.';
    if (this.state.actionChosen !== null) {
      actionInfo = (
        <div>
          <div>{`Action chosen: ${this.state.actionChosen}`}</div>
          <ScopeChooser>
            <ActionItem
              selected={this.state.scope === 'private'}
              onClick={() => this.setState({ scope: 'private' })}
            >private</ActionItem>
            <ActionItem
              selected={this.state.scope === 'community'}
              onClick={() => this.setState({ scope: 'community' })}
            >community</ActionItem>
            <ActionItem
              selected={this.state.scope === 'global'}
              onClick={() => this.setState({ scope: 'global' })}
            >private</ActionItem>
          </ScopeChooser>
          <div>
            {`cost ${numCoins} positive coins`}
          </div>
        </div>
      );
    }


    return (
      <Wrapper>
        <Title>Action Chooser</Title>
        <ActionsBox>
          {actionOptions.map(action => (
            <ActionItem
              key={action}
              selected={action === this.state.actionChosen}
              onClick={action === this.state.actionChosen
                ? () => this.chooseAction(null)
                : () => this.chooseAction(action)}
            >
              {action}
            </ActionItem>
          ))}
        </ActionsBox>
        <Description>
          {actionInfo}
        </Description>
        <SubmitItem>
          <SubmitButton disabled={this.state.actionChosen === null}>
            Submit
          </SubmitButton>
        </SubmitItem>
      </Wrapper>
    );
  }
}

export default ActionChooser;
