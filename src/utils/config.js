import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const rem = width * 0.05;
const textColor = '#333';

export {rem, textColor};
