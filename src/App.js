import Raw from "./Raw";
import HtmlCanvasDemo from "./html2canvas";
import ReactCompExport from "./ReactCompExport";

import "./App.css";

function App() {
  return (
    <div className="App">
      <HtmlCanvasDemo props={""} />
      <hr />
      <ReactCompExport />
      <hr />
      <Raw />
    </div>
  );
}

export default App;
