import { Tarefa } from "../model/tarefa";

export const makeSearchByName = (search: string) => (tarefa: Tarefa) => {
  if (search === "") {
    return true;
  }

  return tarefa.name.toLowerCase().includes(search.toLowerCase());
};
