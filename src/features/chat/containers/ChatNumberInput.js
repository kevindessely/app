import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { chatActions } from '../../../../hedvig-redux';
import { StyledTextInputContainer, StyledTextInput } from '../styles/chat';
import {
  SendIconButton,
  SendDisabledIconButton,
} from '../../../components/Button';

class ChatNumberInput extends React.Component {
  static propTypes = {
    message: PropTypes.object, // TODO Better definition of message type
    onChange: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
  };

  lastSentFor = undefined;

  _send = () => {
    if (!this.lastSentFor || this.lastSentFor !== this.props.message.globalId) {
      this.lastSentFor = this.props.message.globalId;
      this.props.send(this.props.message);
    }
  };

  render() {
    const { message, onChange } = this.props;
    let ButtonComponent =
      message._inputValue && message._inputValue.length > 0
        ? SendIconButton
        : SendDisabledIconButton;
    return (
      <StyledTextInputContainer>
        <StyledTextInput
          placeholder="Type here..."
          autoFocus
          keyboardType="numeric"
          value={message._inputValue || ''}
          underlineColorAndroid="transparent"
          onChangeText={(text) => onChange(message, text)}
          onSubmitEditing={this._send}
        />
        <ButtonComponent onPress={this._send} />
      </StyledTextInputContainer>
    );
  }
}

const mapStateToProps = (state) => {
  let message = state.chat.messages[0];
  return {
    message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (message, value) =>
      dispatch(chatActions.setResponseValue(message, value)),
    send: (message) =>
      dispatch(
        chatActions.sendChatResponse(message, {
          text: message._inputValue,
        }),
      ),
  };
};

const ChatNumberInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatNumberInput);

export default ChatNumberInputContainer;
