import React, { useState, useEffect, Component } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import USAMap from "react-usa-map";
import state from '../data.json'
import { Doughnut, Bar , Line, Pie } from 'react-chartjs-2';
import './Main.css'

const Main = () => {
  const states = state
  const [positive, setPositive] = useState(0)
  const [negative, setNegative] = useState(0)
  const [death, setDeath] = useState(0)
  const [todaypositive, setTodaypositive] = useState(0)
  const [test, setTest] = useState(0)
  const [todaytest, setTodaytest] = useState(0)
  const [todaydeath, setTodaydeath] = useState(0)
  const [todayhospitalize, setTodayhospitalize] = useState(0)
  const [recovered, setRecovered] = useState(0)
  const [todayupdate, setTodayupdate] = useState("")
  const [usHistory, setUSHistory] = useState([]);

  //fetch all data from march to today
  const fetchAllState = () => {
    axios.get("https://api.covidtracking.com/v1/us/daily.json")
    .then(res => {
      setUSHistory(res.data)
      setTest(res.data[0].totalTestResults)
      setPositive(res.data[0].positive)
      setNegative(res.data[0].negative)
      setDeath(res.data[0].death)
      setTodaytest(res.data[0].totalTestResultsIncrease)
      setTodaypositive(res.data[0].positiveIncrease)
      setTodaydeath(res.data[0].deathIncrease)
      setTodayhospitalize(res.data[0].hospitalizedIncrease)
      setRecovered(res.data[0].recovered)
      setTodayupdate(res.data[0].lastModified)
    })
    .catch(err =>console.log(err));
  }

  const [current, setCurrent] = useState([])

  const fetchStateCurrent = () => {
    axios.get("https://api.covidtracking.com/v1/states/current.json")
    .then(res => {
      console.log(res.data)
      setCurrent(res.data)
    })
    .catch(err =>console.log(err));
  }


  // fetch data all time
  useEffect(()=>{
    fetchAllState();
    fetchStateCurrent();
  },[])


  // navigate to selected State info url
  const mapHandler = (e) => {
      navigate("/stateinfo/"+e.target.dataset.name)
  };


  // nagigate to selected State by option Selection
  const selectSt = (e) => {
    navigate("/stateinfo/"+e)
  }


  // optional customization of filling per state and calling custom callbacks per state
  const statesCustomConfig = () => {
    var obj = {}
    //set change by number of positive
    const changeColor = (number) =>{
      var color;
      if (number < 15000){
        color = "#ffe9f4"
      }
      else if( number >= 15000 && number < 40000){
        color = "#e6dbdc"
      }
      else if( number >= 40000 && number < 80000){
        color = "#ffced9"
      }
      else if( number >= 80000 && number < 150000){
        color = "#ffc0cb"
      }
      else if( number >= 150000 && number < 230000){
        color = "#f1b3be"
      }
      else if( number >= 150000 && number < 350000){
        color = "#e3a5b0"
      }
      else{
        color = "#d598a3"
      }
      return color
    }
    
    // get every states' info and add in obj
    for(var i = 0; i < current.length; i++){
      obj[current[i].state] = {fill:changeColor(current[i].positive)}
    }
    //change map color depends on each positive of state
    return obj
  };


  //weekly line table
  const weeklyChart ={
    chartData:{
      labels:[
        usHistory[6] ? usHistory[6].date : false,
        usHistory[5] ? usHistory[5].date : false,
        usHistory[4] ? usHistory[4].date : false,
        usHistory[3] ? usHistory[3].date : false,
        usHistory[2] ? usHistory[2].date : false,
        usHistory[1] ? usHistory[1].date : false,
        usHistory[0] ? usHistory[0].date : false,
      ],
      datasets:[
        {
          label: "Positive",
          fill: false,
          borderColor:"red",
          data:[
            usHistory[6] ? usHistory[6].positiveIncrease : false,
            usHistory[5] ? usHistory[5].positiveIncrease : false,
            usHistory[4] ? usHistory[4].positiveIncrease : false,
            usHistory[3] ? usHistory[3].positiveIncrease : false,
            usHistory[2] ? usHistory[2].positiveIncrease : false,
            usHistory[1] ? usHistory[1].positiveIncrease : false,
            usHistory[0] ? usHistory[0].positiveIncrease : false,
          ]

          // can change color by add background color
          // backgroundColor:[
          //   'red',
          //   'orange',
          //   'yellow',
          //   'green',
          //   'blue',
          //   'indigo',
          //   'violet'
          // ]
        },
        {
          label: "Death",
          fill: false,
          borderColor:"blue",
          hidden: true,
          data:[
            usHistory[6] ? usHistory[6].deathIncrease : false,
            usHistory[5] ? usHistory[5].deathIncrease : false,
            usHistory[4] ? usHistory[4].deathIncrease : false,
            usHistory[3] ? usHistory[3].deathIncrease : false,
            usHistory[2] ? usHistory[2].deathIncrease : false,
            usHistory[1] ? usHistory[1].deathIncrease : false,
            usHistory[0] ? usHistory[0].deathIncrease : false,
          ]
        },
        {
          label: "Hospitalized",
          fill: false,
          borderColor:"skyblue",
          hidden: true,
          data:[
            usHistory[6] ? usHistory[6].hospitalizedIncrease : false,
            usHistory[5] ? usHistory[5].hospitalizedIncrease : false,
            usHistory[4] ? usHistory[4].hospitalizedIncrease : false,
            usHistory[3] ? usHistory[3].hospitalizedIncrease : false,
            usHistory[2] ? usHistory[2].hospitalizedIncrease : false,
            usHistory[1] ? usHistory[1].hospitalizedIncrease : false,
            usHistory[0] ? usHistory[0].hospitalizedIncrease : false,
          ]
        },
        {
          label: "Tested",
          fill: false,
          borderColor:"indigo",
          hidden: true,
          data:[
            usHistory[6] ? usHistory[6].totalTestResultsIncrease : false,
            usHistory[5] ? usHistory[5].totalTestResultsIncrease : false,
            usHistory[4] ? usHistory[4].totalTestResultsIncrease : false,
            usHistory[3] ? usHistory[3].totalTestResultsIncrease : false,
            usHistory[2] ? usHistory[2].totalTestResultsIncrease : false,
            usHistory[1] ? usHistory[1].totalTestResultsIncrease : false,
            usHistory[0] ? usHistory[0].totalTestResultsIncrease : false,
          ]
        }
      ]
    }
  }

  // Monthly chart
  // get first day of each month
  const getfirstdayofMonth = (array) => {
    const date = [];
    const positive = []
    const death = []
    const totalTestResults = []
    var output = []
    for(var i = array.length-1; i >= 0; i--){
        if(array[i].date.toString().endsWith("01") === true){
            date.push(array[i].date)
            positive.push(array[i].positive)
            death.push(array[i].death)
            totalTestResults.push(array[i].totalTestResults)
        }
    }
    output = [date, positive, death, totalTestResults]
    console.log(output)
    return output
  }
  getfirstdayofMonth(usHistory)
  const monthlyChart ={
    chartData:{
      labels:getfirstdayofMonth(usHistory)[0],
      datasets:[
        {
          label: "Positive",
          fill: false,
          borderColor:"red",
          data:getfirstdayofMonth(usHistory)[1]
        },
        {
          label: "Death",
          fill: false,
          borderColor:"blue",
          hidden: true,
          data:getfirstdayofMonth(usHistory)[2]
        },
        {
          label: "Tested",
          fill: false,
          borderColor:"indigo",
          hidden: true,
          data:getfirstdayofMonth(usHistory)[3]
        }
      ]
    }
  }

  // positive percentage pie table
  const negposChart ={
    chartData:{
      labels: [
        'Positive',
        'Negative'
      ],
      datasets:[
        {
          fill: false,
          // borderColor:"red",
          data:[
            usHistory[0] ? usHistory[0].positive : false ,
            usHistory[0] ? usHistory[0].negative : false,
          ],
          backgroundColor:[
            'lightskyblue',
            'tomato',
          ]
        },  
      ]
    }
  }

  //death ratio chart
  const deathChart ={
    chartData:{
      labels: [
        'Death',
        'Positive'
      ],
      datasets:[
        {
          fill: false,
          // borderColor:"red",
          data:[
            usHistory[0] ? usHistory[0].positive : false ,
            usHistory[0] ? usHistory[0].negative : false,
          ],
          backgroundColor:[
            'gold',
            'indigo',
          ]
        },  
      ]
    }
  }



  return (
    <div className="App">
      <h1>COVID-19 Tracker</h1>

      {/* left col */}
      <div className="col col-md-6">
        {/* today's updated data */}
        <div className="content_numeric">
          <h2>US Patient Status</h2>
          <p style={{fontSize:"10px",marginTop:"-25px"}}>(updated at {todayupdate})</p>
          
          <div className="datatable cumulative">
            <h2 className="title cumulative">Cumulative</h2>
            <div className="tested">
              <h3>Tested</h3>
              <p>{test}</p>
            </div>
            <div className="positive">
              <h3>Positive</h3>
              <p>{positive}</p>
            </div>
            <div className="recovered">
              <h3>Recovered</h3>
              <p>{recovered}</p>
            </div>
            <div className="death">
              <h3>Death</h3>
              <p>{death}</p>
            </div>
          </div>

          <div className="datatable today">
            <h2 className="title today">Today</h2>
            <div className="testtoday">
              <h3>Tested</h3>
              <p>{todaytest}</p>
            </div>
            <div className="positivetoday">
              <h3>Positive</h3>
              <p>{todaypositive}</p>
            </div>
            <div className="hospitalizetoday">
              <h3>Hospitalized</h3>
              <p>{todayhospitalize}</p>
            </div>
            <div className="deathtoday">
              <h3>Death</h3>
              <p>{todaydeath}</p>
            </div>
          </div>
        </div>
        
        {/* weekly line table */}
        <div className="content_table">
          <Line
            data={weeklyChart.chartData}
            height={150}
            options={{
              title:{
                display:true,
                text:"COVID Trends for Last 7 days",
                fontSize: 25,
              },
              // legend location
              legend:{
                display:true,
                position:"right",
              }
            }}
          />
        </div>

        {/* monthly line table */}
        <div className="content_table">
          <Line
            data={monthlyChart.chartData}
            height={150}
            options={{
              title:{
                display:true,
                text:"Monthly COVID Trends",
                fontSize: 25,
              },
              // legend location
              legend:{
                display:true,
                position:"right",
              }
            }}
          />
        </div>

        {/* pos/neg ratio */}
        <div className="doughnut">
        <Doughnut
            data={negposChart.chartData}
            height={250}
            options={{
              //prevent legends disapearing
              legend: {
                onClick: (e) => e.stopPropagation()
              },
              title:{
                display:true,
                text:"Positive Negative Ratio",
                fontSize: 15
              }
            }}
          />
          <div className="percentage">
            <h4>{(positive / (positive+negative) * 100).toFixed(2)} %</h4>
          </div>
        </div>

        {/* death ratio */}
        <div className="doughnut">
        <Doughnut
            data={deathChart.chartData}
            height={250}
            options={{
              //prevent legends disapearing
              legend: {
                onClick: (e) => e.stopPropagation()
              },
              title:{
                display:true,
                text:"Death Ratio",
                fontSize: 15
              }
            }}
          />
          <div className="percentage">
            <h4>{(death / (positive) * 100).toFixed(2)} %</h4>
          </div>
        </div>
      </div>

      {/* right col */}
      <div className="col col-md-6">
        <h2>Select State</h2>
        {/* state selection */}
        <div>
          <select id="selectstate" name="selectstate" onChange={e => selectSt(e.target.value)}>
            <option type="select" disabled selected>Select State</option>
            {states.map(a=>
            <option type="select" value={a.abbreviation}>{a.name}</option>
            )}
          </select>
        </div>  

        <div className="usmap">
          <USAMap customize={statesCustomConfig()} onClick={mapHandler} width="500px" defaultFill="lightpink"/>
          {/* color bar */}
          <table class="table colorbar" >
            <thead>
              <tr>
                <th style={{backgroundColor:"#ffe9f4", height:"10px", width:"70px"}}></th>
                <th style={{backgroundColor:"#e6dbdc", height:"10px", width:"70px"}}></th>
                <th style={{backgroundColor:"#ffced9", height:"10px", width:"70px"}}></th>
                <th style={{backgroundColor:"#ffc0cb", height:"10px", width:"70px"}}></th>
                <th style={{backgroundColor:"#f1b3be", height:"10px", width:"70px"}}></th>
                <th style={{backgroundColor:"#e3a5b0", height:"10px", width:"70px"}}></th>
                <th style={{backgroundColor:"#d598a3", height:"10px", width:"70px"}}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><h5>15000</h5><p style={{marginTop:"-25px"}}>Less</p></td>
                <td><h5>40000</h5><p style={{marginTop:"-25px"}}>Less</p></td>
                <td><h5>80000</h5><p style={{marginTop:"-25px"}}>Less</p></td>
                <td><h5>150000</h5><p style={{marginTop:"-25px"}}>Less</p></td>
                <td><h5>230000</h5><p style={{marginTop:"-25px"}}>Less</p></td>
                <td><h5>350000</h5><p style={{marginTop:"-25px"}}>Less</p></td>
                <td><h5>350000</h5><p style={{marginTop:"-25px"}}>More</p></td>
              </tr>
            </tbody>
          </table>
        </div>


        {/* allstate table data */}
        <div style={{marginTop:"-70px"}}>
          <h2>All States Info</h2>
          <div style={{height:"400px", overflow:"auto", marginBottom:"80px"}}>
            <table class="table">
              <thead>
                <th style={{width:"125px"}}>State</th>
                <th style={{width:"125px"}}>Tested</th>
                <th style={{width:"125px"}}>Positive</th>
                <th style={{width:"125px"}}>Death</th>
              </thead>
              {
                current.map(s=>
                  <tbody>
                    <tr>
                      {s.state ? <th>{s.state}</th> : false}
                      {s.totalTestsPeopleViral ? <td>{s.totalTestsPeopleViral}</td> : <td><a href={"/stateinfo/"+ s.state}>Check StateInfo</a></td>}
                      {s.positive ? <td>{s.positive}</td> : <td><a href={"/stateinfo/"+ s.state}>Check StateInfo</a></td>}
                      {s.death ? <td>{s.death}</td> : <td><a href={"/stateinfo/"+ s.state}>Check StateInfo</a></td>}
                    </tr>
                  </tbody>
                )
              }
            </table>
          </div>
        </div>
        <span> </span>
      </div>
    </div>
  );
}

export default Main;