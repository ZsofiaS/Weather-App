import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      cardClicked: false,
      id: "hey",
      city: "London",
      error: false,
    }
  }
  clickHandler = (e) => {
      let idNew = e.target.getAttribute("value");
      this.setState ((prevState) => {
        return {
          cardClicked: true,
          id: idNew,
        };
      }, () => {
          console.log(this.state.id);
      });
  }
  changeHandler = (e) => {
    this.setState({
      city: e.target.value,
    })
  }
  search = (e) => {
    e.preventDefault();
    this.setState({ error: false });

    const apiKey = process.env.REACT_APP_API_KEY;
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=metric&appid=${apiKey}`

    fetch(url)
      .then((result) => {
          if (result.ok) {
          return result.json();
        } else {
          throw new Error("Something went wrong");
        }
        })
      .then((result) => {
            this.setState({
              data: result.list
            })
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true })
      });
    console.log(this.state.city);
  }

componentDidMount() {
  let city = "London";
  const apiKey = process.env.REACT_APP_API_KEY;
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`

fetch(url)
  .then(result => result.json())
  .then(
    (result) => {
    this.setState({
      data: result.list
    });
    console.log(this.state.data);
  },
)}

  render() {
    return (
      <>
        <h1 className="heading">5 day weather forecast</h1>
{this.state.error ? <p className="notFound">No such location, please search again.</p> : <h3 className="heading">{this.state.city}</h3>}

        <form onSubmit={this.search}>
           <input
           type="text"
           onChange={this.changeHandler}
           placeholder="Change city..."/>
          <button type="submit"><i className="search">Search</i></button>
        </form>

        <div className="container">

        {
          this.state.data.map((current) => {
            let tempMin = current.main.temp_min;
            let tempMax = current.main.temp_max;
            tempMin = Math.round(tempMin);
            tempMax = Math.round(tempMax);

            let date = current.dt_txt;
            let day = date.slice(8, 11);
            let time = date.slice(11, 16);
            let hour = date.slice(11,13);
            let month = date.slice(5, 7);
            switch (month) {
              case "01":
              month = "Jan"
              break;
              case "02":
              month = "Feb"
              break;
              case "03":
              month = "Mar"
              break;
              case "04":
              month = "Apr"
              break;
              case "05":
              month = "May"
              break;
              case "06":
              month = "June"
              break;
              case "07":
              month = "Jul"
              break;
              case "08":
              month = "Aug"
              break;
              case "09":
              month = "Sept"
              break;
              case "010":
              month = "Oct"
              break;
              case "11":
              month = "Nov"
              break;
              case "12":
              month = "Dec"
              break;
            }
            let sky = current.weather[0].main;
            let picSky;
            switch (sky) {
              case "Clear":
                if (hour == "06" || hour == "09" || hour == "12" || hour == "15" || hour == "18" ) {
                  picSky = "https://dl.dropboxusercontent.com/s/aqvx44det3n7cur/day.svg?dl=0";
                } else {
                  picSky = "https://dl.dropboxusercontent.com/s/7fj2ad8nqu62m46/night.svg?dl=0"
                };
                break;
              case "Clouds":
                picSky = "https://dl.dropboxusercontent.com/s/q2juqm1vkwk3w4s/cloudy.svg?dl=0";
                break;
              case "Rain":
                picSky = "https://dl.dropboxusercontent.com/s/j21bkuz1qnw0gou/rainy-6.svg?dl=0";
                break;
              case "Snow":
                  picSky = "https://dl.dropboxusercontent.com/s/2go41c658msipl9/snowy-6.svg?dl=0";
                  break;
              default:
                picSky = "https://dl.dropboxusercontent.com/s/q2juqm1vkwk3w4s/cloudy.svg?dl=0";
                break;
            }
        if (hour !== "15") {
        return;
        } else {
        return (
        <Card
        id={this.state.id}
        key={current.dt}
        value={day}
        tempMin={tempMin}
        tempMax={tempMax}
        day={day}
        time={time}
        date={date}
        month={month}
        sky={picSky}
        clicked={this.clickHandler}/>
        )
        }
        }
        )
        }
        </div>

        <div className="container2">

        {
          this.state.cardClicked ?

          this.state.data.map((current) => {

            let date = current.dt_txt;
            let day = current.dt_txt.slice(8, 11);
            let time = date.slice(11, 16);
            let hour = date.slice(11,13);
            let tempMin = current.main.temp_min;
            let tempMax = current.main.temp_max;
            tempMin = Math.round(tempMin);
            tempMax = Math.round(tempMax);

            let sky = current.weather[0].main;
            let picSky;
            switch (sky) {
              case "Clear":
                if (hour == "06" || hour == "09" || hour == "12" || hour == "15" || hour == "18" ) {
                  picSky = "https://dl.dropboxusercontent.com/s/aqvx44det3n7cur/day.svg?dl=0";
                } else {
                  picSky = "https://dl.dropboxusercontent.com/s/7fj2ad8nqu62m46/night.svg?dl=0"
                };
                break;
              case "Clouds":
                picSky = "https://dl.dropboxusercontent.com/s/q2juqm1vkwk3w4s/cloudy.svg?dl=0";
                break;
              case "Rain":
                picSky = "https://dl.dropboxusercontent.com/s/j21bkuz1qnw0gou/rainy-6.svg?dl=0";
                break;
              case "Snow":
                  picSky = "https://dl.dropboxusercontent.com/s/2go41c658msipl9/snowy-6.svg?dl=0";
                  break;
              default:
                picSky = "https://dl.dropboxusercontent.com/s/q2juqm1vkwk3w4s/cloudy.svg?dl=0";
                break;
            }

            if ( day !== this.state.id ) {
              return;
            } else {
              return (
                <MiniCard
                key={current.dt}
                tempMin={tempMin}
                tempMax={tempMax}
                time={time}
                sky={picSky}/>
              )
            }
        }
  )
          :

          <div></div>
  }
  </div>

      </>
)
}
}

const Card = props =>  (
    <div
      className={props.id == props.day ? "cardClicked" : "card"}
      onClick={props.clicked}
      value={props.value}>
      <h3 value={props.value}>{props.day} {props.month}</h3>
      <img value={props.value} src={props.sky} alt=""/>
      <div value={props.value} className="temp">
      <p value={props.value}>{props.tempMax}°C</p>
      </div>
    </div>
  )

const MiniCard = props => (
  <div
    className="MiniCard">
    <h5>
    {props.time}
    </h5>
    <img src={props.sky} alt=""/>
    <div className="temp">
    <p>{props.tempMax}°C</p>
    </div>
  </div>
)

export default App;
