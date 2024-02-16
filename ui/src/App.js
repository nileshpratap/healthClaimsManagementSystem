import "./App.css";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

function App() {
  const user = useStore((store) => store.user, shallow);
  // using shallow minimize re-renders of react
  return <div className="app">{user.name}</div>;
}

export default App;
