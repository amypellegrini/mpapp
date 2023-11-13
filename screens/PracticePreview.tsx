import React from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import {
  Navigation,
  NavigationProps,
  OptionsModalPresentationStyle,
  OptionsModalTransitionStyle,
} from 'react-native-navigation';
import {createMachine, assign} from 'xstate';
import {useMachine} from '@xstate/react';

import Title from './components/title';
import Main from './components/main';
import Container from './components/container';
import commonStyles from './components/commonStyles';
import RealmProviderWrapper, {
  PracticeEntrySummary,
} from './RealmProviderWrapper';
import {useQuery} from '@realm/react';

type ChangeEntryTitleEvent = {
  type: 'CHANGE_ENTRY_TITLE';
  value: string;
};

type FocusEntryTitleEvent = {
  type: 'FOCUS_ENTRY_TITLE';
};

type BlurEntryTitleEvent = {
  type: 'BLUR_ENTRY_TITLE';
};

type PracticePreviewEvent =
  | ChangeEntryTitleEvent
  | FocusEntryTitleEvent
  | BlurEntryTitleEvent;

type PracticePreviewContext = {
  entryTitle: string;
};

const practicePreviewMachine = createMachine<
  PracticePreviewContext,
  PracticePreviewEvent
>({
  predictableActionArguments: true,
  initial: 'idle',
  context: {
    entryTitle: '',
  },
  states: {
    idle: {
      on: {
        FOCUS_ENTRY_TITLE: 'entryTitleFocused',
      },
    },
    entryTitleFocused: {
      on: {
        BLUR_ENTRY_TITLE: {
          target: 'idle',
        },
        CHANGE_ENTRY_TITLE: {
          actions: assign({
            entryTitle: (_, event) => {
              return event.value;
            },
          }),
        },
      },
    },
  },
});

function PracticePreviewContent({componentId}: NavigationProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [current, send] = useMachine(practicePreviewMachine);
  const previousEntries = useQuery<PracticeEntrySummary>(
    'PracticeEntrySummary',
  );

  return (
    <Container>
      <Main>
        <Title>The Music Practice App</Title>
        <Text
          style={[
            commonStyles.h4,
            {
              color: isDarkMode ? '#EFEFEF' : '#202020',
            },
          ]}>
          What are you playing?
        </Text>
        <TextInput
          placeholder='Practice entry title (e.g. "Moonlight Sonata")'
          onFocus={() => send('FOCUS_ENTRY_TITLE')}
          onBlur={event => {
            send('BLUR_ENTRY_TITLE');
          }}
          onChangeText={value => {
            send('CHANGE_ENTRY_TITLE', {value});
          }}
          value={current.context.entryTitle}
          style={[
            commonStyles.input,
            {
              color: isDarkMode ? '#BFBFBF' : '#666666',
              borderBottomColor: isDarkMode ? '#BFBFBF' : '#666666',
            },
          ]}
          placeholderTextColor={isDarkMode ? '#BFBFBF' : '#666666'}
        />
        {current.matches('entryTitleFocused') && (
          <ScrollView
            style={{
              borderColor: isDarkMode ? '#BFBFBF' : '#666666',
              borderWidth: 1,
            }}
            keyboardShouldPersistTaps={'handled'}>
            {previousEntries.map((entry, index) => (
              <Pressable
                key={index}
                style={[
                  commonStyles.p10,
                  {
                    borderBottomColor: isDarkMode ? '#BFBFBF' : '#666666',
                    borderBottomWidth: 1,
                    backgroundColor: '#EFEFEF',
                  },
                ]}
                onPress={event => {
                  send('CHANGE_ENTRY_TITLE', {value: entry.title});
                  send('BLUR_ENTRY_TITLE');
                }}>
                <Text style={[{color: '#444444'}]}>{entry.title}</Text>
              </Pressable>
            ))}
          </ScrollView>
        )}
        {current.matches('idle') && (
          <>
            <Pressable
              style={styles.entryFieldButton}
              onPress={() => {
                Navigation.showModal({
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'com.myApp.EntryFieldModal',
                          options: {
                            modalTransitionStyle:
                              OptionsModalTransitionStyle.coverVertical,
                            modalPresentationStyle:
                              OptionsModalPresentationStyle.overCurrentContext,
                          },
                        },
                      },
                    ],
                  },
                });
              }}>
              <View style={styles.plusButton}>
                <Text style={styles.plusIcon}>+</Text>
              </View>
              <Text
                style={[
                  styles.entryFieldText,
                  {
                    color: isDarkMode ? '#BFBFBF' : '#666666',
                  },
                ]}>
                Add entry field (e.g. key, time signature, etc.)
              </Text>
            </Pressable>
          </>
        )}
      </Main>
      {current.matches('idle') && (
        <Pressable
          disabled={current.context.entryTitle.length === 0}
          style={({pressed}) => {
            let backgroundColor = pressed ? '#2255DD' : '#3366EE';

            if (current.context.entryTitle.length === 0) {
              backgroundColor = '#666666';
            }

            return [
              {
                backgroundColor,
              },
              styles.button,
              commonStyles.m6,
            ];
          }}
          onPress={() => {
            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.Practice',
                passProps: {
                  entryTitle: current.context.entryTitle,
                },
              },
            });
          }}>
          <Text
            style={[
              styles.buttonText,
              {
                color: isDarkMode ? '#BFBFBF' : '#FFFFFF',
              },
            ]}>
            Start practice
          </Text>
        </Pressable>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 20,
    height: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button: {
    borderRadius: 4,
    height: 60,
  },
  entryFieldButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryFieldText: {
    height: 30,
    marginLeft: 1,
    marginBottom: -7,
    fontStyle: 'italic',
  },
  plusButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EFEFEF',
    margin: 5,
    marginLeft: 0,
  },
  plusIcon: {
    marginTop: -5,
    height: 30,
    width: 30,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#666666',
  },
});

function PracticePreview(props: NavigationProps): JSX.Element {
  return (
    <RealmProviderWrapper>
      <PracticePreviewContent {...props} />
    </RealmProviderWrapper>
  );
}

export default PracticePreview;
