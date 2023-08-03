import React, { PureComponent } from "react";
import { useParams } from "react-router-dom";
import showStore from "../stores/showStore";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./ShowPage.css";

const ShowPage = () => {
  const store = showStore();
  const params = useParams();

  React.useEffect(() => {
    store.fetchData(params.id);
  }, []);

  if (!store.data) return <h2> Loading... </h2>;

  return (
    <div id="show-page">
      <div className="text-overlay">
        <header>
          <img src={store.data.image.large} alt={store.data.name} />
          <h2>
            {store.data.name} ({store.data.symbol})
          </h2>
        </header>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={store.graphData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            {/* <CartesianGrid strokearray="3 3" /> */}
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Area type="linear" dataKey="Price" stroke="black" fill="#58F4F0" />
          </AreaChart>
        </ResponsiveContainer>

        <div className="coin-info">
          <div className="coin-info-item">
            <h4>Current Price: </h4>
            <span>${store.data.market_data.current_price.usd}</span>
          </div>
          <div className="coin-info-item">
            <h4>Market Cap Rank: </h4>
            <span>{store.data.market_cap_rank}</span>
          </div>
          <div className="coin-info-item">
            <h4>24h High: </h4>
            <span>${store.data.market_data.high_24h.usd}</span>
          </div>
          <div className="coin-info-item">
            <h4>24h Low: </h4>
            <span>${store.data.market_data.low_24h.usd}</span>
          </div>
          <div className="coin-info-item">
            <h4>Circulating Supply: </h4>
            <span>{store.data.market_data.circulating_supply}</span>
          </div>
          <div className="coin-info-item">
            <h4>1y change: </h4>
            <span>
              {store.data.market_data.price_change_percentage_1y.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
      <img id="background" src="/src/assets/img/3.jpg" alt="" />
    </div>
  );
};

export default ShowPage;
