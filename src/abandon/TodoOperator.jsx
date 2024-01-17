import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
} from 'react-native';
import Icon from './Icon';
import {rem, textColor} from '../utils/config';

export default function TodoOperator(props) {
  const {type, editIndex, isShow, setShowFlag, todoList, setTodoList} = props;

  const [content, setContent] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [note, setNote] = useState('');

  const contentInput = useRef(null);
  const noteInput = useRef(null);

  useEffect(() => {
    if (!isShow) {
      return;
    }
    if (type === 'add') {
      setContent('');
      setIsFinished(false);
      setIsImportant(false);
      setNote('');
    } else {
      const todoItem = todoList[editIndex];
      setContent(todoItem.content);
      setIsFinished(todoItem.isFinished);
      setIsImportant(todoItem.isImportant);
      setNote(todoItem.note);
    }
  }, [isShow]);

  function goBack() {
    setContent('');
    setIsFinished(false);
    setIsImportant(false);
    setNote('');
    setShowFlag(false);
    contentInput.current.blur();
    noteInput.current.blur();
  }

  function confirmTodoList() {
    const todoItem = {
      id: new Date().getTime(),
      content,
      isFinished,
      isImportant,
      note,
    };
    let newTodoList = [];
    if (type === 'add') {
      newTodoList = [...todoList, todoItem];
    } else {
      newTodoList = [...todoList];
      newTodoList[editIndex] = todoItem;
    }
    setTodoList(newTodoList);
    goBack();
  }

  return (
    <View style={[styles.todoOperator, !isShow ? styles.hide : null]}>
      <View style={styles.operatorHeader}>
        <TouchableOpacity activeOpacity={0.5} onPress={goBack}>
          <Icon style={styles.iconBack} type="back" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={confirmTodoList}>
          <Icon style={styles.iconConfirm} type="confirm" />
        </TouchableOpacity>
      </View>

      <View style={styles.operatorBody}>
        <View style={styles.todoItem}>
          <TouchableOpacity
            onPress={() => {
              setIsFinished(!isFinished);
            }}>
            <Icon
              style={[styles.iconCheck, type === 'add' ? styles.hide : null]}
              type={isFinished ? 'checked' : 'unchecked'}
            />
          </TouchableOpacity>

          <View style={styles.itemBody}>
            <TextInput
              ref={contentInput}
              style={styles.itemInput}
              multiline={true}
              value={content}
              onChangeText={value => {
                setContent(value);
              }}
            />
          </View>
        </View>

        <View style={styles.todoItem}>
          <Icon style={styles.iconPoint} type="point" />
          <View style={styles.itemBody}>
            <Text style={styles.itemText}>重要</Text>
          </View>
          <Switch
            value={isImportant}
            onValueChange={value => {
              setIsImportant(value);
            }}
          />
        </View>

        <View style={styles.todoItem}>
          <Icon style={styles.iconNote} type="note" />
          <View style={styles.itemBody}>
            <TextInput
              ref={noteInput}
              style={styles.itemInput}
              multiline={true}
              placeholder="备注"
              value={note}
              onChangeText={value => {
                setNote(value);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  todoOperator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#f4f5f6',
  },

  hide: {
    display: 'none',
  },

  operatorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 2 * rem,
    marginHorizontal: 1 * rem,
  },

  iconBack: {
    fontSize: 1.5 * rem,
    color: textColor,
  },
  iconConfirm: {
    fontSize: 1.5 * rem,
    color: textColor,
  },

  operatorBody: {
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

  iconCheck: {
    fontSize: 1.2 * rem,
    color: textColor,
  },
  iconPoint: {
    fontSize: 1.2 * rem,
    color: textColor,
  },
  iconNote: {
    fontSize: 1.2 * rem,
    color: textColor,
  },

  itemBody: {
    marginLeft: 0.5 * rem,
    marginRight: 0.5 * rem,
    flexGrow: 1,
  },
  itemInput: {
    flexGrow: 1,
    fontSize: 1 * rem,
    color: textColor,
  },
  itemText: {
    fontSize: 1 * rem,
    color: textColor,
  },
});
