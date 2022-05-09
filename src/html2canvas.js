import html2canvas from "html2canvas";
import Card from "./Card";

const HtmlCanvasDemo = () => {
  const exportAsPicture = () => {
    var data = document.getElementById("exportContainer");

    html2canvas(data)
      .then((canvas) => {
        var image = canvas.toDataURL("image/png", 1.0);
        return image;
      })
      .then((image) => {
        saveAs(image, "saveImage.png");
        const files = [
          new File([image], "share.png", {
            type: "image/png",
            lastModified: new Date().getTime(),
          }),
        ];
        const shareData = {
          files: files,
          title: "This is a custom title",
          text: "This is a custom description",
          url: "https://www.gofundme.com/f/in-loving-memory-of-nathaniel-nate-hernandez",
        };

        /////////////
        if (navigator.canShare && navigator.canShare({ files: files })) {
          navigator
            .share(shareData)
            .then(() => console.log("Share was successful."))
            .catch((error) => console.log("Sharing failed", error));
        } else {
          console.log(`Your system doesn't support sharing files.`);
        }
        ////////////
      });
  };

  //use for testing how the image looks. there are some limitations around padding and spacing noted in the css
  const saveAs = (blob, fileName) => {
    var elem = window.document.createElement("a");
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
        <Card id="exportContainer" />

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
      <button onClick={exportAsPicture}>screenshot</button>
    </>
  );
};

export default HtmlCanvasDemo;
