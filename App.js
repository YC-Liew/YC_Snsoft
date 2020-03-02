import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoitem';
import AddTodo from './components/addTodo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from "react-native-dialog";
import DialogTest from './components/dialogbox';
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

export default function App() {

  const [todos, setTodos] = useState([]);
  const [array, setArray] = useState([]);
  const [checkSearch, setCheckSearch] = useState(false);
  const [taskNumber, setTaskNumber] = useState(0);

  //Get item from local storage when open the app
    useEffect(() => {
      AsyncStorage.getItem('todoListItem').then(response => {
        {if(response != null)
        setTodos(JSON.parse(response));
        setArray(JSON.parse(response));
        }
      });
    }, []);
    // useEffect(() => {
    // }, [search]);

  //Set item inside local storage when "todos" are be using
  useEffect(() => {
    AsyncStorage.setItem('todoListItem', JSON.stringify(todos));
    setArray(todos);
  }, [todos]);

  //Calculate how many task. When checkBox are active
  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo, index) => {
        if (todo.key === key) {
          todo.check = !todo.check
          setTaskNumber(preState => {
            let number = preState;
            todo.check ? number = number + 1 : preState <= 0 ? 0 : number = number - 1;
            return number
          })
        }
        return todo;
      });
    })
  }

  //Delete item when "remove" icon are be click
  const pressDelete = (key) => {
     setTodos((prevTodos) => {
      return prevTodos.filter((array => array.key != key))
    })
  }

  const pressDeleteForSearch = (key) => {
    checkSearch ? setArray((prevTodos) => {
      return prevTodos.filter((todo => todo.key != key));
    }) : null
  }

  //Calculate how many task when "delete" icon are be click
  const pressAccurateCount = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo, index) => {
        if (todo.key === key) {
          setTaskNumber(preState => {
            let number = preState;
            todo.check ? number = number - 1 : number = number;
            return number
          })
        }
        return todo;
      });
    })
  }

  //Add a new item when "Add" icon are be click
  const submitHandler = (text) => {
    if (text.length > 0) {
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          { text: text, key: Math.random().toString(), check: false, prioritization: false },
        ];
      });
    } else {
      Alert.alert('Oops!', 'Todos cannot be empty', [
        { text: 'Understood', onPress: () => console.log('alert closed') }
      ])
    }
  }

  //Update the array "Prioritization" when "exclamation" Icon are be click
  const pressPrioritization = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo, index) => {
        if (todo.key === key) {
          todo.prioritization = !todo.prioritization
        }
        return todo;
      });
    })
    setTodos(_.orderBy(todos, ['prioritization'], ['desc']));
  }

  const [search, setSearch] = useState('');
  //Search function
  useEffect(() => {
    console.log(todos,'todos');
    setArray(todos);
    console.log(array,'array');
    if (search !== "") {
      const newTodo = array.filter((array) => array.text.includes(search))
      setArray(newTodo);
      setCheckSearch(true);
    }
    else {
      setCheckSearch(false);
    }
  }, [search]);

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Header countnum={todos.length - taskNumber} />
        <SearchBar placeholder='Search' onChangeText={setSearch} value={search}></SearchBar>
        {/* <TextInput></TextInput> */}
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={checkSearch ? array : todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} pressDelete={pressDelete} pressPrioritization={pressPrioritization} pressAccurateCount={pressAccurateCount} pressDeleteForSearch={pressDeleteForSearch}/>
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    flexDirection: 'row',
  },
  content: {
    backgroundColor: 'white',
    flex: 1
  },
  list: {
    flex: 1
  },
  title2: {
    fontSize: 36,
    paddingTop: 15,
    paddingLeft: 4,
    paddingRight: 4,
    color: 'rgb(5,174,5)'
  },
  title3: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 35,
  },
});