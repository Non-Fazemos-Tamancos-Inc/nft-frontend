import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

import './store.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Store() {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div id="store">
            <section className="store-section">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2>Market Price Trend</h2>
                            <div id="market-price-graphs">
                                <Line options={options} data={data} />;
                            </div>
                        </div>
                        <div className="col nft-sales">
                            <h2>NFTs for Sale</h2>
                            <ul className="row nft-list">
                                <li className="col nft-item">
                                    <img src="/nft/shoe.jpg" alt="NFT 1"/>
                                    <h3>THE Shoe</h3>
                                    <p>Price: $50</p>
                                    <button className="button-nft">BUY NOW</button>
                                </li>
                                <li className="col nft-item">
                                    <img src="/nft/greek.jpg" alt="NFT 2"/>
                                    <h3>Le Greek</h3>
                                    <p>Price: $75</p>
                                    <button className="button-nft">BUY NOW</button>
                                </li>
                                <li className="col nft-item">
                                    <img src="/nft/painting.jpg" alt="NFT 3"/>
                                    <h3>Mono Lisa</h3>
                                    <p>Price: $100</p>
                                    <button className="button-nft">BUY NOW</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h2>Orders Sent</h2>
                            <p>No orders have been sent yet.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Store;
