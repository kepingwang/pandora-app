import React from 'react';
import styled from 'styled-components';
import { List } from 'immutable';
import buttonStyle from '../../../../styles/button-style';

const Wrapper = styled.div`
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
const Button = styled.button`
  ${() => buttonStyle}
`;

const actionOptions = List(['sleep', 'eat a good meal', 'watch TV', 'play computer games', 'surf the internet', 'chat with friends', 'play soccer', 'watch youtube videos']);

const ActionChooser = ({ actionChosen, scope, ready,
  chooseAction, chooseScope, submitAction, notReady }) => {
  if (ready) {
    return (
      <Wrapper>
        <Title>Action Chooser</Title>
        <Description>
          You have chosen to
            <b> {actionChosen} </b>
          with
            <b> {scope} </b>
          scope
          </Description>
        <Description>
          Waiting for other players...
          </Description>
        <SubmitItem>
          <Button onClick={notReady}>
            Not Ready
            </Button>
        </SubmitItem>
      </Wrapper>
    );
  }

  let numCoins = 4;
  if (scope === 'community') {
    numCoins = 6;
  } else if (scope === 'global') {
    numCoins = 12;
  }

  let actionInfo = 'No action is chosen.';
  if (actionChosen !== null) {
    actionInfo = (
      <div>
        <div>{`Action chosen: ${actionChosen}`}</div>
        <ScopeChooser>
          <ActionItem
            selected={scope === 'private'}
            onClick={() => chooseScope('private')}
          >private</ActionItem>
          <ActionItem
            selected={scope === 'community'}
            onClick={() => chooseScope('community')}
          >community</ActionItem>
          <ActionItem
            selected={scope === 'global'}
            onClick={() => chooseScope('global')}
          >global</ActionItem>
        </ScopeChooser>
        <div>
          {`cost ${numCoins} positive coins`}
        </div>
      </div >
    );
  }


  return (
    <Wrapper>
      <Title>Action Chooser</Title>
      <ActionsBox>
        {actionOptions.map(action => (
          <ActionItem
            key={action}
            selected={action === actionChosen}
            onClick={action === actionChosen
              ? () => chooseAction(null)
              : () => chooseAction(action)}
          >
            {action}
          </ActionItem>
        ))}
      </ActionsBox>
      <Description>
        {actionInfo}
      </Description>
      <SubmitItem>
        <Button
          disabled={actionChosen === null}
          onClick={() => submitAction()}
        >
          Submit
          </Button>
      </SubmitItem>
    </Wrapper>
  );
};


export default ActionChooser;
