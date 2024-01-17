import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from '../utils/config';

export default function MessageDialog(props) {
  const {content, isShow, setShowFlag, onConfirm, onCancel} = props;

  return (
    <View style={[styles.messageDialog, !isShow ? styles.hide : null]}>
      <View style={styles.dialogContainer}>
        <Text style={styles.content}>{content}</Text>
        <View style={styles.buttonContainer}>
          <Text
            onPress={() => {
              if (onCancel) {
                onCancel;
              }
              setShowFlag(false);
            }}
            style={[styles.button, styles.buttonCancel]}>
            取消
          </Text>

          <View style={styles.buttonSeparator} />

          <Text
            onPress={() => {
              onConfirm();
              setShowFlag(false);
            }}
            style={[styles.button, styles.buttonDelete]}>
            删除
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },
  messageDialog: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  dialogContainer: {
    backgroundColor: '#f9fafb',
    position: 'absolute',
    bottom: 1 * rem,
    left: 1 * rem,
    right: 1 * rem,
    padding: 1 * rem,
    borderRadius: 1 * rem,
  },
  content: {
    fontSize: 0.9 * rem,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 1 * rem,
  },
  button: {
    flex: 1,
    padding: 0.5 * rem,
    marginLeft: 0.5 * rem,
    marginRight: 0.5 * rem,
    textAlign: 'center',
    fontSize: 1 * rem,
  },
  buttonCancel: {
    color: 'blue',
  },
  buttonDelete: {
    color: 'red',
  },
  buttonSeparator: {
    marginTop: 0.4 * rem,
    marginBottom: 0.4 * rem,
    width: 0.5,
    backgroundColor: '#ccc',
  },
});
