import { connect } from 'react-redux';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { startStream, stopStream } from '../redux/Stream/stream.actions';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  padding: 0 1rem;
`;

const Input = styled.input.attrs((props) => ({
  type: 'text',
  placeholder: 'Search',
}))`
  flex: 1;
  color: white;
  border: none;
  border-bottom: 5px solid white;
  background: transparent;
  outline: none;
  height: 100px;
  font-size: 2rem;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 80vw;

  ::placeholder {
    color: white;
  }

  ::active {
    outline: none;
  }
`;

const InputSubmit = styled.div`
  color: $fff;
  border: 5px solid white;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  width: 50px;
  text-align: center;

  :hover {
    transform: translateY(-2px);
  }

  :active {
    transform: translateY(2px);
  }
`;

const Pulsate = keyframes`
0% {
  transform: scale(1);
}

50% {
  transform: scale(1.025);
}

100% {
  transform: scale(1);
}

`;

const StreamStatusActive = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  flex: 1;
  padding: 1rem 0;
  animation: ${Pulsate} 1s infinite;
`;

const StreamStatusInactive = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  flex: 1;
  padding: 1rem 0;
`;

function StreamInput({ streaming, startStream, stopStream }) {
  const [currentInput, setCurrentInput] = useState('');
  const [streamStatus, setStreamStatus] = useState('Search for something!');

  const startStreaming = async () => {
    if (currentInput.length <= 2) {
      return setStreamStatus('Please enter at least 3 characters!');
    } else {
      const res = await startStream(currentInput);
      setStreamStatus(res);
    }
  };

  const stopStreaming = async () => {
    const res = await stopStream();
    setStreamStatus(res);
  };

  return (
    <Container>
      <InputContainer>
        <Input
          onChange={(e) => setCurrentInput(e.target.value)}
          value={currentInput}
        />
        {streaming ? (
          <InputSubmit onClick={() => stopStreaming()}>Stop</InputSubmit>
        ) : (
          <InputSubmit onClick={() => startStreaming()}>Start</InputSubmit>
        )}
      </InputContainer>
      {streaming ? (
        <StreamStatusActive>{streamStatus}</StreamStatusActive>
      ) : (
        <StreamStatusInactive>{streamStatus}</StreamStatusInactive>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    streaming: state.stream.streaming,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startStream: (streamQuery) => dispatch(startStream(streamQuery)),
    stopStream: () => dispatch(stopStream()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamInput);
