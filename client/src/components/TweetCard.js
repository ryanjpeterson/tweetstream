import React from 'react';
import styled, { keyframes } from 'styled-components';

const FadeIn = keyframes`
from {
  opacity: 0;
}

to {
  opacity: 1;
}`;

const TweetCardComponent = styled.div`
  background: var(--color-main-2-transparent);
  min-height: 150px;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(40, 40, 40, 0.05);
  box-sizing: border-box;
  animation: ${FadeIn} 0.5s;
  text-decoration: none;
  color: var(--color-main-3);

  :hover {
    transform: translateY(-2px);
  }

  :active {
    transform: translateY(2px);
  }
`;

const TweetCardUser = styled.div`
  display: flex;
  align-items: center;
`;

const TweetCardUserImage = styled.img`
  border-radius: 50%;
  margin-right: 1rem;
`;

const TweetCardText = styled.div`
  overflow-y: hidden;
`;

function TweetCard({
  tweet: {
    text,
    url,
    user: { screenName, profileImageUrl },
  },
}) {
  return (
    <TweetCardComponent as="a" href={url} target="_blank">
      <TweetCardUser>
        <TweetCardUserImage src={profileImageUrl} alt="user" />
        <h3>{screenName}</h3>
      </TweetCardUser>
      <TweetCardText>{text}</TweetCardText>
    </TweetCardComponent>
  );
}

export default TweetCard;
