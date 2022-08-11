import { GithubProvider } from "./components/Github Users Dashboard/context/context";
import Main from "./components/Github Users Dashboard/Main";

function App() {
  return (
    <GithubProvider>
      <Main />
    </GithubProvider>
  );
}

export default App;
