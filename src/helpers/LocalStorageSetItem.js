export default function SetItemLS(name, item) {
  window.localStorage.setItem(name, item);
  window.dispatchEvent(new Event("storage"));
}
