import React, { Component } from 'react';
import styled from 'styled-components';
import { List, fromJS } from 'immutable';
import SelectionItem from './selection-item';

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 100px auto 160px;
  grid-template-rows: 60px 30px;
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
  font-size: 18px;
  color: #ccc;
`;
const Options = styled.div`
  grid-column: 2 / 3;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;
const OptionItem = styled.div`
  display: inline-block;
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

const options = {
  emotions: List(['hello', 'what?', 'happy', 'sad', 'sasdf', 'abcvkljsdf', 'ablkv', 'asdnvlj', 'bvlkjewflkm', 'andsfb', 'kxcvjkls', 'xclkvn']),
  beliefs: List(['hellasd', 'what?', 'happy', 'sad', 'sasdf', 'abcvkljsdf', 'ablkv', 'asdnvlj', 'bvlkjewflkm', 'andsfb', 'kxcvjkls', 'xclkvn']),
};

const TOTAL_INTENSITY_POINTS = 10;
const MAX_INTENSITY = 3;

class PersonalitiesChooser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      remainingPoints: TOTAL_INTENSITY_POINTS - 4,
      attributes: fromJS({
        emotions: [
          {
            name: 'hello',
            intensity: 1,
          }, {
            name: 'what?',
            intensity: 1,
          }, {
            name: null,
            intensity: 0,
          },
        ],
        beliefs: [
          {
            name: 'hellasd',
            intensity: 1,
          }, {
            name: 'sad',
            intensity: 1,
          }, {
            name: null,
            intensity: 0,
          },
        ],
      }),
    };
  }

  decrease(attrType, attrName) {
    const nextState = Object.assign({}, this.state);

    const attrIdx = nextState.attributes.get(attrType)
      .findIndex(attr => attr.get('name') === attrName);
    nextState.attributes = nextState.attributes.updateIn(
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

    nextState.remainingPoints += 1;

    this.setState(nextState);
  }

  increase(attrType, attrName) {
    const nextState = Object.assign({}, this.state);

    const attrIdx = nextState.attributes.get(attrType)
      .findIndex(attr => attr.get('name') === attrName);
    nextState.attributes = nextState.attributes.updateIn(
      [attrType, attrIdx],
      attr => attr.update('intensity', intensity => intensity + 1),
    );

    nextState.remainingPoints += -1;

    this.setState(nextState);
  }

  select(attrType, attrName) {
    const nextState = Object.assign({}, this.state);

    let updateIdx = this.state.attributes.get(attrType)
      .findIndex(item => item.get('name') === null);
    if (updateIdx === -1) {
      updateIdx = 0;
      const originalAttr = nextState.attributes.getIn([attrType, updateIdx]);
      nextState.attributes = nextState.attributes.mergeIn(
        [attrType, updateIdx],
        {
          name: attrName,
          intensity: 1,
        },
      );
      nextState.remainingPoints += originalAttr.get('intensity') - 1;
    } else {
      if (nextState.remainingPoints === 0) {
        return;
      }
      nextState.attributes = nextState.attributes.mergeIn(
        [attrType, updateIdx],
        {
          name: attrName,
          intensity: 1,
        },
      );
      nextState.remainingPoints += -1;
    }

    this.setState(nextState);
  }

  deselect(attrType, attrName) {
    const nextState = Object.assign({}, this.state);

    const updateIdx = this.state.attributes.get(attrType)
      .findIndex(item => item.get('name') === attrName);

    nextState.attributes = nextState.attributes.mergeIn(
      [attrType, updateIdx],
      {
        name: null,
        intensity: 0,
      },
    );

    nextState.remainingPoints += this.state.attributes
      .getIn([attrType, updateIdx, 'intensity']);

    this.setState(nextState);
  }

  Options(attrType) {
    return (
      <Options>
        {options[attrType].map(attrName => (
          <OptionItem
            key={attrName}
            selected={this.state.attributes.get(attrType)
              .find(attr => attr.get('name') === attrName)}
            onClick={this.state.attributes.get(attrType)
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
    return (
      <Selections>
        {this.state.attributes.get(attrType).map((attr, idx) => (
          <SelectionItem
            key={idx}
            name={attr.get('name')}
            intensity={attr.get('intensity')}
            decrease={() => this.decrease(attrType, attr.get('name'))}
            increase={() => this.increase(attrType, attr.get('name'))}
            decreaseDisabled={attr.get('name') === null}
            increaseDisabled={attr.get('name') === null
              || attr.get('intensity') === MAX_INTENSITY
              || this.state.remainingPoints === 0}
          />
        ))}
      </Selections>
    );
  }

  render() {
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
        <SubmitItem>Submit</SubmitItem>
        <PointsItem>
          remaining points: {this.state.remainingPoints}
        </PointsItem>
      </Wrapper>
    );
  }
}

export default PersonalitiesChooser;
