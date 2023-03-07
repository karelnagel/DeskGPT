import { useStore } from "./hooks/useStore";
import { useTheme } from "./hooks/useTheme";
import { Home } from "./screens/Home";
import { Settings } from "./screens/Settings";

export default function App() {
  const screen = useStore((s) => s.screen);
  useTheme();
  if (screen === "home") return <Home />;
  if (screen === "settings") return <Settings />;
  return null;
}
