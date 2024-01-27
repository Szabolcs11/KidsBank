import React, {useRef, useState} from 'react';
import {Animated, FlatList, View, ViewToken} from 'react-native';
import {navigate} from '../../../../navigation/settings';
import {BoardItemType} from '../../../../types';
import BoardItem from './Components/BoardItem';
import Button from './Components/Button';
import Paginator from './Components/Paginator';
import {boardingStyle} from './boardingStyle';

const data = [
  {
    id: 1,
    title: 'Welcome to KidsBank!',
    subtitle:
      'Welcome to KidsBank, the family-friendly app that teaches kids about saving and earning! Get ready to embark on a financial adventure with your children.',
    image: 'asd',
  },
  {
    id: 2,
    title: 'Family, Finance, Made Fun',
    subtitle:
      "In KidsBank, parents can create tasks for their children and reward them with virtual coins. It's a fun way to teach responsibility and financial management.",
    image: 'asd',
  },
  {
    id: 3,
    title: ' Real Rewards for Kids',
    subtitle:
      "Kids can spend their hard-earned coins on real-life items they love! From chocolates to toys, it's their savings brought to life.",
    image: 'asd',
  },
  {
    id: 4,
    title: 'Saving and Earning Together',
    subtitle:
      "Kids can also choose to save their virtual money in the 'Bank' for a return in the future. Parents can even schedule Weekly Meetings to track progress and set goals together.",
    image: 'asd',
  },
  {
    id: 5,
    title: 'Join Us / Sign Up',
    subtitle:
      'Ready to get started? Join our community and experience the best of KidsBank',
    image: 'asd',
  },
] as BoardItemType[];

export default function BoardingScreen() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewAbleItemChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      setCurrentIndex(viewableItems[0].index!);
    },
  ).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollToNext = () => {
    if (currentIndex < data.length - 1) {
      slidesRef.current?.scrollToIndex({index: currentIndex + 1});
    }
  };

  const handleNavigateToSingUp = () => {
    navigate('Register', {});
  };

  const handleNavigateToLogin = () => {
    navigate('Login', {});
  };

  return (
    <View style={boardingStyle.container}>
      <View style={{flex: 1, width: '100%'}}>
        <FlatList
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={(item: BoardItemType) => item.id.toString()}
          renderItem={({item}) => <BoardItem item={item} />}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          onViewableItemsChanged={viewAbleItemChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
        <Paginator data={data} scrollX={scrollX} />
        <View style={boardingStyle.fillbackground}>
          <Button
            endOfBoarding={handleNavigateToSingUp}
            handleNavigateToLogin={handleNavigateToLogin}
            last={currentIndex == data.length - 1}
            scrollToNext={scrollToNext}
          />
        </View>
      </View>
    </View>
  );
}
