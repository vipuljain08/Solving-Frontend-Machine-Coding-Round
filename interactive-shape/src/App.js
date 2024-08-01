import Shape from "./components/Shape";
import "./App.css";

const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

function App() {
  return (
    <div className="App">
      <h1>Interactive Shape using React</h1>
      <Shape data={BOX_DATA} />
    </div>
  );
}

export default App;
