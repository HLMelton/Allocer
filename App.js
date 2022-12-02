import * as React from 'react';
import { useEffect } from 'react';
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
import axios from 'axios';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

// Does putting your data fetching before your export mean its immutable? or is it just the equivalent of fetching before mount? 

// I'll get to this okay.... 
const apiExampleResponse = [
  {
    "imageData": "https://s3-movie-posters.s3.us-west-1.amazonaws.com/TheSilenceOfTheLambs.jpg",
    "rtAudience": 95, 
    "title": "The Silence of the Lambs", 
    "yearReleased": 1991
  }, 
  {
    "imageData": "https://s3-movie-posters.s3.us-west-1.amazonaws.com/Halloween.jpg", 
    "rtAudience": 89, 
    "title": "Halloween", 
    "yearReleased": 1978
  }, 
  {
    "imageData": "https://s3-movie-posters.s3.us-west-1.amazonaws.com/TheShining.jpg", 
    "rtAudience": 93, 
    "title": "The Shining", 
    "yearReleased": 1993
  }, 
  {
    "imageData": "https://s3-movie-posters.s3.us-west-1.amazonaws.com/AmericanPsycho.jpg", 
    "rtAudience": 85, 
    "title": "American Psycho", 
    "yearReleased": 2000
  }, 
  {
    "imageData": "https://s3-movie-posters.s3.us-west-1.amazonaws.com/Jaws.jpg", 
    "rtAudience": 90, 
    "title": "Jaws", 
    "yearReleased": 1975
  }
]

// let data = apiExampleResponse.map((movie, index) => ({
//   key: String(index),
//   photo: movie.imageData,
//   title: movie.title,
//   rating: movie.rtAudienceRating
// }));

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [movies, setMovies] = React.useState([]);

  const fetchData = () => {
    const baseURL = "https://pqwk4m8ok3.execute-api.us-west-1.amazonaws.com/dev/fetchMoviesFromDb-dev";
    const response = axios
      .get(`${baseURL}`)
      .then((response) => {
        response.data.Items.forEach(element => {
          setMovies(movies.push(element))
          console.log(element)
        });
        console.log(movies)
       }
      )
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Animated.FlatList 
        data={apiExampleResponse}
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
          // Add repeating behavior to carousel? 

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
                source={{uri: item.imageData}} 
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
            <View style={{
              height: '15%',
            }}>
              <Text 
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={{
                position:'relative',
                color:'#8ecae6',
                fontSize: 24,
                top: '20%',
                textAlign: 'center',
              }}>
                {item.title}
              </Text>
            </View>
            <View style={{

            }}>
              <Text 
                style={{
                  position:'absolute',
                  color:'#8ecae6',
                  left: 20,
                }}>
                  {item.rtAudience}
              </Text>
            </View>
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
