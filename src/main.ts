import './style.css'
import { Chart, LinearScale, LineController, PointElement, LineElement, Title, Tooltip, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

function prepareGraphData(tabData: { [timestamp: string]: number }): { labels: number[], data: number[] } {
    const oneDayAgo = Date.now() - 86400 * 1000 * 400;
    const filteredData = Object.entries(tabData)
      .filter(([timestamp, _]) => parseInt(timestamp) >= oneDayAgo)
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

    const labels = filteredData.map(([timestamp, _]) => parseInt(timestamp));
    const data = filteredData.map(([_, count]) => count);

    return { labels, data };
}

function drawGraph(labels: number[], data: number[]) {
    const ctx = (document.getElementById('tabCountChart') as HTMLCanvasElement).getContext('2d');
    if (ctx === null) {
        console.error('Failed to get canvas context');
        return;
    }

    Chart.register(LineController, LinearScale, PointElement, LineElement, Title, Tooltip, TimeScale);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'tabs',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'yyyy/MM/dd'
                        }
                    },
                    title: {
                        display: true,
                        text: 'time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'tabs'
                    }
                }
            }
        }
    });
}

chrome.storage.local.get(null, ( content ) => {
    const { labels, data } = prepareGraphData(content)
    drawGraph(labels, data)
});
