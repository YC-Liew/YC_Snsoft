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

  const [todos, setTodos] = useState([
    // { text: 'buy coffee', key: '1',check: false,prioritization: false},
    // { text: 'create an app', key: '2',check: false,prioritization: false},
    // { text: 'play on the switch', key: '3',check: false,prioritization: false}
  ]);
  const [array, setArray] = useState([...todos])
  const [checkSearch, setCheckSearch] = useState(false);
  // console.log(array,'array')
  // useEffect(() => {
  //   return _.orderBy(todos, ['text','key','check','prioritization'],['asc','asc','asc','asc'])
  // },[todos] )
  // seet(() => { reutnr _.orderBy(users, ['user', 'age'], ['asc', 'desc'])});  
  //   .,[todos]

  // todos.sort((a, b) => {
  //   if (a.text < b.priori)
  //   {
  //     return 1
  //   }
  //   else
  //   {
  //     return -1
  //   }
  // })


  // todos.sort((a, b) => {
  //   if (a.prioritization < b.prioritization)
  //   {
  //     return 1
  //   }
  //   else
  //   {
  //     return -1
  //   }
  // })

  const [taskNumber, setTaskNumber] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem('todos').then(response => {
      setTodos(JSON.parse(response));
    });
    // AsyncStorage.getItem('todos').then(response => { setTodos(JSON.stringify(response))})
    // console.log(todos);
  },[]);

  useEffect (() => {
    console.log(todos);
    // AsyncStorage.setItem('todos',JSON.stringify(todos));
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  },[todos]);

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

  const pressDelete = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo => todo.key != key));
    })
  }

  const pressAccurateCount = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo, index) => {
        if (todo.key === key) {
          todo.check = !todo.check
          setTaskNumber(preState => {
            let number = preState;
            todo.check ? number = number: number = number - 1;
            return number
          })
        }
        return todo;
      });
    })
  }

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
  // const [filteredCountryList, setFilteredCountryList] = useState(todos);

  useEffect(() => {
    setArray(todos);
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
                <TodoItem item={item} pressHandler={pressHandler} pressDelete={pressDelete} pressPrioritization={pressPrioritization} pressAccurateCount={pressAccurateCount}/>
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