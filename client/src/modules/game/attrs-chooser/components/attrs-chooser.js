import React, { Component } from 'react';
import styled from 'styled-components';
import SelectionItem from './selection-item';
import AttrsView from '../../components/attrs-view';
import buttonStyle from '../../../../styles/button-style';

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 120px auto 180px;
  grid-template-rows: 60px 30px;
  overflow: hidden;
`;
const TitleMain = styled.h2`
  grid-column: 1 / 4;
  margin: 0;
  justify-self: center;
  align-self: center;
`;
const TitleOptions = styled.h3`
  grid-column: 2 / 3;
  justify-self: center;
  font-size: 18px;
  margin: 0;
`;
const TitleSelections = styled.h3`
  grid-column: 3 / 4;
  justify-self: center;
  font-size: 18px;
  margin: 0;
`;
const TypeTitle = styled.div`
  grid-column: 1 / 2;
  padding: 5px;
  padding-left: 12px;
  font-size: 18px;
`;
const Options = styled.div`
  grid-column: 2 / 3;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;
const OptionItem = styled.div`
  display: inline-block;
  margin: 3px;
  padding: 3px 5px;
  ${props => (props.selected ? 'background-color: #ccc;' : null)}
  cursor: pointer;
  user-select: none;
`;
const Selections = styled.div`
  grid-column: 3 / 4;
`;
const SubmitItem = styled.div`
  grid-column: 1 / 3;
  justify-self: center;
`;
const PointsItem = styled.div`
  grid-column: 3 / 4;
`;
const Button = styled.button`
  ${() => buttonStyle}
`;
const ViewWrapper = styled.div`
  padding: 30px;
  height: 50%;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Text = styled.div`
  text-align: center;
  padding: 20px;
