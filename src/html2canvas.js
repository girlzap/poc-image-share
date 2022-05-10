import html2canvas from "html2canvas";
import { useEffect, useState } from "react";
import Card from "./Card";

const HtmlCanvasDemo = () => {
  const [image, setImage] = useState("");
  useEffect(() => {
    async function fetchImage() {
      const response = await fetch("https://picsum.photos/150");
      const responseBlob = await response.blob();
      const convertBlobToBase64 = async (blob) => {
        return await blobToBase64(blob);
      };
      setImage(await convertBlobToBase64(responseBlob));
    }
    fetchImage();
  }, []);

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const exportAsPicture = () => {
    const data = document.getElementById("exportContainer");

    html2canvas(data).then((canvas) =>
      canvas.toBlob((image) => {
        const files = [
          new File([image], "share.png", {
            type: "image/png",
            lastModified: new Date().getTime(),
          }),
        ];
        const shareData = {
          files: files,
        };

        if (navigator.canShare && navigator.canShare({ files: files })) {
          navigator
            .share(shareData)
            .then(() => console.log("Share was successful."))
            .catch((error) => console.log("Sharing failed", error));
        } else {
          console.log(`Your system doesn't support sharing files.`);
        }
      })
    );
  };

  const saveAsPicture = () => {
    const data = document.getElementById("exportContainer");

    html2canvas(data)
      .then((canvas) => {
        const image = canvas.toDataURL("image/png", 1.0);
        return image;
      })
      .then((image) => {
        saveAs(image, "saveImage.png");
      });
  };

  //use for testing how the image looks. there are some limitations around padding and spacing noted in the css
  const saveAs = (blob, fileName) => {
    const elem = window.document.createElement("a");
    elem.href = blob;
    elem.download = fileName;
    elem.style = "display:none;";
    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === "function") {
      elem.click();
    } else {
      elem.target = "_blank";
      elem.dispatchEvent(
        new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      );
    }
    URL.revokeObjectURL(elem.href);
    elem.remove();
  };

  return (
    <>
      <h1>Screenshot html2canvas</h1>
      <div className="parent">
        <Card id="exportContainer" imgSrc={image} />

        <div>
          <li>Takes a screenshot of the DOM</li>
          <li>Client side rendering</li>
          <li>
            Layout and variable info (campaign name) will be easy to accomodate
            since it uses the DOM to capture the image
          </li>
          <li>
            Only downside is space (if browser window cuts anything off it wont
            save right)-- shouldn't be an issue for our use case
          </li>
          <li>Mobile saves a little weird.</li>
          <li>
            MIT license, ~840k downloads per week, last updated ~3 months ago
          </li>
        </div>
      </div>
      <button onClick={saveAsPicture}>screenshot</button>
      <button onClick={exportAsPicture}>export</button>
    </>
  );
};

export default HtmlCanvasDemo;
