import {
  View,
  Text,
  Dimensions,
  FlatList,
  Animated,
  FlatListProps,
} from 'react-native';
import React, {useRef, useState} from 'react';
import BoardItem from './Components/BoardItem';
import {BoardItemType} from '../../../../types';
import Paginator from './Components/Paginator';

const data = [
  {
    id: 1,
    title: 'asd',
    subtitle: 'Subtitle',
    image: 'asd',
  },
  {
    id: 2,
    title: 'asd2',
    subtitle: 'Subtitle',
    image: 'asd',
  },
  {
    id: 3,
    title: 'asd3',
    subtitle: 'Subtitle',
    image: 'asd',
  },
] as BoardItemType[];

const {width, height} = Dimensions.get('window');

export default function BoardingScreen() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewAbleItemChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flex: 3}}>
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
        <Paginator data={data} />
      </View>
    </View>
  );
}
