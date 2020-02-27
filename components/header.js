import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native'; 

export default function Header( {countnum}) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>ToDo</Text>
            <Text style={styles.title2}>{countnum}</Text>
            <Text style={styles.title3}>个未完成</Text>
        </View>    
    )
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 10,
        backgroundColor:'rgb(112,116,119)',
        flexDirection: 'row',
    },
    title: {
        paddingLeft: 50,
        textAlign: 'left',
        width:280,
        color: 'rgb(77,241,153)',
        fontSize: 40,
        fontWeight: 'bold',
    },
    title2: {
        color: 'rgb(77,241,153)',
        fontSize: 36,
        paddingTop: 5,
        paddingLeft:4,
        paddingRight:4,
    },
    title3: {
        color: '#fff',
        fontSize: 16,
        paddingTop: 25,
    },
})