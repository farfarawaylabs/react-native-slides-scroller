import React from 'react';
import {
  StyleProp,
  ViewProps,
  ViewStyle,
  Dimensions,
  TextStyle,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import Slide, { SlideItemInterface } from './Slide';

export interface ScrollerInterface extends ViewProps {
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
}

const Scroller: React.FC<ScrollerInterface> = ({
  backgroundColor = 'black',
  maximumItemHeight = Dimensions.get('window').height / 2,
  minItemHeight = 128,
  shouldSnapOnEachItem = false,
  items,
  slideTitleStyle,
  slideSubtitleStyle,
  style,
}) => {
  const y = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y: value } }) => {
      y.value = value;
    },
  });

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      scrollEventThrottle={16}
      snapToInterval={maximumItemHeight}
      disableIntervalMomentum={shouldSnapOnEachItem}
    >
      <Animated.View
        style={[
          {
            backgroundColor: backgroundColor,
            height: (items.length + 1) * maximumItemHeight,
          },
          style,
        ]}
      >
        {items.map((item, index) => (
          <Slide
            item={item}
            key={index}
            y={y}
            index={index}
            maximumItemHeight={maximumItemHeight}
            minItemHeight={minItemHeight}
            titleStyle={slideTitleStyle}
            subtitleStyle={slideSubtitleStyle}
          />
        ))}
      </Animated.View>
    </Animated.ScrollView>
  );
};

export default Scroller;
