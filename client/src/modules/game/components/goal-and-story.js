import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
  width: 40%;
`;
const GoalItem = styled.div`
  font-size: 16px;
  padding: 0 20px;
  margin-top: 20px;
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
      Description: {story}
    </StoryItem>
  </Wrapper>
);

export default GoalAndStory;
