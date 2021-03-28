import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  StyleProp,
  TextStyle,
} from 'react-native';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export const MAX_HEIGHT = height / 2;

export interface SlideItemInterface {
  /** The title of the item */
  title: string;

  /** The subtitle of the item */
  subtitle: string;

  /** The background picture of the item */
  picture: number;

  /** For internal use. Do not set */
  top: number;
}

interface SlideInterface {
  index?: number;
  y?: Animated.SharedValue<number>;
  maximumItemHeight?: number;
  minItemHeight?: number;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  item: SlideItemInterface;
}

const Slide = ({
  y,
  index,
  maximumItemHeight = height / 2,
  minItemHeight = 128,
  subtitleStyle,
  titleStyle,
  item: { title, subtitle, picture },
}: SlideInterface) => {
  const style = useAnimatedStyle(() => {
    return {
      height: interpolate(
        y!.value,
        [(index! - 1) * maximumItemHeight, index! * maximumItemHeight],
        [minItemHeight, maximumItemHeight],
        Extrapolate.CLAMP
      ),
    };
  });
  const animatedTitleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      y!.value,
      [(index! - 1) * maximumItemHeight, index! * maximumItemHeight],
      [0, 1],
      Extrapolate.CLAMP
    );
    return {
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.container, { height: minItemHeight }, style]}>
      <Animated.Image source={picture} style={[styles.picture]} />
      <View
        style={[styles.titleContainer, { maxHeight: maximumItemHeight * 0.61 }]}
      >
        <Text style={[styles.subtitle, subtitleStyle]}>
          {subtitle.toUpperCase()}
        </Text>
        <View style={styles.mainTitle}>
          <Animated.View style={animatedTitleStyle}>
            <Text style={[styles.title, titleStyle]}>
              {title.toUpperCase()}
            </Text>
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'flex-end',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '500',
  },
  titleContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  mainTitle: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    padding: 32,
    transform: [{ translateY: 64 }],
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Slide;
