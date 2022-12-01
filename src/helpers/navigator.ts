import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Tarefa: { taskId: string };
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();
