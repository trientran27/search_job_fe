import { createContext } from "react";

//-----------------------
const initialState = {
  ...defaultSettings,
  onChangeMode: () => { },
  onToggleMode: () => { },
  onChangeDirection: () => { },
  onChangeColor: () => { },
  onToggleStretch: () => { },
  onChangeLayout: () => { },
  onResetSetting: () => { },
  setColor: defaultPreset,
  colorOption: [],
};

const SettingsContext = createContext(initialState);

export { SettingsContext };