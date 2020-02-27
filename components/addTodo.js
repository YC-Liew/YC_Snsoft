import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AddTodo({ submitHandler }) {
    const [text, setText] = useState('');
    const changeHandler = (val) => {
        setText(val);
    }

    return ( 
        <View style={styles.item}>
            <Icon style={styles.input} onPress={() => submitHandler(text)} name='plus' color='green' size={20}></Icon>
            <TextInput style={styles.input2} placeholder='What need to be done ?' onChangeText={changeHandler}/>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        paddingTop:10,
        paddingLeft:10,
        paddingRight:8,
        paddingBottom:5,
        flexDirection: 'row',
        marginLeft:45,
        marginTop:15,
        marginBottom:15,
        borderWidth:1,
        borderRadius:50,
        borderColor:'rgb(77,241,153)',
        backgroundColor: 'rgb(77,241,153)',
        color:'white'
    },
    input2: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        flexDirection: 'row',
        marginLeft:5,
        paddingTop:20,
        paddingBottom:15,
        fontSize:17
    },
    item: {
        flexDirection: 'row',
        borderWidth:2,
        borderColor:'#afa',
        backgroundColor:'rgb(200,255,255)'
    },
})
