import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from './Icon';
import {rem, textColor} from '../utils/config';

export default function TodoList(props) {
  const {
    data,
    editTodo,
    deleteTodo,
    checkTodo,
    hideFinishFlag,
    multiDeleteFlag,
    deleteIndexsSet,
    checkDeletedTodo,
  } = props;
  const renderItem = ({item, index}) => {
    if (hideFinishFlag && item.isFinished) {
      return '';
    }
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => {
          if (multiDeleteFlag) {
            checkDeletedTodo(index);
          } else {
            editTodo(index);
          }
        }}>
        <View style={styles.todoItem}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={e => {
              e.stopPropagation();
              checkTodo(index);
            }}>
            <Icon
              type={item.isFinished ? 'checked' : 'unchecked'}
              style={[
                styles.uncheckedIcon,
                multiDeleteFlag ? styles.hide : null,
              ]}
            />
          </TouchableOpacity>

          <View style={styles.itemBody}>
            <Text
              style={[
                styles.itemText,
                item.isFinished ? styles.itemTextChecked : null,
              ]}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item.content}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={e => {
              e.stopPropagation();
              deleteTodo(index);
            }}>
            <Icon
              type="delete"
              style={[styles.deleteIcon, multiDeleteFlag ? styles.hide : null]}
            />
          </TouchableOpacity>

          <Icon
            type={deleteIndexsSet.has(index) ? 'checked2' : 'unchecked2'}
            style={[styles.uncheckedIcon, multiDeleteFlag ? null : styles.hide]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.todoList}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },

  todoList: {
    padding: 0.5 * rem,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0.5 * rem,
    marginTop: 0.5 * rem,
    minHeight: 4 * rem,
    backgroundColor: '#f9fafb',
  },
  uncheckedIcon: {
    fontSize: 1.2 * rem,
    marginBottom: -0.05 * rem,
    color: textColor,
  },
  deleteIcon: {
    fontSize: 1.2 * rem,
    color: textColor,
  },

  itemBody: {
    marginLeft: 0.5 * rem,
    marginRight: 0.5 * rem,
    flexGrow: 1,
  },

  itemText: {
    fontSize: 1 * rem,
    color: textColor,
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
  },
});
