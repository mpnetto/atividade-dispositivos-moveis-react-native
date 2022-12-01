import { MD3LightTheme, MD3Theme, MD3DarkTheme } from "react-native-paper";

interface Themes {
  light: MD3Theme;
  dark: MD3Theme;
}

export const createTheme = (): Themes => {
  const dark: MD3Theme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: "green",
      secondary: "yellow",
    },
  };

  const light: MD3Theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: "green",
      secondary: "yellow",
    },
  };

  return {
    dark,
    light,
  };
};
