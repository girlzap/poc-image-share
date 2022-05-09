import React from "react";
import "./Card.css";

import { exportComponentAsPNG } from "react-component-export-image";
import Card from "./Card";

const ReactCompExport = () => {
  return (
    <div className="App">
      <h1>Component to Image</h1>
      <ul>
        <li>
          Doesn't expose blobs so would still have to pass it to something like
          html2canvas
        </li>
        <li>
          Does generate PDFs really well so pinning for possible later uses
        </li>
        <li>
          MIT license, ~14k weekly downloads, last updated over 1 year ago
        </li>
      </ul>
      <ImageComponent />
    </div>
  );
};

export default ReactCompExport;

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }

  render() {
    return (
      <>
        <div className="card" ref={this.componentRef}>
          <Card id="react-comp" />
        </div>

        <button
          onClick={() =>
            exportComponentAsPNG(this.componentRef, { fileName: "target.jpg" })
          }
        >
          Export As PNG
        </button>
      </>
    );
  }
}
