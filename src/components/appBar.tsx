import { Appbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { expo } from "../../app.json";

import { TarefaActions, TarefasState } from "../reducers/tarefa/types";
import { Search } from "./search";

interface Props {
  appState: TarefasState;
  dispatch: (action: TarefaActions.All) => void;
  navigationProps: NativeStackHeaderProps;
}

export const MyAppBar = ({ appState, dispatch, navigationProps }: Props) => {
  const onChangeText = (search: string) => {
    dispatch({ type: "SEARCH", payload: { search } });
  };

  const { back, navigation, route } = navigationProps;

  const isHome = route.name === "Home";

  const title = isHome ? expo.name : route.name;

  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={title} />
      {isHome && (
        <Search search={appState.search} onChangeText={onChangeText} />
      )}
    </Appbar.Header>
  );
};
