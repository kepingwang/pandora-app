import React from 'react';
import styled from 'styled-components';
import buttonStyle from '../../../../styles/button-style';

const Wrapper = styled.div`
  overflow: hidden;
`;
const Title = styled.h2`
  text-align: center;
`;
const ActionsBox = styled.div`
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
const SubmitItem = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;
const Button = styled.button`
  ${() => buttonStyle}
`;

const ActionChooser = ({ availableActions,
  positiveCoins, neutralCoins, negativeCoins,
  actionName, description, emotionType, scope, ready,
  chooseAction, submitAction, notReady }) => {
  if (ready) {
    return (
      <Wrapper>
        <Title>Action Chooser</Title>
        <Description>
          You have chosen {actionName}
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

  let actionInfo = 'No action is selected.';
  let available = false;
  if (actionName !== null) {
    let numCoins = 0;
    if (scope === 'personal') {
      numCoins = 4;
    } else if (scope === 'local') {
      numCoins = 6;
    } else if (scope === 'global') {
      numCoins = 12;
    }
    if (emotionType === 'positive') {
      available = (positiveCoins >= numCoins) || (neutralCoins >= numCoins);
    } else {
      available = (negativeCoins >= numCoins) || (neutralCoins >= numCoins);
    }
    actionInfo = (
      <div>
        <Description>{description}</Description>
        <Description>
          {`${emotionType} action of ${scope} scope (${numCoins} coins)`}
        </Description>
        {
          available
            ? null
            : <Description>Insufficient Coins!</Description>
        }
      </div >
    );
  }

  return (
    <Wrapper>
      <Title>Action Chooser</Title>
      <ActionsBox>
        {availableActions.map(action => (
          <ActionItem
            key={action}
            selected={action === actionName}
            onClick={action === actionName
              ? () => null
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
          disabled={!actionName || !available}
          onClick={() => submitAction()}
        >
          Submit
          </Button>
      </SubmitItem>
    </Wrapper>
  );
};


export default ActionChooser;
