# Editor with Draft-JS in React Native 


## Prerequisites

The app was only tested on Android Nougat 7.1 API 25 in Simulator.
Some build steps are specific to windows platform. A comment will be added for others.

This ReadMe will use yarn but npm also works.

## Installing

First build the editor :

```
cd react_editor
yarn build
```

On Windows : 

```
yarn copy
```

Other platforms : Copy the build folder content to ../react_native_app/editor_build.



This will build a working Editor which can be tested on desktop by running a server using the command :

```
yarn start
```


Then build the React Native app :

```
cd react_native_app
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

* `draft-js-mention-plugin/lib/mentionSuggestionsStrategy.js` : Replaced original regex `(s|^)` by `(\\s|^)` to allow spaces to trigger suggestions
* `draft-js-mention-plugin/lib/modifiers/addMention.js` : Added the possibility to load the property `displayName` instead of `name` (when existing) to show the mention with a different name than the suggestion (ex: suggestion is `Matthew Russell`, text displayed will be `@matthew`)