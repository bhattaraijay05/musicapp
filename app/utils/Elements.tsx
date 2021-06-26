import {Texts} from '@app/styles/Styles';
import React from 'react';
import {Text, TextStyle} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

type CustomTextProps = {
  style?: TextStyle | TextStyle[];
  color?: string;
  fontSize?: number;
  title?: boolean;
  fontFamily?: string;
  center?: boolean;
  bold?: boolean;
  textAlign?: any;
  fontWeight?: any;
};

const MyText: React.FC<CustomTextProps> = ({
  children,
  color,
  title,
  fontSize,
  style,
  fontFamily,
  center,
  textAlign,
  bold,
  fontWeight,
}) => {
  return (
    <Text
      style={[
        Texts.myText,
        {
          color,
          fontFamily: fontFamily
            ? fontFamily
            : title
            ? 'Oswald-Regular'
            : 'Roboto-Regular',
          fontSize: fontSize ? fontSize : title ? 32 : 18,
          textAlign: center ? 'center' : textAlign,
          fontWeight: bold ? 'bold' : fontWeight,
        },
        {
          ...style,
        },
      ]}>
      {children}
    </Text>
  );
};

type CustomButtonProps = {
  style?: TextStyle | TextStyle[];
  color?: string;
  fontSize?: number;
  title?: boolean;
  fontFamily?: string;
  bold?: boolean;
  textAlign?: any;
  fontWeight?: any;
  onPress?: () => void;
  onLongPress?: () => void;
  backgroundColor?: string;
  padding?: number;
  borderRadius?: number;
  width?: number;
  tension?: number;
  activeScale?: number;
  friction?: number;
  rounded?: boolean;
  nobounce?: boolean;
};

const MyButton: React.FC<CustomButtonProps> = ({
  children,
  color = '#000',
  title,
  fontSize,
  style,
  fontFamily,
  textAlign = 'center',
  bold,
  fontWeight,
  backgroundColor = '#fff',
  padding = 10,
  borderRadius = 5,
  width = 150,
  tension = 500,
  activeScale = 0.9,
  friction = 3,
  nobounce,
  rounded,
  ...props
}) => {
  return (
    <TouchableScale
      tension={tension}
      activeScale={nobounce ? 1 : activeScale}
      friction={friction}
      {...props}>
      <Text
        style={[
          Texts.myText,
          {
            color,
            fontFamily: fontFamily
              ? fontFamily
              : title
              ? 'Oswald-Regular'
              : 'Roboto-Regular',
            fontSize: fontSize ? fontSize : title ? 32 : 18,
            textAlign: textAlign,
            fontWeight: bold ? 'bold' : fontWeight,
            backgroundColor,
            padding,
            borderRadius: rounded ? width / 4 : borderRadius,
            width,
          },
          {
            ...style,
          },
        ]}>
        {children}
      </Text>
    </TouchableScale>
  );
};

export {MyText, MyButton};
