import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, CheckBox, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from "react-native-dialog";
export default function TodoItem({ item, pressHandler, pressDelete, pressPrioritization, pressAccurateCount}) {

    // const [check, setcheck] = useState(false)
    // const [count, setcount] = useState({ product: 0 })
    const [state, setState] = useState({ dialogVisible: false });
    const [textForEdit, setTextForEdit] = useState('ddd');
    const showDialog = () => {
        setState({ dialogVisible: true });
    };

    const handleCancel = () => {
        setState({ dialogVisible: false });
    };

    const handleComplete = () => {
        if (textForEdit.length > 0) {
            (item.text = textForEdit)
        }
        else {
            Alert.alert('Oops!', 'Todos cannot be empty', [
                { text: 'Understood', onPress: () => console.log('alert closed') }
            ])
        }
        setState({ dialogVisible: false });
    };

    const changeHandlerForEdit = (val) => {
        setTextForEdit(val);
    }

    const changeTextDecoration = (key) => {
        //     if (item.check === false) {
        //         styles.itemText = {
        //             width: 240,
        //             marginLeft: 10,
        //             fontSize: 16,
        //             marginTop: 4,
        //         }
        //     }

        // else if (item.check === true) {
        //         styles.itemText = {
        //             width: 240,
        //             marginLeft: 10,
        //             fontSize: 16,
        //             marginTop: 4,
        //             textDecorationLine: 'line-through',
        //             textDecorationStyle: 'solid'
        //         }
        //     }
    }

    // const changeTextDecorate = () => {
    //     if (item.check === false)
    //     {
    //         return styles.itemText
    //     }
    //     else if (item.check === true)
    //     {
    //         return styles.itemText
    //     }
    // }

    return (
        <View style={item.check ? styles.item : styles.ComItem}>
            <Icon onPress={() => pressPrioritization(item.key)} style={item.prioritization ? item.check ? styles.conDoneItemIcon3 : styles.conItemIcon3 : styles.defitemIcon3} name='exclamation' size={24}></Icon>
            <CheckBox value={item.check} onChange={() => { pressHandler(item.key) }} style={styles.checkBoxStyle}/>
            <TouchableOpacity onPress={showDialog}>
                <Text style={item.check ? styles.comitemText : styles.defitemText }>{item.text}</Text>
            </TouchableOpacity>
            <Dialog.Container visible={state.dialogVisible}>
                <Dialog.Title>Edit</Dialog.Title>
                <TextInput style={styles.dialogTextInput} onChangeText={changeHandlerForEdit}></TextInput>
                <Dialog.Button label="Cancel" onPress={handleCancel} />
                <Dialog.Button label="Complete" onPress={handleComplete} />
            </Dialog.Container>
            <TouchableOpacity onPress={() => {pressAccurateCount(item.key);pressDelete(item.key)}}>
                <Icon style={styles.itemIcon2} name='remove' size={28} color='#333'></Icon>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderColor: '#ccc',
        borderWidth: 1,
        
        backgroundColor: 'rgb(180,255,185)',
        flexDirection: 'row',
        paddingLeft: 0
    },
    checkBoxStyle: {
        paddingRight: 20,
        paddingLeft: 20

    },
    ComItem: {
        padding: 16,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: 'rgb(242,242,242)',
        flexDirection: 'row',
        paddingLeft: 0
    },
    defitemText: {
        width: 240,
        marginLeft: 10,
        fontSize: 16,
        marginTop: 4,
    },
    comitemText: {
        width: 240,
        marginLeft: 10,
        fontSize: 16,
        marginTop: 4,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
    done: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    itemIcon2: {
        paddingTop: 2,
        color: 'red',
        marginLeft: 20
    },
    dialogTextInput: {
        borderWidth: 2,
        borderColor: '#ddd',
        fontSize: 17
    },
    defitemIcon3: {
        paddingTop: 4,
        color: '#bbb',
        paddingLeft: 25,
        paddingRight:15
    },
    conItemIcon3: {
        paddingTop: 4,
        color: 'red' ,
        paddingLeft: 25,
        paddingRight:15
    },
    conDoneItemIcon3: {
        paddingTop: 4,
        color: 'green' ,
        paddingLeft: 25,
        paddingRight:15
    },
})