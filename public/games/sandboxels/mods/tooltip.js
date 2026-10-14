const devMode = false;
// Tippy depends on popper
const popperUrl = "mods/lib/popper.min.js";
const tippyUrl = "mods/lib/tippy-bundle.umd.js";
window.addEventListener("load", ()=>{
  let popper = document.createElement("script");
  popper.src = popperUrl;
  popper.addEventListener("load", () => {
    let tippyScr = document.createElement("script");
    tippyScr.src = tippyUrl;
    tippyScr.addEventListener("load", ()=>main(), {passive: true});
    document.body.appendChild(tippyScr);
  }, {passive: true});
  document.body.appendChild(popper);
}, {passive: true});
function main() {
  [...document.getElementsByClassName("elementButton")].forEach(button=>{
    let ele = elements[button.getAttribute("element")];
    if(ele === undefined || ele === null) return;
    if(ele.desc) {
      button.setAttribute("data-tippy-content", `<div>${ele.desc}</div>`);
      if(ele.desc.includes("<!--INTERACTIVE-->")) {
        button.setAttribute("data-tippy-interactive", true);
      }
    }
  });
  tippy("[data-tippy-content]", {
    allowHTML: true,
    duration: 0,
    placement: "bottom"
  });
}
