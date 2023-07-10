import React, { useState, useEffect } from 'react';
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
import Nft, { NftData } from '../../api/Nft';

import './store.css';
import {faker} from "@faker-js/faker";

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
    const [nfts, setNfts] = useState<any[]>([]);

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

    useEffect(() => {
        const fetchNfts = async () => {
            try {
                const nfts = await Nft.getNfts();
                setNfts(nfts);
            } catch (error) {
                console.error('Error fetching NFTs');
            }
        };

        fetchNfts();
    }, []);

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
                                {nfts.map((nft) => nft.on_market ? (
                                    <li className="col nft-item" key={nft.id}>
                                        <img src={"http://localhost:8080/" + nft.src} alt={`NFT ${nft.id}`} />
                                        <h3>{nft.name}</h3>
                                        <p>Price: ${nft.price}</p>
                                        <button className="button-nft">BUY NOW</button>
                                    </li>
                                ) : null)}
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