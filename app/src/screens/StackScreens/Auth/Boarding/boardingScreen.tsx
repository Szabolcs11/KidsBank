import React, {useRef, useState} from 'react';
import {Animated, FlatList, View, ViewToken, Image} from 'react-native';
import {navigate} from '../../../../navigation/settings';
import {BoardItemType} from '../../../../types';
import BoardItem from './Components/BoardItem';
import Button from './Components/Button';
import Paginator from './Components/Paginator';
import {boardingStyle} from './boardingStyle';
import {storage} from '../../../../navigation';
import {MMKV_KEYS} from '../../../../constans';
// import boarding1 from './../../../../assets/Images/boarding1.png';

const data = [
  {
    id: 1,
    title: 'Üdvözlünk a Kölyök Bankban!',
    subtitle:
      'Ennek az alkalmazásnak a segítségével a gyerekek megtapasztalhatják a pénzkeresést és megtanulhatják a takarékoskodást.',
    // image: require('./../../../../assets/Images/boarding1.png'),
  },
  {
    id: 2,
    title: 'Család és pénzügyek',
    subtitle:
      'A Kölyök Bankban a szülők létrehozhatnak különféle feladatokat és pontokkal jutalmazhatják gyermekeiket. Ez a rendszer megtanítja a  gyerekeket a felelősségvállalásra és a pénzzel való gazdálkodásra.',
    // image: require('./../../../../assets/Images/boarding2.png'),
  },
  {
    id: 3,
    title: 'Türelem és spórolás',
    subtitle:
      'A Bank funkciónak köszönhetően a gyerekek befektethetik a megkeresett pontjaikat, amit kis türelemmel megsokszorozhatnak. ',
    // image: require('./../../../../assets/Images/boarding3.png'),
  },
  {
    id: 4,
    title: 'Pénzügyi célok',
    subtitle:
      'A szülők heti megbeszéléseket ütemezhetnek a gyerekek pénzügyeinek nyomon követésére és közösen célokat tűzhetnek ki. ',
    // image: require('./../../../../assets/Images/boarding4.png'),
  },
  {
    id: 5,
    title: 'Jutalom a gyerekeknek',
    subtitle:
      'A gyerekek a kemény munkával megkeresett pontjukat beválthatják különféle tárgyakra. A csokitól a játékokig bármire, természetesen amit a szülő is jóváhagy.  ',
    // image: require('./../../../../assets/Images/boarding5.png'),
  },
  {
    id: 6,
    title: 'Kinek ajánljuk?',
    subtitle:
      'Olyan családoknak, akik gyermekeiket szeretnék pénzügyileg tudatosan nevelni. Elsősorban 6 éves kortól ajánljuk.',
    // image: require('./../../../../assets/Images/boarding6.png'),
  },
  {
    id: 7,
    title: 'Regisztráció és Bejelentkezés',
    subtitle:
      'Készen álltok? Csatlakozzatok közösségünkhöz, és tapasztaljátok meg a Kölyök Bank előnyeit!',
    // image: require('./../../../../assets/Images/boarding1.png'),
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
    storage.set(MMKV_KEYS.WATCHEDLANDINGPAGE, 'true');
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
