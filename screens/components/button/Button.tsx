import React from 'react';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';

interface ButtonProps extends PressableProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({title, style, ...props}) => {
  const stylesArray = Array.isArray(style) ? style : [style];
  const resolvedStyles = stylesArray.map(style =>
    typeof style === 'function' ? style({pressed: false}) : style,
  );

  return (
    <Pressable style={[styles.button, ...resolvedStyles]} {...props}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const ButtonLeft = (props: ButtonProps) => {
  return <Button {...props} style={[styles.buttonLeft]} />;
};

const ButtonRight = (props: ButtonProps) => {
  return <Button {...props} style={[styles.buttonRight]} />;
};

const styles = StyleSheet.create({
  button: {
    margin: 6,
    borderRadius: 4,
    height: 60,
    backgroundColor: '#DDDDDD',
  },
  buttonLeft: {
    flex: 1,
    marginRight: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonRight: {
    flex: 1,
    marginLeft: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: 20,
    height: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#222222',
  },
});

export {ButtonLeft, ButtonRight};
export default Button;
