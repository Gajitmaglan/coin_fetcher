import React, { useState } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import homeStore from "../stores/homeStore.js";
import SearchBer from "./SearchBar";

const MainPage = () => {
  const store = homeStore();
  React.useEffect(() => {
    store.fetchCoins();
  }, []);

  return (
    <>
      <div className="mainpage-container">
        <div className="text-overlay">
          <SearchBer value={store.query} onChange={store.setQuery} />
          <div className="search-suggestions">
            {store.coins &&
              store.coins.map((coin) => {
                return (
                  <div className="list-item" key={coin.id}>
                    <Link to={`/${coin.id}`}>
                      <img className="list-item-img" src={coin.image} alt="" />
                      <div>{coin.name}</div>
                      <div>{coin.symbol}</div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
        <img id="one" src="/src/assets/img/1.jpg" alt="" />
      </div>
      <div className="filler-text">Hello here is some text</div>
      <div className="mainpage-container">
        <div className="text-overlay">
          <div className="trending">
            {store.trendingCoins &&
              store.trendingCoins.map((coin) => {
                return (
                  <div className="list-item" key={coin.id}>
                    <Link to={`/${coin.id}`}>
                      <img
                        className="list-item-img"
                        src={coin.image}
                        alt={coin.name + " img"}
                      />
                      <div>{coin.name}</div>
                      <div>${coin.priceUSD}</div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
        <img id="two" src="/src/assets/img/6.jpg" alt="" />
      </div>
    </>
  );
};

export default MainPage;
