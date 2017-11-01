import React from "react"
import { View, Button } from "react-native"

import { AssetTracker } from "../../components/asset-tracker/AssetNavigator"
import VideoExample from "../../components/VideoExample"
import Offer from "../../containers/dashboard/Offer"

const VIEW_MAPPING = {
  AssetTracker,
  VideoExample,
  Dashboard: Offer
}

/*
  navigation.state.params contains a `link` object, in the same format
  as `single_select` choices of type `link`. The `view` attribute of this
  link object should be a key in the VIEW_MAPPING above. This View is dynamically
  created using React.createElement below.
*/

const ChatModal = ({ navigation, modalClosed }) => {
  let content = React.createElement(
    VIEW_MAPPING[navigation.state.params.link.view],
    { navigation }
  )
  return (
    <View style={{ flex: 1, alignSelf: "stretch" }}>
      {/* <Button
        title="Close"
        onPress={() => {
          modalClosed()
          navigation.goBack()
        }}
      /> */}
      {content}
    </View>
  )
}

export default ChatModal
