import {StyleSheet} from 'react-native';

const commonStyles = StyleSheet.create({
  h2: {
    fontSize: 20,
    marginBottom: 4,
    color: '#ffffff',
  },
  h3: {
    fontSize: 18,
    marginBottom: 3,
  },
  h4: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  h5: {
    fontSize: 16,
    marginBottom: 1,
  },
  h6: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  fontItalic: {
    fontStyle: 'italic',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  dl: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#66BBFF',
    marginBottom: 2,
  },
  mAuto: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  m6: {
    margin: 6,
  },
  mr6: {
    marginRight: 6,
  },
  ml6: {
    marginLeft: 6,
  },
  ml20: {
    marginLeft: 20,
  },
  ml10: {
    marginLeft: 10,
  },
  mr10: {
    marginRight: 10,
  },
  mt6: {
    marginTop: 6,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mt30: {
    marginTop: 30,
  },
  mb4: {
    marginBottom: 4,
  },
  mb6: {
    marginBottom: 6,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  mb30: {
    marginBottom: 30,
  },
  mb40: {
    marginBottom: 40,
  },
  mb50: {
    marginBottom: 50,
  },
  p5: {
    padding: 5,
  },
  p10: {
    padding: 10,
  },
  pt10: {
    paddingTop: 10,
  },
  pb10: {
    paddingBottom: 10,
  },
  ph6: {
    paddingHorizontal: 6,
  },
  ph10: {
    paddingHorizontal: 10,
  },
  ph15: {
    paddingHorizontal: 15,
  },
  ph20: {
    paddingHorizontal: 20,
  },
  textCenter: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  br4: {
    borderRadius: 4,
  },
  br15: {
    borderRadius: 15,
  },
  br20: {
    borderRadius: 20,
  },
  btlr: {
    borderTopLeftRadius: 10,
  },
  btrr: {
    borderTopRightRadius: 10,
  },
  input: {
    color: '#EFEFEF',
    borderBottomWidth: 2,
    borderBottomColor: '#EFEFEF',
    marginBottom: 10,
    paddingLeft: 0,
    paddingTop: 4,
    paddingBottom: 10,
  },
  font18: {
    fontSize: 18,
  },
  flex1: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexRowReverse: {
    flexDirection: 'row-reverse',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  alignCenter: {
    alignItems: 'center',
  },
  gap6: {
    gap: 6,
  },
  gap10: {
    gap: 10,
  },
  card: {
    backgroundColor: '#404040',
    borderRadius: 4,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  error: {
    backgroundColor: '#BF0000',
  },
  errorBorder: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#440000',
  },
});

export default commonStyles;
