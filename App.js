import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

// Set as return 
const movies = [{
  image: 'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UX190_CR0,4,190,281_',
  title: 'The Shining',
  score: '5',
},{
  image: 'https://m.media-amazon.com/images/M/MV5BZTM2ZGJmNjQtN2UyOS00NjcxLWFjMDktMDE2NzMyNTZlZTBiXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UX190_CR0,0,190,281_',
  title: 'American Psycho',
  score: '5',
},{
  image: 'https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_QL75_UX190_CR0,5,190,281_',
  title: 'Jaws',
  score: '5',
},{
  image: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UY281_CR0,0,190,281_',
  title: 'Silence of the Lambs',
  score: '5',
},{
  image: 'https://m.media-amazon.com/images/M/MV5BNzk1OGU2NmMtNTdhZC00NjdlLWE5YTMtZTQ0MGExZTQzOGQyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UX190_CR0,5,190,281_',
  title: 'Halloween',
  score: '5',
}]

const data = movies.map((movie, index) => ({
  key: String(index),
  photo: movie.image,
  title: movie.title
}));

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  // Need to figure out how to handle state in this library
  // this.state = {
  //   title: background[index]
  // }

  return (
    <View style={styles.container}>
      <StatusBar />
      <Animated.FlatList 
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        showHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset:{x: scrollX}}}],
          {useNativeDriver: true }
        )}
        renderItem={({item, index }) => {
          const inputRange = [
            (index -1) * width,
            index * width,
            (index+1) * width
          ]

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          })

          return (
          <View 
          style={{
            width, 
            justifyContent: 'center', 
            alignItems: 'center',
            margin: 0,
          }}>
            <View style={{
                borderRadius: 18,
                shadowColor: '#000',
                shadowOpacity: 1,
                shadowRadius: 10,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                borderRadius: 18,
                padding: 12,
                backgroundColor: 'white',
            }}>
              <View style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                overflow: 'hidden',
                alignItems: 'center',
                borderRadius: 14,
              }}>
                <Animated.Image 
                source={{uri: item.photo}} 
                style={{
                  width: ITEM_WIDTH * 1.3,
                  height: ITEM_HEIGHT,
                  resizeMode:'cover',
                  transform: [
                    {
                      translateX,
                    }
                  ]
                }}/>
              </View>
            </View>
            <Text style={{
              position:'absolute',
              color:'#8ecae6',
              bottom: 25,
              left: 30,
              fontSize: 45,
            }}>
              {item.title} 
            </Text>
          </View>
          );
        }
      }
      
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#023047',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
