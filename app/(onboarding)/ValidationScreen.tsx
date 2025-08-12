import React, {useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Validation: {emotion: string};
};

type ValidationScreenRouteProp = RouteProp<RootStackParamList, 'Validation'>;

const emotionHeadings: {[key: string]: string} = {
  Anxious: 'For moments of anxiety, there is a word of peace.',
  Grateful: 'For moments of gratitude, there is a word of praise.',
  Overwhelmed: 'For moments of being overwhelmed, there is a word of calm.',
  Hopeful: 'For moments of hope, there is a word of encouragement.',
  Lost: 'For moments of feeling lost, there is a word of guidance.',
  Default: 'For this moment, there is a word for you.',
};

const ValidationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ValidationScreenRouteProp>();

  const emotion = route.params?.emotion || 'Default';
  const headingText = emotionHeadings[emotion] || emotionHeadings.Default;

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Переход на Screen 3...');
      navigation.navigate('RewardScreen');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.statusText}>Finding a word for you...</Text>

        <Text style={styles.heading}>{headingText}</Text>

        <Text style={styles.blurredText} blurRadius={5}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  statusText: {
    fontSize: 16,
    color: '#8A8A8E',
    marginBottom: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 38,
  },
  blurredText: {
    fontSize: 16,
    color: '#D1D1D6',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ValidationScreen;
