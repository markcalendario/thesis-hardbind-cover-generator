import html2canvas from "html2canvas";

export default async function download(component) {
  const canvas = await html2canvas(component, {
    scale: 4,
    scrollX: 0,
    scrollY: -window.scrollY
  });

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "hardbound-component.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
