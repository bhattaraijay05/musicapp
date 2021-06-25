import React from 'react';
import {DragableView, ZoomableImage} from '@app/utils/AnimatedElements';
import {View} from 'react-native';
import {Container} from '@app/styles/Styles';

const PanHandle = () => {
  return (
    <View style={Container.flexContainer}>
      <DragableView>
        <View style={{height: 100, width: 100, backgroundColor: 'red'}} />
      </DragableView>
      <ZoomableImage
        width={200}
        height={200}
        source={{
          uri: 'https://images.pexels.com/photos/2237390/pexels-photo-2237390.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        }}
        style={{resizeMode: 'contain', borderRadius: 50}}
      />
    </View>
  );
};

export default PanHandle;
