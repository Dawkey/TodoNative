import React, {useState, useMemo, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from '../components/Icon';
import {rem, textColor} from '../utils/config';
import TodoList from '../components/TodoList';
import MessageDialog from '../components/MessageDialog';
import {load, save} from '../utils/storage';

export default function Home(props) {
  const navigation = useNavigation();

  const [todoList, setTodoList] = useState([]);

  const [mesDlgShowFlag, setMesDlgShowFlag] = useState(false);
  const [deleteIndexs, setDeleteIndexs] = useState([]);
  const [moreDlgShowFlag, setMoreDlgShowFlag] = useState(false);
  const [multiDeleteFlag, setMultiDeleteFlag] = useState(false);
  const [hideFinishFlag, setHideFinishFlag] = useState(false);

  useEffect(() => {
    load('todoList').then(list => {
      if (!list) {
        setTodoList([]);
      } else {
        setTodoList(JSON.parse(list));
      }
    });
  }, []);

  function changeTodoListData(list) {
    setTodoList(list);
    save('todoList', JSON.stringify(list));
  }

  const deleteIndexsSet = useMemo(() => {
    return new Set(deleteIndexs);
  }, [deleteIndexs]);

  const multiDeleteDisable = useMemo(() => {
    if (todoList && todoList.length === 0) {
      return true;
    }
    if (hideFinishFlag) {
      for (let todoItem of todoList) {
        if (todoItem.isFinished === false) {
          return false;
        }
      }
      return true;
    }
    return false;
  }, [todoList, hideFinishFlag]);

  function addTodo() {
    navigation.push('Operator', {
      type: 'add',
      todoList,
      setTodoList: changeTodoListData,
    });
  }

  function editTodo(index) {
    navigation.push('Operator', {
      type: 'edit',
      editIndex: index,
      todoList,
      setTodoList: changeTodoListData,
    });
  }

  function deleteTodo(index) {
    setDeleteIndexs([index]);
    setMesDlgShowFlag(true);
  }

  function deleteTodoList() {
    const indexSet = new Set(deleteIndexs);
    const newTodoList = todoList.filter((todoItem, index) => {
      return !indexSet.has(index);
    });
    changeTodoListData(newTodoList);
    clearDeleteEffect();
  }

  function clearDeleteEffect() {
    setDeleteIndexs([]);
    setMultiDeleteFlag(false);
  }

  function checkTodo(index) {
    const newTodoList = [...todoList];
    newTodoList[index].isFinished = !newTodoList[index].isFinished;
    changeTodoListData(newTodoList);
  }

  function checkDeletedTodo(index) {
    const newDeleteIndexs = deleteIndexs.filter(value => {
      return value !== index;
    });
    if (deleteIndexs.length === newDeleteIndexs.length) {
      newDeleteIndexs.push(index);
    }
    setDeleteIndexs(newDeleteIndexs);
  }

  return (
    <View style={styles.home}>
      <View style={styles.todoHeader}>
        <Text style={styles.todoHeaderText}>待办事项</Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (multiDeleteFlag) {
              clearDeleteEffect();
            } else {
              setMoreDlgShowFlag(!moreDlgShowFlag);
            }
          }}
          style={styles.todoHeaderMoreIconContainer}>
          <Icon
            type={multiDeleteFlag ? 'close' : 'more'}
            style={styles.todoHeaderMoreIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        style={[styles.moreDialog, moreDlgShowFlag ? 'null' : styles.hide]}
        onPress={() => {
          setMoreDlgShowFlag(false);
        }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setHideFinishFlag(!hideFinishFlag);
              setMoreDlgShowFlag(false);
            }}>
            <Text style={[styles.moreButton, styles.hideButton]}>
              {!hideFinishFlag ? '隐藏已完成待办' : '显示已完成待办'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (multiDeleteDisable) {
                return;
              }
              setMultiDeleteFlag(true);
              setMoreDlgShowFlag(false);
            }}>
            <Text
              style={[
                styles.moreButton,
                multiDeleteDisable ? styles.disable : null,
              ]}>
              批量删除
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <TodoList
        data={todoList}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        checkTodo={checkTodo}
        hideFinishFlag={hideFinishFlag}
        multiDeleteFlag={multiDeleteFlag}
        deleteIndexsSet={deleteIndexsSet}
        checkDeletedTodo={checkDeletedTodo}
      />

      <View style={styles.todoAdd}>
        <TouchableOpacity activeOpacity={0.5} onPress={addTodo}>
          <Icon type="add" style={styles.todoAddIcon} />
        </TouchableOpacity>
      </View>

      <View
        style={[styles.toMultiDelete, multiDeleteFlag ? null : styles.hide]}>
        <TouchableOpacity
          activeOpacity={deleteIndexs.length === 0 ? 1 : 0.5}
          onPress={() => {
            if (deleteIndexs.length === 0) {
              return;
            }
            setMesDlgShowFlag(true);
          }}>
          <Icon
            type="delete"
            style={[
              styles.toMultiDeleteIcon,
              deleteIndexs.length === 0 ? styles.disable : null,
            ]}
          />
        </TouchableOpacity>
      </View>

      <MessageDialog
        content={'是否删除此待办？'}
        isShow={mesDlgShowFlag}
        setShowFlag={setMesDlgShowFlag}
        onConfirm={deleteTodoList}
        onCancel={clearDeleteEffect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f4f5f6',
  },

  hide: {
    display: 'none',
  },

  disable: {
    color: '#aaa',
  },

  todoHeader: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 2 * rem,
    marginTop: 0.5 * rem,
  },
  todoHeaderText: {
    fontSize: 1.5 * rem,
    color: textColor,
  },
  todoHeaderMoreIconContainer: {
    position: 'absolute',
    right: 1 * rem,
  },
  todoHeaderMoreIcon: {
    fontSize: 1.1 * rem,
    color: textColor,
  },

  moreDialog: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 3,
  },

  buttonContainer: {
    position: 'absolute',
    top: 2 * rem,
    right: 0.5 * rem,
    backgroundColor: '#f9fafb',
    borderRadius: 1 * rem,
    padding: 0.8 * rem,
    elevation: 1.5,
  },
  moreButton: {
    fontSize: 1 * rem,
    lineHeight: 2.5 * rem,
    color: textColor,
  },
  hideButton: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },

  todoAdd: {
    position: 'absolute',
    bottom: 5 * rem,
    right: 1 * rem,
  },
  todoAddIcon: {
    fontSize: 2.5 * rem,
    color: textColor,
  },

  toMultiDelete: {
    position: 'absolute',
    left: 0,
    bottom: 1 * rem,
    width: '100%',
    alignItems: 'center',
  },
  toMultiDeleteIcon: {
    fontSize: 1.5 * rem,
    color: textColor,
  },
});
