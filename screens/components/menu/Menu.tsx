import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type MenuProps = {
  componentId: string;
  current: 'dashboard' | 'practice' | 'dailyPlan' | 'goals' | 'journal';
};

function Menu({componentId, current}: MenuProps) {
  return (
    <View
      style={{
        backgroundColor: '#444444',
        margin: 0,
        flexDirection: 'row',
        height: 65,
      }}>
      <Pressable
        style={[styles.menuButton]}
        onPress={() => {
          Navigation.push(componentId, {
            component: {
              name: 'com.myApp.Dashboard',
            },
          });
        }}>
        <IoniconsIcon
          style={[
            {
              paddingTop: 3,
              paddingBottom: 2,
            },
          ]}
          name="stats-chart"
          size={25}
          color={current === 'dashboard' ? '#66BBFF' : '#DFDFDF'}
        />
        <Text
          style={[
            styles.menuButtonText,
            {
              color: current === 'dashboard' ? '#66BBFF' : '#DFDFDF',
            },
          ]}>
          Dashboard
        </Text>
      </Pressable>
      <Pressable
        style={styles.menuButton}
        onPress={() => {
          Navigation.push(componentId, {
            component: {
              name: 'com.myApp.PracticeMenu',
            },
          });
        }}>
        <MaterialCommunityIcon
          name="music"
          size={30}
          color={current === 'practice' ? '#66BBFF' : '#DFDFDF'}
        />
        <Text
          style={[
            styles.menuButtonText,
            {
              color: current === 'practice' ? '#66BBFF' : '#DFDFDF',
            },
          ]}>
          Practice
        </Text>
      </Pressable>
      <Pressable
        style={styles.menuButton}
        onPress={() => {
          Navigation.push(componentId, {
            component: {
              name: 'com.myApp.DailyPlan',
            },
          });
        }}>
        <MaterialCommunityIcon
          name="file-document-edit-outline"
          size={30}
          color={current === 'dailyPlan' ? '#66BBFF' : '#DFDFDF'}
        />
        <Text
          style={[
            styles.menuButtonText,
            {
              color: current === 'dailyPlan' ? '#66BBFF' : '#DFDFDF',
            },
          ]}>
          Daily Plan
        </Text>
      </Pressable>
      <Pressable
        style={styles.menuButton}
        onPress={() => {
          Navigation.push(componentId, {
            component: {
              name: 'com.myApp.Goals',
            },
          });
        }}>
        <FoundationIcon
          name="target"
          size={30}
          color={current === 'goals' ? '#66BBFF' : '#DFDFDF'}
        />
        <Text
          style={[
            styles.menuButtonText,
            {
              color: current === 'goals' ? '#66BBFF' : '#DFDFDF',
            },
          ]}>
          Goals
        </Text>
      </Pressable>
      <Pressable
        style={styles.menuButton}
        onPress={() => {
          Navigation.push(componentId, {
            component: {
              name: 'com.myApp.PracticeJournal',
            },
          });
        }}>
        <MaterialCommunityIcon
          name="book-music-outline"
          size={30}
          color={current === 'journal' ? '#66BBFF' : '#DFDFDF'}
        />
        <Text
          style={[
            styles.menuButtonText,
            {
              color: current === 'journal' ? '#66BBFF' : '#DFDFDF',
            },
          ]}>
          Journal
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButtonText: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '600',
    height: 20,
  },
  menuButton: {
    paddingTop: 5,
    margin: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Menu;
