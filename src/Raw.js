import { useEffect, useState } from "react";
import React from "react";

const Raw = () => {
  const [poster, setPoster] = useState(null);
  const [name, setName] = useState("Help");

  useEffect(() => {
    async function fetchImage() {
      let response = await fetch("./ollie-small.png");
      let img = new Image();
      response = await response.url;
      img.crossOrigin = "Anonymous";
      img.src = response;
      setPoster(img);
    }

    fetchImage();

    if (window.location.search) {
      if (window.location.search.substr(1).split("=")[0] == "name") {
        setName(decodeURI(window.location.search.substr(1).split("=")[1]));
      }
    }
  }, []);

  const generated = () => {
    let canvas = document.createElement("canvas");

    canvas.height = 411;
    canvas.width = 350;

    let context = canvas.getContext("2d");

    context.drawImage(poster, 0, 0);
    // context.drawImage(poster, 0, 0, 888, 1332, 244, 96, 592, 888); <-- use to resize

    context.font = "40px Arial";
    context.textAlign = "center";
    context.textBaseline = "top";
    context.fillText(name.toUpperCase(), 200, 150);

    return canvas.toDataURL("image/jpeg");
  };
  return (
    <>
      <h1>Raw JS</h1>
      <ul>
        <li>No additional libraries needed</li>
        <li>
          Is unreliable on load (sometimes flashes black or doesn't load.)
          <ul>
            <li>
              Can probably address this but moving on for now to check out other
              libraries and solutions.
            </li>
          </ul>
        </li>
        <li>
          Also hard to organize the elements so will be time consuming to create
          new laytous
        </li>
      </ul>
      <section className="flex items-center justify-center p-8">
        {poster && <img src={generated()} alt="stuff" id="canvas" />}
      </section>
    </>
  );
};

export default Raw;
