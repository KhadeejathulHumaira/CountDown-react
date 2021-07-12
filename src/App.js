import "./styles.css";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [date, setDate] = useState("");

  const [days, setDays] = useState("00");
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00"
  });
  const [inputDate, setInputDate] = useState("");
  let setInter = useRef();

  //=================================================================
  const countDown = () => {
    setInter = setInterval(() => {
      const currDate = new Date();
      const diffDate = (date - currDate) / 1000;
      if (diffDate < 0) {
        clearInterval(setInter.current);
      } else {
        setDays(Math.floor(diffDate / 3600 / 24));
        setTime({
          hours: Math.floor(diffDate / 3600) % 24,
          minutes: Math.floor(diffDate / 60) % 60,
          seconds: Math.floor(diffDate) % 60
        });
      }
    }, 1000);
  };

  const handleClick = () => {
    setDate(new Date(inputDate));
    setInputDate("");
  };

  const handleStopClick = () => {
    setTime({
      hours: "00",
      minutes: "00",
      seconds: "00"
    });
    setDate(0);
    setDays("00");
  };

  useEffect(() => {
    countDown();
    return () => {
      clearInterval(setInter);
    };
  });

  //================================================================
  return (
    <div className="App">
      <Container>
        <SetTimerDate>
          <input
            type="text"
            onChange={(e) => setInputDate(e.target.value)}
            value={inputDate}
            placeholder=" Eg. 02 Jun 2021"
          />
          <button disabled={!inputDate} onClick={handleClick}>
            Start
          </button>
        </SetTimerDate>
        <Timer>
          <SubContainer>
            <Heading>{days}</Heading>
            <Content>days</Content>
          </SubContainer>
          <SubContainer>
            <Heading>{time.hours}</Heading>
            <Content>hours</Content>
          </SubContainer>
          <SubContainer>
            <Heading>{time.minutes}</Heading>
            <Content>mins</Content>
          </SubContainer>
          <SubContainer>
            <Heading>{time.seconds}</Heading>
            <Content>seconds</Content>
          </SubContainer>
        </Timer>
        <StopButton>
          <button onClick={handleStopClick}>Stop</button>
        </StopButton>
      </Container>
    </div>
  );
}

//==========================Styling is done here========================
const SetTimerDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    margin: 0;
    padding: 0;
    padding-left: 15px;
    border: none;
    background-color: lightgray;
    height: 28px;
    border-radius: 3px;
    margin-right: 10px;
    :focus {
      outline: none;
    }
  }
  button {
    height: 28px;
    width: 50px;
    border: 1px solid gray;
    color: white;
    background-color: brown;
    border-radius: 3px;
  }
  margin-bottom: 30px;
`;

const Timer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 440px;
  padding: 50px;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("https://images.unsplash.com/photo-1597321600266-2e65048f02be?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHRpbWVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60");
`;
const SubContainer = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const Heading = styled.h2`
  margin: 0;
  color: white;
`;
const Content = styled.p`
  margin: 0;
  color: white;
`;
const StopButton = styled.div`
  margin-top: 30px;
  button {
    height: 28px;
    width: 50px;
    border: 1px solid gray;
    color: white;
    background-color: brown;
    border-radius: 3px;
  }
`;
