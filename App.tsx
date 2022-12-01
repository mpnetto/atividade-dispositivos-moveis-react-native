import { useReducer } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { MyAppBar } from "@Components/appBar";
import { RootStack } from "./src/helpers/navigator";
import { createTheme } from "@Themes/createTheme";
import { makeInitialTarefaState, tarefaReducer } from "./src/reducers";
import { TarefaPage, HomePage } from "@Screens/index";

export default function App() {
  const [appState, dispatch] = useReducer(
    tarefaReducer,
    makeInitialTarefaState()
  );

  const theme = createTheme();

  const makeHeader = (props: NativeStackHeaderProps) => {
    return (
      <MyAppBar
        appState={appState}
        dispatch={dispatch}
        navigationProps={props}
      />
    );
  };

  return (
    <PaperProvider theme={theme.light}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen
            options={{
              header: makeHeader,
            }}
            name="Home"
          >
            {(props) => (
              <HomePage appState={appState} dispatch={dispatch} {...props} />
            )}
          </RootStack.Screen>
          <RootStack.Screen
            options={{
              header: makeHeader,
            }}
            name="Tarefa"
          >
            {(props) => <TarefaPage appState={appState} {...props} />}
          </RootStack.Screen>
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
