import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  <p></p>
`

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

chrome.storage.local.get(null, ( content ) => {
    console.log(content);
});

