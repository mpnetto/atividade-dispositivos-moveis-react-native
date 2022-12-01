import { useState, useRef, useEffect } from "react";
import { TextInput } from "react-native";
import { Appbar } from "react-native-paper";

interface Props {
  search: string;
  onChangeText: (name: string) => void;
}

export const Search = ({ onChangeText, search }: Props) => {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const toggleSearch = () => setVisible(!visible);

  useEffect(() => {
    if (visible && inputRef.current) {
      inputRef.current.focus();

      return;
    }

    onChangeText("");
  }, [visible]);

  return (
    <>
      {visible && (
        <TextInput
          placeholder="Busca"
          ref={inputRef}
          style={{
            minWidth: 70,
            padding: "2%",
          }}
          value={search}
          onChangeText={onChangeText}
        />
      )}
      <Appbar.Action icon="magnify" onPress={toggleSearch} />
    </>
  );
};