`;


const MAX_INTENSITY = 3;

class AttrsChooser extends Component {

  decrease(attrType, attrName) {
    const { attrsChosen, remainingPoints, chooseAttrs, setRemainingPoints } = this.props;

    const attrIdx = attrsChosen.get(attrType)
      .findIndex(attr => attr.get('name') === attrName);

    const nextAttrsChosen = attrsChosen.updateIn(
      [attrType, attrIdx],
      (attr) => {
        if (attr.get('intensity') === 1) {
          return attr.merge({
            name: null,
            intensity: 0,
          });
        }
        return attr.update('intensity', intensity => intensity - 1);
      },
    );

    const nextRemainingPoints = remainingPoints + 1;

    chooseAttrs(nextAttrsChosen);
    setRemainingPoints(nextRemainingPoints);
  }

  increase(attrType, attrName) {
    const { attrsChosen, remainingPoints, chooseAttrs, setRemainingPoints } = this.props;

    const attrIdx = attrsChosen.get(attrType)
      .findIndex(attr => attr.get('name') === attrName);

    const nextAttrsChosen = attrsChosen.updateIn(
      [attrType, attrIdx],
      attr => attr.update('intensity', intensity => intensity + 1),
    );

    const nextRemainingPoints = remainingPoints - 1;

    chooseAttrs(nextAttrsChosen);
    setRemainingPoints(nextRemainingPoints);
  }

  select(attrType, attrName) {
    const { attrsChosen, remainingPoints, chooseAttrs, setRemainingPoints } = this.props;

    let nextAttrsChosen = attrsChosen;
    let nextRemainingPoints = remainingPoints;

    let updateIdx = attrsChosen.get(attrType)
      .findIndex(item => item.get('name') === null);

    if (updateIdx === -1) {
      updateIdx = 0;
      const attrReplaced = attrsChosen.getIn([attrType, updateIdx]);
      nextAttrsChosen = attrsChosen.mergeIn(
        [attrType, updateIdx],
        { name: attrName, intensity: 1 },
      );
      nextRemainingPoints += attrReplaced.get('intensity') - 1;
    } else {
      if (remainingPoints === 0) { return; }
      nextAttrsChosen = attrsChosen.mergeIn(
        [attrType, updateIdx],
        { name: attrName, intensity: 1 },
      );
      nextRemainingPoints += -1;
    }

    chooseAttrs(nextAttrsChosen);
    setRemainingPoints(nextRemainingPoints);
  }

  deselect(attrType, attrName) {
    const { attrsChosen, remainingPoints, chooseAttrs, setRemainingPoints } = this.props;

    const updateIdx = attrsChosen.get(attrType)
      .findIndex(item => item.get('name') === attrName);

    const nextAttrsChosen = attrsChosen.mergeIn(
      [attrType, updateIdx],
      { name: null, intensity: 0 },
    );

    const nextRemainingPoints = remainingPoints
      + attrsChosen.getIn([attrType, updateIdx, 'intensity']);

    chooseAttrs(nextAttrsChosen);
    setRemainingPoints(nextRemainingPoints);
  }

  Options(attrType) {
    const { availableAttrs, attrsChosen } = this.props;

    return (
      <Options>
        {availableAttrs.get(attrType).map(attrName => (
          <OptionItem
            key={attrName}
            selected={attrsChosen.get(attrType)
              .find(attr => attr.get('name') === attrName)}
            onClick={attrsChosen.get(attrType)
              .find(attr => attr.get('name') === attrName)
              ? (() => this.deselect(attrType, attrName))
              : (() => this.select(attrType, attrName))}
          >
            {attrName}
          </OptionItem>
        ))}
      </Options>
    );
  }

  Selections(attrType) {
    const { attrsChosen, remainingPoints } = this.props;

    return (
      <Selections>
        {attrsChosen.get(attrType).map((attr, idx) => (
          <SelectionItem
            key={idx}
            name={attr.get('name')}
            intensity={attr.get('intensity')}
            decrease={() => this.decrease(attrType, attr.get('name'))}
            increase={() => this.increase(attrType, attr.get('name'))}
            decreaseDisabled={attr.get('name') === null}
            increaseDisabled={attr.get('name') === null
              || attr.get('intensity') === MAX_INTENSITY
              || remainingPoints === 0}
          />
        ))}
      </Selections>
    );
  }

  allSelected() {
    const { attrsChosen } = this.props;

    return attrsChosen.get('emotions').every(item => (
      item.has('name') && item.get('name') !== null
    )) && attrsChosen.get('beliefs').every(item => (
      item.has('name') && item.get('name') !== null
    )) && attrsChosen.get('personalities').every(item => (
      item.has('name') && item.get('name') !== null
    ));
  }

  render() {
    const { attrsChosen, remainingPoints, ready, submitAttrs, notReady } = this.props;

    if (ready) {
      return (
        <ViewWrapper>
          <AttrsView
            emotions={attrsChosen.get('emotions')}
            beliefs={attrsChosen.get('beliefs')}
            personalities={attrsChosen.get('personalities')}
          />
          <Text>
            Waiting for other players...
          </Text>
          <ButtonWrapper>
            <Button onClick={notReady}>
              Not Ready
            </Button>
          </ButtonWrapper>
        </ViewWrapper>
      );
    }

    return (
      <Wrapper>
        <TitleMain>Personalities Chooser</TitleMain>
        <TitleOptions>Options</TitleOptions>
        <TitleSelections>Selections</TitleSelections>
        <TypeTitle>Emotions</TypeTitle>
        {this.Options('emotions')}
        {this.Selections('emotions')}
        <TypeTitle>Beliefs</TypeTitle>
        {this.Options('beliefs')}
        {this.Selections('beliefs')}
        <TypeTitle>Personalities</TypeTitle>
        {this.Options('personalities')}
        {this.Selections('personalities')}
        <SubmitItem>
          <Button
            disabled={!this.allSelected()}
            onClick={() => submitAttrs(attrsChosen)}
          >
            Submit
          </Button>
        </SubmitItem>
        <PointsItem>
          remaining points: {remainingPoints}
        </PointsItem>
      </Wrapper>
    );
  }
}

export default AttrsChooser;
