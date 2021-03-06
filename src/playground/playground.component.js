import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { VideoPlayer } from './components/video.component';
import { Form } from './components/form.component';
import { handlePlayerEvent, handleSourceChange } from './actions';

const PlaygroundContainer = styled.div`
  display: flex;

  height: 500px;
`;

const InfoContainer = styled.div`
  flex: 1;

  padding: 20px;
`;

const Playground = props => {
  const { source, events } = props;

  return (
    <PlaygroundContainer>
      <InfoContainer>
        <h2>Source</h2>
        <Form onSubmit={props.handleSourceChange} source={source} />
        <h2>Events</h2>
        {events.map(({ type, triggeredAt }) => <p key={`${type}-${triggeredAt}`}>{type}</p>)}
      </InfoContainer>
      {source && <VideoPlayer source={source} onPlayerEvent={props.handlePlayerEvent} />}
    </PlaygroundContainer>
  );
};

Playground.propTypes = {
  events: PropTypes.array,
  source: PropTypes.string,
  handlePlayerEvent: PropTypes.func.isRequired,
  handleSourceChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  events: state.playground.events,
  source: state.playground.source,
});

const mapDispatchToProps = dispatch => ({
  handlePlayerEvent: event => dispatch(handlePlayerEvent(event)),
  handleSourceChange: value => dispatch(handleSourceChange(value)),
});

export const ConnectedPlayground = connect(mapStateToProps, mapDispatchToProps)(Playground);
