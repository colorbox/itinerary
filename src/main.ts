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
         console.log('AAAAAAAAA');


         let count = 0;
         windows.forEach(function(window: Window){
             count += window.tabs.length;
         });

         console.log(count);

    },
);

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
