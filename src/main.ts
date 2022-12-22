import './style.css'

import {countsKey} from "./constants";



chrome.storage.local.get(null, ( content ) => {
    const app = document.querySelector<HTMLDivElement>('#app')!;

    let counts = [];
    for(let k in content){
        let d = new Date(+k);
        counts.push(`${d}:${content[k]}`);
    }

    for(let count in counts.reverse()){

        let p = document.createElement('p');
        p.append(counts[count]);
        app.append(p);
    }
});
