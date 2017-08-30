import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { List } from 'immutable';
import NavBar from './nav-bar';
import GoalAndStory from './goal-and-story';
import CharacterIntro from './character-intro';
import PersonalitiesView from './personalities-view';

const Wrapper = styled.div`
  height: 100%;
`;
const TopPane = styled.div`
  height: 40px;
`;
const MiddlePane = styled.div`
  height: calc(100% - 240px);
  min-height: 200px;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
`;
const BottomPane = styled.div`
  height: 200px;
  display: flex;
`;

const goal = 'Be a good programmer';
const story = 'I grew up in China...';
const characterName = 'Keping';
const characterIntro = 'Programmer';
const emotions = List(['happy', 'sad', 'happier']);
const beliefs = List(['nationalism', 'socialism', 'science']);
const personalities = List(['brave', 'cautious', 'stupid']);

const Game = ({ history }) => (
  <Wrapper>
    <TopPane>
      <NavBar exit={() => history.push('/dashboard')} />
    </TopPane>
    <MiddlePane></MiddlePane>
    <BottomPane>
      <GoalAndStory goal={goal} story={story} />
      <CharacterIntro name={characterName} intro={characterIntro} />
      <PersonalitiesView {...{ emotions, beliefs, personalities }} />
    </BottomPane>
  </Wrapper>
);

export default withRouter(Game);
