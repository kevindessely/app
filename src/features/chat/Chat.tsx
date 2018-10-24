import * as React from 'react';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { View, AppState, KeyboardAvoidingView } from 'react-native';
import styled from '@sampettersson/primitives';
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper';

import MessageList from './containers/MessageList';
import InputComponent from './components/InputComponent';
import { Loader } from '../../components/Loader';
import { chatActions, dialogActions } from '../../../hedvig-redux';
import * as selectors from './state/selectors';
import { NavigationOptions } from '../../navigation/options';
import { getMainLayout, setLayout } from '../../navigation/layout';
import {
  getOfferScreen,
  OFFER_GROUPS,
} from 'src/navigation/screens/offer/ab-test';
import {
  RESTART_BUTTON,
  CLOSE_BUTTON,
  GO_TO_DASHBOARD_BUTTON,
  SHOW_OFFER_BUTTON,
} from '../../navigation/screens/chat/buttons';

interface ChatProps {
  onboardingDone?: boolean;
  isModal?: boolean;
  showReturnToOfferButton?: boolean;
  componentId?: string;
  intent?: string;
  messages?: Array<object>;
  insurance?: any;
  getAvatars: () => void;
  getMessages: (intent: null | string) => void;
  showDashboard?: () => void;
  resetConversation?: () => void;
}

const KeyboardAvoid = styled(KeyboardAvoidingView)({
  flex: 1,
  ...ifIphoneX(
    {
      marginBottom: 20,
    },
    {
      marginBottom: 0,
    },
  ),
});

const Messages = styled(View)({
  flex: 1,
  alignSelf: 'stretch',
  paddingLeft: 16,
  paddingRight: 16,
});

const Response = styled(View)({
  alignItems: 'stretch',
  paddingTop: 8,
});

class Chat extends React.Component<ChatProps> {
  static defaultProps = { onboardingDone: false };
  _longPollTimeout: any = null;

  constructor(props: ChatProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }: any) {
    if (buttonId === RESTART_BUTTON.id) {
      this._resetConversation();
    }

    if (buttonId === CLOSE_BUTTON.id) {
      Navigation.dismissModal(this.props.componentId!);
    }

    if (buttonId === GO_TO_DASHBOARD_BUTTON.id) {
      setLayout(getMainLayout());
    }

    if (buttonId === SHOW_OFFER_BUTTON.id) {
      this._showOffer();
    }
  }

  componentDidMount() {
    this.props.getMessages(this.props.intent!);
    this.props.getAvatars();
    AppState.addEventListener('change', this._handleAppStateChange);
    this._startPolling();
  }

  componentDidUpdate() {
    this._startPolling();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    this._stopPolling();
  }

  getNavigationOptions = () => {
    const { onboardingDone, isModal, showReturnToOfferButton } = this.props;

    if (onboardingDone) {
      if (isModal) {
        return {
          topBar: {
            leftButtons: [CLOSE_BUTTON],
            rightButtons: [],
          },
        };
      }

      return {
        topBar: {
          leftButtons: [GO_TO_DASHBOARD_BUTTON],
          rightButtons: [],
        },
      };
    } else {
      if (showReturnToOfferButton) {
        {
          return {
            topBar: {
              leftButtons: [],
              rightButtons: [SHOW_OFFER_BUTTON],
            },
          };
        }
      }

      return {
        topBar: {
          leftButtons: [],
          rightButtons: [RESTART_BUTTON],
        },
      };
    }
  };

  _startPolling = () => {
    if (!this._longPollTimeout) {
      this._longPollTimeout = setInterval(() => {
        this.props.getMessages(this.props.intent!);
      }, 15000);
    }
  };

  _stopPolling = () => {
    if (this._longPollTimeout) {
      clearInterval(this._longPollTimeout);
      this._longPollTimeout = null;
    }
  };

  _handleAppStateChange = (appState: string) => {
    if (appState === 'active') {
      this.props.getMessages(this.props.intent!);
    }
  };

  _showOffer = async () => {
    this._stopPolling();
    const { screen, group } = await getOfferScreen();

    if (group === OFFER_GROUPS.OLD) {
      Navigation.showModal({
        stack: {
          children: [screen],
        },
      });
    } else {
      Navigation.push(this.props.componentId!, screen);
    }
  };

  _showDashboard = () => {
    this._stopPolling();
    this.props.showDashboard!();
  };

  _resetConversation = () => {
    this.props.resetConversation!();
  };

  render() {
    return (
      <NavigationOptions options={this.getNavigationOptions()}>
        <KeyboardAvoid
          keyboardVerticalOffset={isIphoneX() ? 85 : 60}
          behavior="padding"
          enabled={Platform.OS === 'ios'}
        >
          <Messages>
            {this.props.messages!.length ? <MessageList /> : <Loader />}
          </Messages>
          <Response>
            <InputComponent
              showOffer={this._showOffer}
              messages={this.props.messages}
            />
          </Response>
        </KeyboardAvoid>
      </NavigationOptions>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    messages: state.chat.messages,
    showReturnToOfferButton: selectors.shouldShowReturnToOfferScreenButton(
      state,
    ),
    insurance: state.insurance,
    intent: state.conversation.intent,
    onboardingDone: selectors.isOnboardingDone(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getMessages: (intent: null | string) =>
      dispatch(
        chatActions.getMessages({
          intent,
        }),
      ),
    getAvatars: () => dispatch(chatActions.getAvatars()),
    resetConversation: () =>
      dispatch(
        dialogActions.showDialog({
          title: 'Vill du börja om?',
          paragraph:
            'Om du trycker ja så börjar\nkonversationen om från början',
          confirmButtonTitle: 'Ja',
          dismissButtonTitle: 'Nej',
          onConfirm: () => dispatch(chatActions.resetConversation()),
          onDismiss: () => {},
        }),
      ),
    editLastResponse: () => dispatch(chatActions.editLastResponse()),
  };
};

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);

export default ChatContainer;
