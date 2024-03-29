import React, {useEffect} from 'react';

import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import {Navigation, NavigationProps} from 'react-native-navigation';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMachine} from '@xstate/react';

import Title from '../components/title';
import Main from '../components/main';
import Container from '../components/container';
import commonStyles from '../components/commonStyles';
import RealmProviderWrapper, {
  Completed,
  PracticeEntrySummary,
  Skipped,
} from '../RealmProviderWrapper';
import {useQuery} from '@realm/react';
import H2 from '../components/Typography/H2';
import Button from '../components/button';
import practicePreviewMachine from './practicePreviewMachine';

interface PracticePreviewProps extends NavigationProps {
  entryTitle?: string;
  bpm?: number;
}

function PracticePreviewContent({
  componentId,
  bpm,
  entryTitle,
}: PracticePreviewProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [current, send] = useMachine(practicePreviewMachine, {
    context: {
      entryTitle: entryTitle || '',
      entryFields: {
        bpm: {
          active: bpm !== undefined,
          value: bpm || 120,
        },
      },
    },
  });

  const skipped = useQuery<Skipped>('Skipped')[0];
  const completed = useQuery<Completed>('Completed')[0];

  const previousEntries = useQuery<PracticeEntrySummary>('PracticeEntrySummary')
    .filtered(`title CONTAINS[c] $0`, current.context.entryTitle)
    .filter(
      entry =>
        !skipped.entryTitles[entry.title.replace(/\./g, '')] &&
        !completed.entryTitles[entry.title.replace(/\./g, '')],
    );

  const titleInputRef = React.useRef<TextInput>(null);

  const handleTitleBlur = () => {
    titleInputRef.current?.blur();
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleTitleBlur,
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

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
          ref={titleInputRef}
          placeholder='Practice entry title (e.g. "Moonlight Sonata")'
          onFocus={() => send('FOCUS_ENTRY_TITLE')}
          onEndEditing={() => {
            send('BLUR_ENTRY_TITLE');
          }}
          onBlur={event => {
            send('BLUR_ENTRY_TITLE');
          }}
          onChange={event => {
            send('CHANGE_ENTRY_TITLE', {value: event.nativeEvent.text});
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
        {previousEntries.length > 0 && current.matches('entryTitleFocused') && (
          <ScrollView style={{}} keyboardShouldPersistTaps={'handled'}>
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
                  handleTitleBlur();
                }}>
                <Text style={[{color: '#444444'}]}>{entry.title}</Text>
              </Pressable>
            ))}
          </ScrollView>
        )}
        {current.context.entryFields.bpm.active && (
          <View
            style={[
              commonStyles.flexRow,
              commonStyles.mt20,
              {
                justifyContent: 'space-between',
              },
            ]}>
            <Pressable
              onPress={() => {
                send('DECREASE_BPM');
              }}
              style={[
                {
                  paddingHorizontal: 10,
                  marginLeft: 20,
                },
              ]}>
              <MaterialCommunityIcon
                name="minus"
                size={35}
                color={'#BFBFBF'}
                style={[
                  styles.fieldButton,
                  {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  },
                ]}
              />
            </Pressable>
            <View
              style={[
                {
                  width: 100,
                },
              ]}>
              <Text
                style={[
                  {
                    fontSize: 12,
                    textAlign: 'center',
                    fontWeight: '600',
                  },
                ]}>
                BPM
              </Text>
              <TextInput
                keyboardType="numeric"
                onChangeText={value => {
                  send('CHANGE_BPM', {
                    value: value === '' ? 0 : parseInt(value),
                  });
                }}
                onBlur={() => {
                  if (current.context.entryFields.bpm.value === 0) {
                    send('CHANGE_BPM', {value: 120});
                  }
                }}
                style={[
                  commonStyles.input,
                  commonStyles.textCenter,
                  {
                    verticalAlign: 'bottom',
                    height: 48,
                    fontSize: 26,
                    color: isDarkMode ? '#BFBFBF' : '#666666',
                    borderBottomColor: isDarkMode ? '#BFBFBF' : '#666666',
                  },
                ]}
                value={
                  current.context.entryFields.bpm.value === 0
                    ? ''
                    : current.context.entryFields.bpm.value.toString()
                }
                placeholderTextColor={isDarkMode ? '#BFBFBF' : '#666666'}
              />
            </View>
            <Pressable
              onPress={() => {
                send('INCREASE_BPM');
              }}
              style={[
                {
                  paddingHorizontal: 10,
                },
              ]}>
              <MaterialCommunityIcon
                name="plus"
                size={35}
                color={'#BFBFBF'}
                style={[
                  styles.fieldButton,
                  {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  },
                ]}
              />
            </Pressable>
            <Pressable
              style={[styles.fieldButton]}
              onPress={() => {
                send('REMOVE_ENTRY_FIELD', {value: 'bpm'});
              }}>
              <MaterialCommunityIcon
                name="close-box"
                size={35}
                color={'#EFEFEF'}
                style={{
                  marginTop: -4,
                  marginRight: -4,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}
              />
            </Pressable>
          </View>
        )}
        {current.matches('idle') && (
          <>
            <Pressable
              style={[styles.entryFieldButton, commonStyles.mt30]}
              onPress={() => {
                send('OPEN_ENTRY_FIELD_MENU');
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
      {current.matches('addingEntryField') && (
        <View
          style={[
            commonStyles.pt10,
            {
              borderTopColor: '#444444',
              borderTopWidth: 3,
              backgroundColor: isDarkMode ? '#191919' : '#EFEFEF',
            },
          ]}>
          <View style={[commonStyles.ph20]}>
            <H2>Tap to add entry fields</H2>
            <View
              style={[
                commonStyles.flexRow,
                commonStyles.mt10,
                {
                  flexWrap: 'wrap',
                },
              ]}>
              {!current.context.entryFields.bpm.active && (
                <Pressable
                  onPress={() => {
                    send({
                      type: 'ADD_ENTRY_FIELD',
                      value: 'bpm',
                    });
                  }}
                  style={[
                    {
                      backgroundColor: '#DDDDDD',
                      height: 35,
                    },
                    commonStyles.mr10,
                    commonStyles.mb10,
                    commonStyles.br15,
                    commonStyles.br20,
                  ]}>
                  <Text
                    style={[
                      {
                        color: '#444444',
                      },
                      commonStyles.p5,
                      commonStyles.ph20,
                      commonStyles.bold,
                    ]}>
                    Beats per minute (BPM)
                  </Text>
                </Pressable>
              )}
              <Pressable
                style={[
                  {
                    backgroundColor: '#DDDDDD',
                    height: 35,
                  },
                  commonStyles.mr10,
                  commonStyles.mb10,
                  commonStyles.br15,
                  commonStyles.br20,
                ]}>
                <Text
                  style={[
                    {
                      color: '#444444',
                    },
                    commonStyles.p5,
                    commonStyles.ph20,
                    commonStyles.bold,
                  ]}>
                  Style
                </Text>
              </Pressable>
              <Pressable
                style={[
                  {
                    backgroundColor: '#DDDDDD',
                    height: 35,
                  },
                  commonStyles.mr10,
                  commonStyles.mb10,
                  commonStyles.br15,
                  commonStyles.br20,
                ]}>
                <Text
                  style={[
                    {
                      color: '#444444',
                    },
                    commonStyles.p5,
                    commonStyles.ph20,
                    commonStyles.bold,
                  ]}>
                  Author
                </Text>
              </Pressable>
            </View>
          </View>
          <Button
            style={[commonStyles.m6]}
            title="Done"
            onPress={() => {
              send('DONE_ADDING_ENTRY_FIELD');
            }}
          />
        </View>
      )}
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
            const bpm = current.context.entryFields.bpm.active
              ? current.context.entryFields.bpm.value
              : undefined;

            Navigation.push(componentId, {
              component: {
                name: 'com.myApp.Practice',
                passProps: {
                  entryTitle: current.context.entryTitle,
                  bpm: bpm,
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
  fieldButton: {
    marginTop: 20,
  },
});

function PracticePreview(props: PracticePreviewProps): JSX.Element {
  return (
    <RealmProviderWrapper>
      <PracticePreviewContent {...props} />
    </RealmProviderWrapper>
  );
}

export default PracticePreview;
