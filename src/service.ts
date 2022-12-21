import {countsKey} from "./constants";

chrome.tabs.onCreated.addListener(
    () => {
      saveCount();
    }
)

chrome.tabs.onRemoved.addListener(
    () => {
      saveCount();

    }
)


function saveCount(){
  chrome.windows.getAll(
    {populate: true},
    (windows: Window[]) => {

      let count = 0;
      windows.forEach(function(window: Window){
        count += window.tabs.length;
      });

      console.log(count);

      let key = new Date().getTime().toString();
      let value = count.toString();
      console.log(key);
      chrome.storage.local.set({ [key]: value }).then(() => {
        console.log(key + " Value is set to " + count.toString());
      });
    },
  );
}
