import React from 'react';
import {Text} from 'react-native';

const types = {
  add: '\ue900',
  checked: '\ue901',
  delete: '\ue902',
  more: '\ue903',
  unchecked: '\ue904',
  back: '\ue905',
  note: '\ue906',
  point: '\ue907',
  checked2: '\ue908',
  confirm: '\ue909',
  unchecked2: '\ue90a',
  close: '\ue90b',
};

export default function Icon(props) {
  return (
    <Text style={[props.style || {}, {fontFamily: 'iconfont'}]}>
      {types[props.type]}
    </Text>
  );
}
