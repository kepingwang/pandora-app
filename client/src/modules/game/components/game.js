import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { List, Map } from 'immutable';
import NavBar from './nav-bar';
import GoalAndStory from './goal-and-story';
import CharacterIntro from './character-intro';
import PersonalitiesView from './personalities-view';
import Stats from './stats';
import Event from './event';
import OtherCharacters from './other-characters';
import PersonalitiesChooser from '../../personalities-chooser';
import ActionChooser from '../../action-chooser';

const Wrapper = styled.div`
  height: 100%;
`;
const TopPane = styled.div`
  height: 30px;
`;
const MiddlePane = styled.div`
  height: calc(100% - 190px);
  min-height: 200px;
  border-bottom: 1px solid #aaa;
  display: flex;
  overflow: hidden;
`;
const MiddleLeftPane = styled.div`
  height: 100%;
  width: 150px;
`;
const MiddleCenterPane = styled.div`
  height: 100%;
  width: calc(100% - 300px);
  min-width: 200px;
  border-left: 1px solid #aaa;
  border-right: 1px solid #aaa;
`;
const MiddleRightPane = styled.div`
  height: 100%;
  width: 150px;
`;
const BottomPane = styled.div`
  height: 160px;
  display: flex;
`;
const BottomLeftPane = styled.div`
  height: 100%;
  width: 33%;
`;
const BottomCenterPane = styled.div`
  height: 100%;
  width: 34%;
  border-left: 1px solid #aaa;
  border-right: 1px solid #aaa;
`;
const BottomRightPane = styled.div`
  height: 100%;
  width: 33%;
`;


const goal = 'Be a good programmer';
const story = 'I grew up in China...';
const characterName = 'Keping';
const characterIntro = 'Programmer';
const emotions = List(['happy', 'sad', 'happier']);
const beliefs = List(['nationalism', 'socialism', 'science']);
const personalities = List(['brave', 'cautious', 'stupid']);

const stats = Map({
  tension: 20,
  violence: 30,
  affluence: 30,
  influence: 30,
  wellBeing: 30,
  coinsPositive: 20,
  coinsNeutral: 5,
  coinsNegative: 10,
});
const event = Map({
  name: 'Comfort Woman Come Out',
  content: 'A comform woman, Somebody, came out to the press for her miserable experience.',
});
const otherCharacters = List(['Lilian', 'John', 'Tommy']);

const Game = ({ history }) => (
  <Wrapper>
    <TopPane>
      <NavBar exit={() => history.push('/dashboard')} />
    </TopPane>
    <MiddlePane>
      <MiddleLeftPane>
        <Stats stats={stats} />
        <Event event={event} />
      </MiddleLeftPane>
      <MiddleCenterPane>
        {
          /* <PersonalitiesChooser /> */
          <ActionChooser />
        }
      </MiddleCenterPane>
      <MiddleRightPane>
        <OtherCharacters characters={otherCharacters} />
      </MiddleRightPane>
    </MiddlePane>
    <BottomPane>
      <BottomLeftPane>
        <GoalAndStory goal={goal} story={story} />
      </BottomLeftPane>
      <BottomCenterPane>
        <CharacterIntro name={characterName} intro={characterIntro} />
      </BottomCenterPane>
      <BottomRightPane>
        <PersonalitiesView {...{ emotions, beliefs, personalities }} />
      </BottomRightPane>
    </BottomPane>
  </Wrapper>
);

export default withRouter(Game);
