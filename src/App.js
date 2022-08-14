import { GithubProvider } from "./components/Github User Dashboard/context/context;
import Main from "./components/Github User Dashboard/Main";

function App() {
  return (
    <GithubProvider>
      <Main />
    </GithubProvider>
  );
}

export default App;
