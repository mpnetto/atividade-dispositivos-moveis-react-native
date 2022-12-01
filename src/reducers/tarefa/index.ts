import { Actor, TarefaActions, TarefaActionsEnum, TarefasState } from "./types";

export const makeInitialTarefaState = (): TarefasState => ({
  tarefas: [],
  error: "",
  name: "",
  dueDate: new Date(),
  search: "",
});

export const removeTask: Actor<TarefaActions.Remove> = (state, action) => {
  return {
    ...state,
    tarefas: state.tarefas.filter((tarefa) => tarefa.id !== action.payload.id),
  };
};

export const toggleTask: Actor<TarefaActions.Toggle> = (state, action) => {
  return {
    ...state,
    tarefas: state.tarefas.map((t) =>
      t.id === action.payload.id ? { ...t, done: !t.done } : t
    ),
  };
};

export const writeTask: Actor<TarefaActions.Write> = (state, {payload}) => {

  const hasTaskAlready = state.tarefas.some((t) => t.name === payload.name);

  if (hasTaskAlready) {
    return {
      ...state,
      name: payload.name,
      error: "Nome da tarefa já existe",
    };
  }

  return {
    ...state,
    error: "",
    name: payload.name,
  };
};

export const writeDateTask: Actor<TarefaActions.WriteDate> = (state, {payload}) => {


  return {
    ...state,
    error: "",
    dueDate: payload.dueDate,
  };
};

export const addTask: Actor<TarefaActions.Add> = (state) => {
  if (state.name === "") {
    return {
      ...state,
      error: "Nome da tarefa não pode ser vazio",
    };
  }

  if (state.error) {
    return state;
  }

  return {
    ...state,
    tarefas: [
      ...state.tarefas,
      {
        id: (state.tarefas.length + 1).toString(),
        name: state.name,
        dueDate: state.dueDate,
        done: false,
        createdAt: new Date(),
      },
    ],
    error: "",
    name: "",
  };
};

export const searchTask: Actor<TarefaActions.Search> = (state, action) => {
  return {
    ...state,
    search: action.payload.search,
  };
};

export const tarefaReducer = (
  state: TarefasState,
  action: TarefaActions.All
): TarefasState => {
  switch (action.type) {
    case TarefaActionsEnum.add:
      return addTask(state, action);

    case TarefaActionsEnum.remove:
      return removeTask(state, action);

    case TarefaActionsEnum.toggle:
      return toggleTask(state, action);

    case TarefaActionsEnum.write:
      return writeTask(state, action);

    case TarefaActionsEnum.writeDate:
      return writeDateTask(state, action);

    case TarefaActionsEnum.search:
      return searchTask(state, action);

    default:
      return state;
  }
};
