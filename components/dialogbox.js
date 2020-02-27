import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput} from "react-native";
import Dialog from "react-native-dialog";
 
export default function DialogTest(props) {
    const [state, setState] = useState({dialogVisible: false});
 
  const showDialog = () => {
    setState({ dialogVisible: true });
  };
 
  const handleCancel = () => {
    setState({ dialogVisible: false });
  };
 
  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setState({ dialogVisible: false });
  };
 
    return (
      <View>
        <TouchableOpacity onPress={showDialog}>
          <Text>Show Dialog</Text>
        </TouchableOpacity>
        <Dialog.Container visible={state.dialogVisible}>
          <Dialog.Title>Edit</Dialog.Title>
          <TextInput></TextInput>
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Complete" onPress={handleDelete} />
        </Dialog.Container>
      </View>
    );
  }
