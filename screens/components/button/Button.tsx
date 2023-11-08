import React from 'react';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';
import commonStyles from '../commonStyles';

interface ButtonProps extends PressableProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({title, style, children, ...props}) => {
  const stylesArray = Array.isArray(style) ? style : [style];
  const resolvedStyles = stylesArray.map(style =>
    typeof style === 'function' ? style({pressed: false}) : style,
  );

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children({pressed: false});
    }

    return children;
  };

  return (
    <Pressable
      style={[commonStyles.mb6, styles.button, ...resolvedStyles]}
      {...props}>
      <Text style={styles.text}>{title}</Text>
      {renderChildren()}
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
    borderRadius: 4,
    backgroundColor: '#DDDDDD',
    padding: 10,
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
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#222222',
  },
});

export {ButtonLeft, ButtonRight};
export default Button;
