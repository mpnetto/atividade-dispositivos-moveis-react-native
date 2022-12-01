import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { formatDistance, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { RootStackParamList } from "../helpers/navigator";
import { TarefasState } from "../reducers/tarefa/types";

type NavigatorProps = NativeStackScreenProps<RootStackParamList, "Tarefa">;

interface Props extends NavigatorProps {
  appState: TarefasState;
}

const TarefaNotFound = () => (
  <View style={styles.container}>
    <Text>Tarefa não encontrada</Text>
  </View>
);

export const TarefaPage = ({ route, appState }: Props) => {
  const { taskId } = route.params;

  const tarefa = appState.tarefas.find((tarefa) => tarefa.id === taskId);

  if (!tarefa) {
    return <TarefaNotFound />;
  }

  const lateDate = tarefa.dueDate < new Date();

  return (
    <View style={styles.container}>
      <Text variant="displaySmall">{tarefa.name}</Text>
      <Image
        source={{
          uri: "https://picsum.photos/id/13/2500/1667?blur=2",
          width: 300,
          height: 300,
        }}
        style={styles.image}
      />

      <Text variant="bodyLarge">Feita? {tarefa.done ? "👍" : "Nop 👎"}</Text>
      <Text variant="bodyLarge">
        Data de Criação:
        {format(tarefa.createdAt, " eeee, dd/MM/yyyy HH:mm", { locale: ptBR })}
      </Text>
      <Text variant="bodyLarge">
        Data de Entrega:
        {format(tarefa.dueDate, " eeee, dd/MM/yyyy HH:mm", { locale: ptBR })}
      </Text>
      { lateDate ? 
        <Text variant="bodyLarge" style={{ color:  "red" }}>
         Atrasada
        </Text> : null
    }
      

      <Text variant="bodyLarge">
        {formatDistance(tarefa.createdAt, new Date(), {
          addSuffix: true,
          locale: ptBR,
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "2%",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    flex: 1,
  },
  image: {
    borderRadius: 10,
  },
});
