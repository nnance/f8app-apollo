import React from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import CircleImage from '../../../common/CircleImage';
import HorizontalListView from '../../../common/HorizontalListView';
import {colors} from '../../../common/styles';

const Row = (props) => (<TouchableOpacity style={{flex: 1, padding: 20}}>
  <CircleImage size={250} source={{uri: props.preview}}>
    <CircleImage size={250} source={require('../img/faded-blue.png')}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 180}}>
        <View style={{width: 150, alignItems: 'center'}}>
          <Text numberOfLines={1} style={{color: 'white', fontWeight: 'bold'}}>{props.title}</Text>
        </View>
        <View style={{width: 100, alignItems: 'center'}}>
          <Text numberOfLines={1} style={{color: colors.textFadedWhite, fontWeight: 'bold'}}>{props.author.name}</Text>
        </View>
      </View>
    </CircleImage>
  </CircleImage>
</TouchableOpacity>);

class HeroBanner extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HorizontalListView
          data={this.props.clogs}
          renderRow={Row}
          showsHorizontalScrollIndicator={false}
          />
      </View>
    );
  }
}

export default HeroBanner;
