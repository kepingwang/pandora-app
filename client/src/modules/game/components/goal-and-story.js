import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
  height: 100%;
`;
const GoalItem = styled.div`
  font-size: 16px;
  padding: 20px 20px 0;
`;
const StoryItem = styled.div`
  font-size: 14px;
  padding: 10px 20px;
`;

const GoalAndStory = ({ goal, story }) => (
  <Wrapper>
    <GoalItem>
      Goal: {goal}
    </GoalItem>
    <StoryItem>
      Story: {story}
    </StoryItem>
  </Wrapper>
);

export default GoalAndStory;
