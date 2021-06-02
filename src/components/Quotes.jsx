import React, { useState, useEffect } from "react";
import axios from "axios";

import twitterIcon from '../twitter.svg';
import tumblrIcon from '../tumblr.svg';


const Quotes = () => {
  const [stateText, setText] = useState("Attitude is more important than the past, than education, than money, than circumstances, than what people do or say. It is more important than appearance, giftedness, or skill.");

  const [stateAuthor, setAuthor] = useState("Charles R. Swindoll");


  const getQuote = () => {

    axios
      .get(`https://goquotes-api.herokuapp.com/api/v1/random?count=1`)
      .then((data) => {
        setText(data.data.quotes[0].text);
        setAuthor(data.data.quotes[0].author)
        console.log(data.data.quotes[0].text);
        console.log(data.data.quotes[0].author);
      })
      .catch((err) => {
        setText({
          loading: false,
          error: err, 
        });
        setAuthor({
            loading: false,
            error: err,
          });
      });
  };

  return (
    <div id="quote-box">
      <div id="text"><p>{stateText}</p></div>
      <div id="author"><p>{stateAuthor}</p></div>

      <div id="buttons">
        <div className="social-media">
          <a href={`https://twitter.com/intent/tweet/?text="${stateText}${stateAuthor}"&hashtags=quotes`} id="twet-quote" target="_blank">
            <span><img src={twitterIcon} alt="" /></span>
          </a>
          <a href="https://www.tumblr.com/login" target="_blank" id="tumlr-quote">
            <span><img src={tumblrIcon} alt="" /></span>
          </a>
        </div>
        <button onClick={getQuote} id="new-quote">New Quote</button>
      </div>
    </div>
  );
};

export default Quotes;
