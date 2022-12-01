import React, { Component , useState, useRef } from "react";
import { TextInput as NativeTextInput, StyleSheet, Keyboard} from "react-native";
import { TextInput, HelperText, Button, Text } from "react-native-paper";

import DateTimePickerModal from "react-native-modal-datetime-picker";

interface Props {
  error: string;
  name: string;
  dueDate: Date;
  onAdd: () => void;
  onTextChange: (name: string) => void;
  onDateChange: (date: Date) => void;
}


export const AddItem = ({ error, name, dueDate, onTextChange, onDateChange, onAdd }: Props) => {
  const hasError = error.length > 0;

  const inputRef = useRef<NativeTextInput>(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    Keyboard.dismiss();
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    dueDate = selectedDate;
    onDateChange(dueDate)
    hideDatePicker();
  };

  return (
    <>
      <TextInput
        placeholder="Digite a tarefa"
        value={name}
        onChangeText={onTextChange}
        error={hasError}
        label="Adicionar tarefa"
        ref={inputRef}
      />

      <TextInput  
        label="Coloque o prazo"
        value={selectedDate.toLocaleString()}
        onPressIn={showDatePicker}
        ref={inputRef}
      />

      <DateTimePickerModal
        date={selectedDate}
        isVisible={datePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <HelperText type="error" visible={hasError}>
        {error}
      </HelperText>
      <Button
        mode="contained"
        disabled={name.length === 0 || hasError}
        style={{ borderRadius: 5 }}
        onPress={() => {
          dueDate = selectedDate;
          onDateChange(dueDate)
          onAdd();
          inputRef.current?.focus();
        }}
      >
        Adicionar
      </Button>
    </>
  );
};
