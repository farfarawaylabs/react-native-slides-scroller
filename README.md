# @farfarawaylabs/react-native-slides-scroller

Beautiful slides scrollbar component for React Native

## Installation

This library is using react-native-reanimated V2. You should install it before using this library.

```sh
yarn add @farfarawaylabs/react-native-slides-scroller
```

## Installation

This library is based and inspired by the video tutorial from William Candillon (Can It Be Done In React Native). Find this and many other awesome videos on his YouTube channel: https://www.youtube.com/channel/UC806fwFWpiLQV5y-qifzHnA

## Demo

In th egithub reposiroty you can find an example project. Clone the repository, yarn and run "yarn example ios"

Please note that the following is an animated gif which is why the animations looks "choppy".

<img width="300" height="600" src="https://github.com/nechmads/demo_images/blob/master/react-native-animated-scroller.gif?raw=true">

## How to use this library?

```js
import { Scroller } from '@farfarawaylabs/react-native-slides-scroller';

// Have a ready set of items (slides) in json format or load them from DB
import { items } from './Model';

export default function App() {
  return (
    <View style={styles.container}>
      <Scroller items={items} />
    </View>
  );
}
```

### Items Structure

Each Slide/Item you pass to the scroller should be in the following structure:

```js

{
    title: 'Example title',
    subtitle: 'EXAMPLE SUBTITLE',
    picture: require('./assets/backgroundImage.jpg'),
    top: 0,
}

```

### Customization

You can customize the look of the Scroller and its items using the following properties:

```js
/** The background color of the scroller view. Defaults to black */
  backgroundColor?: string;

  /** The maximum height of each slide item. Defaults to half the screen height */
  maximumItemHeight?: number;

  /** The minimum height of each slide item. Defaults to 128 */
  minItemHeight?: number;

  /** Specify if the scroller should stop on each item or keep scrolling with velocity. Defaults to false */
  shouldSnapOnEachItem?: boolean;

  items: SlideItemInterface[];

  /** Additional styles to append to the scroller */
  style?: StyleProp<ViewStyle>;

  /** Additional style to add to the title of each item */
  slideTitleStyle?: StyleProp<TextStyle>;

  /** Additional style to add to the subtitle of each item */
  slideSubtitleStyle?: StyleProp<TextStyle>;

```

## License

MIT
