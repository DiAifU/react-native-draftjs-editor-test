
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Button
} from 'react-native';


export default class App extends Component<{}> {
  constructor() {
    super();
    this.webView = null;
    this.savedContent = null;
  }

  requestContent = () => {
    if (this.webView !== null)
      this.webView.postMessage(JSON.stringify({type: "request_content"}));
  }

  receiveContent = (message) => {
    try {
      var parsedData = JSON.parse(message.nativeEvent.data);
      if (parsedData.type === "content_state")
        this.savedContent = parsedData.data;
    }
    catch (e) {
      // message isn't JSON format, so not content_state
    }
  }

  restoreContent = () => {
    if (this.savedContent !== null && this.webView !== null)
      this.webView.postMessage(JSON.stringify({type: "restore_content", data:this.savedContent}));
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.webViewContainer}>
          <WebView 
            ref={webView => this.webView = webView}
            onMessage={(message) => this.receiveContent(message)}
            source={require('./editor_build/index.html')} 
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
        <View style={styles.buttonBar}>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.requestContent}
              title="Post"
              accessibilityLabel="Post message"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.restoreContent}
              title="Restore"
              accessibilityLabel="Restore content"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    backgroundColor: '#fefefe',
  },
  webViewContainer: {
    minHeight:300
  },
  buttonBar: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    paddingVertical:10,
    paddingHorizontal:40
  }
});
