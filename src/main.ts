import './style.css'

import {countsKey} from "./constants";

chrome.storage.local.get(null, ( content ) => {
    let counts = [];
    for(let k in content){
        let d = new Date(+k);
        counts.push([`${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`, content[k]]);
    }

    let table = document.createElement('table')
    for(let count in counts.reverse()){
        let tr = document.createElement('tr');
        let tdDate = document.createElement('td')
        tdDate.append(counts[count][0]);
        tr.append(tdDate)

        let tdCount = document.createElement('td')
        tdCount.append(counts[count][1]);
        tr.append(tdCount)

        table.append(tr);
    }
    const app = document.querySelector<HTMLDivElement>('#app')!;
    app.append(table)

});
