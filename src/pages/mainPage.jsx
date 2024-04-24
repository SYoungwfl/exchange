import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setRate, setDate } from "../redux/slice";
import styled from "styled-components";

function MainPage() {
  
  const country = ["USD", "CAD", "KRW", "HKD", "JPY", "CNY"];
  const [inputAmount, setinputAmount] = React.useState(0);  
  const [selectFrom, setselectFrom] = React.useState("USD");  
  const [selectTo, setselectTo] = React.useState("CAD");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [date2, setDate2] = React.useState("날짜를 선택해주세요");

  const dispatch = useDispatch();
  const { rate, date } = useSelector((state) => state.exchange);

 
  const amountChanged = (e) => {
    
    e.target.value = Number(e.target.value.replace(/[^0-9]/g, ""));

    setinputAmount(e.target.value);

    e.target.value = e.target.value
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  
  const countryChanged = (e) => {
    
    setselectFrom(e.target.value);

    if (e.target.value === "USD") setselectTo("CAD");
    else setselectTo("USD");
  };

 
  const countryClick = (e) => {
    
    setselectTo(e.target.value);
  };

  
  const dateChanged = (e) => {
    try {
      axios.get(
        `https://api.apilayer.com/exchangerates_data/${date}?base=USD&symbols=USD,CAD,KRW,HKD,JPY,CNY&apikey=${process.env.REACT_APP_API_KEY}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        dispatch(setRate(response.data.rates));
      });
    } catch (error) {
      console.error(error);
    }

    
    dispatch(setDate(e.target.value));

    const newDate = new Date(e.target.value);
    const year = newDate.getFullYear();
    const month = months[newDate.getMonth()];
    const day =
      newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();

    setDate2(`${year}-${month}-${day}`);
  };

  return (
    <StyledAppContainer>
      <StyledInnerContainer>
        <StyledCenter>
          <input
            id="costInput"
            type="text"
            dir="rtl"
            placeholder={selectFrom}
            onChange={amountChanged}
            style={{
              fontSize: "30px",
              height: "34px",
              margin: "5px",
            }}
          />

          <select
            id="countryIn"
            onChange={countryChanged}
            defaultValue="USD"
            style={{
              fontSize: "30px",
              height: "40px",
              margin: "5px",
            }}
          >
            {country.map((country1) => {
              return (
                <option key={country1} value={country1}>
                  {country1}
                </option>
              );
            })}
          </select>
        </StyledCenter>

        <StyledCenter>
          {country.map((country2) => {
            if (country2 !== selectFrom)
              return (
                <button
                  key={country2}
                  id={country2}
                  value={country2}
                  onClick={countryClick}
                  style={{
                    fontSize: "30px",
                    height: "40px",
                    margin: "5px",
                  }}
                >
                  {country2}
                </button>
              );
          })}
        </StyledCenter>

        <StyledResultRow>
          <p
            style={{
              fontSize: "50px",
              color: "blueviolet",
            }}
          >
            {selectTo + ":"}&nbsp;
          </p>
         
          <p
            style={{
              fontSize: "50px",
            }}
          >
            {(inputAmount / rate[selectFrom]) * rate[selectTo]}
          </p>
        </StyledResultRow>

        <StyledCenter>
          <p
            style={{
              fontSize: "30px",
            }}
          >
            {date2}
          </p>
        </StyledCenter>

        <StyledCenter>
          <p
            style={{
              fontSize: "30px",
            }}
          >
            기준일:&nbsp;
          </p>
          <input
            id="dateIn"
            type="date"
            value={date}
            onChange={dateChanged}
            style={{
              fontSize: "30px",
            }}
          />
        </StyledCenter>
      </StyledInnerContainer>
    </StyledAppContainer>
  );
}

export default MainPage;

const StyledAppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 600px;
  margin: 50px;
  border: solid;
`;

const StyledCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledResultRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 300px;
`;
