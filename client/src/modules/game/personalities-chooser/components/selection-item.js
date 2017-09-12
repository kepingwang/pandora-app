import React from 'react';
import styled from 'styled-components';
import Plus from '../../../common/icons/plus-white';
import Minus from '../../../common/icons/minus-white';

const Wrapper = styled.div`
  margin-top: 3px;
  display: flex;
`;
const Name = styled.div`
  width: 100px;
  text-align: center;
  border: 1px solid #aaa;
  overflow: scroll;
  user-select: none;
  cursor: default;
`;
const IntensityWrapper = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: default;
`;
const AdjustButton = styled.div`
  padding: 4px 4px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.3 : 1)};
`;
const IntensityNumber = styled.div`
  font-size: 18px;
`;

const iconSize = '16px';


const Intensity = ({ intensity, decrease, increase, decreaseDisabled, increaseDisabled }) => (
  <IntensityWrapper>
    <AdjustButton disabled={decreaseDisabled} onClick={!decreaseDisabled && decrease}>
      <Minus size={iconSize} />
    </AdjustButton>
    <IntensityNumber>{intensity}</IntensityNumber>
    <AdjustButton disabled={increaseDisabled} onClick={!increaseDisabled && increase}>
      <Plus size={iconSize} />
    </AdjustButton>
  </IntensityWrapper>
);


const SelectionItem = ({ name, intensity, decrease, increase,
  decreaseDisabled, increaseDisabled }) => (
    <Wrapper>
      <Name>{name}</Name>
      <Intensity {...{ intensity, decrease, increase, decreaseDisabled, increaseDisabled }} />
    </Wrapper>
  );

export default SelectionItem;
