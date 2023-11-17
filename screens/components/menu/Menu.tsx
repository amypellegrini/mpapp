import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type MenuProps = {
  componentId: string;
};

function Menu({componentId}: MenuProps) {
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
          color="#DFDFDF"
        />
        <Text style={styles.menuButtonText}>Dashboard</Text>
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
        <MaterialCommunityIcon name="music" size={30} color="#DFDFDF" />
        <Text style={styles.menuButtonText}>Practice</Text>
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
          color="#DFDFDF"
        />
        <Text style={styles.menuButtonText}>Daily Plan</Text>
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
        <FoundationIcon name="target" size={30} color="#DFDFDF" />
        <Text style={styles.menuButtonText}>Goals</Text>
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
          color="#DFDFDF"
        />
        <Text style={styles.menuButtonText}>Journal</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  entryItem: {
    borderRadius: 4,
    backgroundColor: '#DFDFDF',
    padding: 5,
    paddingLeft: 10,
    paddingBottom: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#666666',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: '#D11111',
    borderColor: '#B11111',
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    marginLeft: 5,
    width: 30,
    height: 30,
  },
  deleteButtonText: {
    fontFamily: 'Arial',
    textAlign: 'center',
    color: '#FAFAFA',
    fontWeight: '700',
    fontSize: 20,
    marginTop: -8,
  },
  entryItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  entryItemText: {
    color: '#111111',
  },
  h4: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EFEFEF',
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
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
