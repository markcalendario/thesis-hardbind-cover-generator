import domtoimage from "dom-to-image";

export default async function download(component) {
  const scale = 10;

  domtoimage
    .toPng(component, {
      width: component.clientWidth * scale,
      height: component.clientHeight * scale,
      style: {
        transform: "scale(" + scale + ")",
        transformOrigin: "top left"
      }
    })
    .then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.png";
      link.href = dataUrl;
      link.click();
    });
}
