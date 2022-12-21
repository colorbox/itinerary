import './style.css'

import {countsKey} from "./constants";

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`

chrome.storage.local.get(null, ( content ) => {
    console.log(content);
});
