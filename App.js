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

// Convert this into an array of objects that can be returned from the DB
const images = [
  'https://resizing.flixster.com/g0gX2KmHSC3SeJuZab00ES1ud6c=/206x305/v2/https://resizing.flixster.com/CWLeRPnV_IVC3jaMpEj_sbBEU78=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzA2YTU5OTg5LTk4MzEtNDMwNS04ZmE5LTA4ODQxYjAyMzFlNi5wbmc=',
  'https://resizing.flixster.com/VugRiwPMAuksEKklXBz3_nKRtJg=/206x305/v2/https://flxt.tmsimg.com/assets/p24116_p_v12_at.jpg',
  'https://resizing.flixster.com/OTR1v73aB9BONphMxsDNrRU8LYc=/206x305/v2/https://resizing.flixster.com/Y2EVUWoQ-QO0ixvBZY1gX5_zW_Q=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMjcxZDIzMDktYmMxZi00YTY1LTkwNmQtYjU5YThjNjRmZDE0LnBuZw==',
  'https://resizing.flixster.com/99LrDMoB1XYddzApwfJtD7RBmP0=/206x305/v2/https://resizing.flixster.com/QJkeIM6LIvwmRGiLKrNBcpZIk8M=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzAwYzExZjlmLWJlODQtNDY4Mi1iNDhkLWU2YWNmMGIyMDgwMi5qcGc=',
  'https://resizing.flixster.com/M0e8zShu5HQwMb-DUY4xQqvQU5w=/206x305/v2/https://resizing.flixster.com/QS5CsJ4YfRk6_vxGP0xoOivl6iU=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzJkNzc5YmIxLTQzMTQtNDRmZC04NDA2LTAwYjEzYzJlNzZkOC53ZWJw',
];

const titles= [
  'Spirited', 
  'American Psycho',
  'Chainsaw Man',
  'Black Panther: Wakanda Forever',
  'Halloween'
];

const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
}));

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
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
            alignItems: 'center'
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
              color:'black',
              bottom: 55,
              left: 30,
              fontSize: 45,
            }}>
              Ligma part 
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
