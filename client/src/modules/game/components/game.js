import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar from '../../common/nav-bar';
import GoalAndStory from './goal-and-story';
import CharacterIntro from './character-intro';
import AttrsView from './attrs-view';
import Stats from './stats';
import Event from './event';
import OtherCharacters from './other-characters';
import AttrsChooser from '../attrs-chooser';
import ActionChooser from '../action-chooser';

const Wrapper = styled.div`
  height: 100%;
`;
const TopPane = styled.div`
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
  width: calc(50% - 180px);
`;
const BottomCenterPane = styled.div`
  height: 100%;
  width: calc(50% - 180px);
  border-left: 1px solid #aaa;
  border-right: 1px solid #aaa;
`;
const BottomRightPane = styled.div`
  height: 100%;
  width: 360px;
`;


class Game extends Component {

  componentDidMount() {
    this.props.syncGameInfo();
  }

  render() {
    const {
      characterName, description, goal, story,
      stats, globalStats, event, attrs, others, gameStatus,
      exitRoom, logout,
    } = this.props;
    return (
      <Wrapper>
        <TopPane>
          <NavBar
            buttons={[
              { name: 'Dashboard', onClick: () => exitRoom() },
              { name: 'Logout', onClick: () => logout() },
            ]}
          />
        </TopPane>
        <MiddlePane>
          <MiddleLeftPane>
            <Stats stats={stats.merge(globalStats)} />
            <Event event={event} />
          </MiddleLeftPane>
          <MiddleCenterPane>
            {
              gameStatus === 'choosing-attrs'
                ? <AttrsChooser />
                : <ActionChooser />
            }
          </MiddleCenterPane>
          <MiddleRightPane>
            <OtherCharacters characters={others} />
          </MiddleRightPane>
        </MiddlePane>
        <BottomPane>
          <BottomLeftPane>
            <GoalAndStory goal={goal} story={story} />
          </BottomLeftPane>
          <BottomCenterPane>
            <CharacterIntro name={characterName} description={description} />
          </BottomCenterPane>
          <BottomRightPane>
            <AttrsView
              emotions={attrs.get('emotions')}
              beliefs={attrs.get('beliefs')}
              personalities={attrs.get('personalities')}
            />
          </BottomRightPane>
        </BottomPane>
      </Wrapper>
    );
  }
}


export default Game;
