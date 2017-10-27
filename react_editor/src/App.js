import React, { Component } from 'react';

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import 'draft-js/dist/Draft.css';
import editorStyles from './editorStyles.css';

import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';
import { nameMentions, stockMentions } from './mentions';

import createHashtagPlugin from 'draft-js-hashtag-plugin';
import 'draft-js-hashtag-plugin/lib/plugin.css';






export default class App extends Component {
  constructor() {
    super();

    this.nameMentionPlugin = createMentionPlugin({
      nameMentions,
      mentionPrefix: '@',
      mentionTrigger: "@"
    });
    this.stockMentionPlugin = createMentionPlugin({
      stockMentions,
      mentionPrefix: '$',
      mentionTrigger: "$"
    });
    this.hashtagPlugin = createHashtagPlugin();

    document.addEventListener("message", (event) => {
      try {
        console.log(event.data);
        var parsedData = JSON.parse(event.data);
        if (parsedData.type === "request_content")
          this.sendContent();
        else if (parsedData.type === "restore_content")
          this.restoreContent(parsedData.data)
      }
      catch (e) { }
    });

  }

  state = {
    editorState: EditorState.createEmpty(),
    nameSuggestions: nameMentions,
    stockSuggestions: stockMentions
  };

  sendContent = () => {
    const rawContent = JSON.stringify({type:"content_state", data: convertToRaw(this.state.editorState.getCurrentContent())});
    window.postMessage(rawContent, '*');
  }

  restoreContent = (content) => {
    const contentState = convertFromRaw(content);
    const editorState = EditorState.push(this.state.editorState, contentState);
    this.setState({editorState});
  }



  onChange = (editorState) => {
    this.setState({editorState});
  }


  onNameSearchChange = ({value}) => {
    this.setState({
      nameSuggestions: defaultSuggestionsFilter(value, nameMentions)
    });
  }

  onStockSearchChange = ({value}) => {
    this.setState({
      stockSuggestions: defaultSuggestionsFilter(value, stockMentions)
    });
  }

  focus = () => {
    this.editor.focus();
  }

  render() {
    const {MentionSuggestions:NameMentionSuggestions} = this.nameMentionPlugin;
    const {MentionSuggestions:StockMentionSuggestions} = this.stockMentionPlugin;

    const plugins = [this.stockMentionPlugin, this.nameMentionPlugin, this.hashtagPlugin];
    return (
      <div className='editor' onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          placeholder="Try me"
          ref={(element) => {this.editor = element}}
        />
        <StockMentionSuggestions
          onSearchChange={this.onStockSearchChange}
          suggestions={this.state.stockSuggestions}
        />
        <NameMentionSuggestions
          onSearchChange={this.onNameSearchChange}
          suggestions={this.state.nameSuggestions}
        />
      </div>
    );
  }
}


