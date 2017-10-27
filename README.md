# Editor with Draft-JS in React Native 


## Prerequisites

* An environment with React Native installed.
* The app was only tested on Android Nougat 7.1 API 25 in Simulator.
* This ReadMe will use yarn but npm also works.
* The Linux / OS X specific commands haven't been tested but should be working.

## Installing

First setup the editor :

```
cd react_editor
yarn install
```

Then copy modified files from plugins :

On windows :

```
copy modified_draftjs_mention_files\addMention.js node_modules\draft-js-mention-plugin\lib\modifiers\addMention.js
copy modified_draftjs_mention_files\mentionSuggestionsStrategy.js node_modules\draft-js-mention-plugin\lib\mentionSuggestionsStrategy.js
```

On Linux / OS X :

```
cp modified_draftjs_mention_files/addMention.js node_modules/draft-js-mention-plugin/lib/modifiers/addMention.js
cp modified_draftjs_mention_files/mentionSuggestionsStrategy.js node_modules/draft-js-mention-plugin/lib/mentionSuggestionsStrategy.js
```

Finally build the app :

```
yarn build
```

This will build a working Editor which can be tested on desktop by running a server using the command :

```
yarn start
```


Then copy the build to the React Native app :

On Windows : 

```
yarn copy
```

On Linux / OS X :

```
cp -R build ../react_native_app/editor_build/
```


Finally build the React Native app :

```
cd react_native_app
yarn install
react-native run-android # on run-ios (but untested)
```

Make sure a simulator is running or a device is connected for this last step.

## What was done in this project ?

* Build a React app with Draft-JS editor (with plugins capability)
* Implement two draftjs-mention-plugin :
*** One to mention someone with @
*** One to mention stocks with $
* Implement draftjs-hashtag-plugin to emphasize hashtags
* Implement a WebView in React Native app to load the Editor build
* Implement communication between the WebView and the app to :
*** Retrieve the ContentState of the Editor and be able to save it in a Draft-JS compatible format (Post button)
*** Restore the ContentState for demo purpose (Restore button)

## Draft-JS files modified

* `draft-js-mention-plugin/lib/modifiers/addMention.js` : Added the possibility to load the property `displayName` instead of `name` (when existing) to show the mention with a different name than the suggestion (ex: suggestion is `Matthew Russell`, text displayed will be `@matthew`)
* `draft-js-mention-plugin/lib/mentionSuggestionsStrategy.js` : Replaced original regex `(s|^)` by `(\\s|^)` to allow spaces to trigger suggestions
