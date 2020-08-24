import React, { useState, useEffect, Component } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import allstate from '../data.json'
// import 'bulma/css/bulma.min.css';
import './Stateinfo.css'
import { Doughnut, Bar , Line, Pie } from 'react-chartjs-2';

const Stateinfo = (props) => {
    const [state, setState] = useState("")
    const [test, setTest] = useState(0)
    const [positive, setPositive] = useState(0)
    const [negative, setNegative] = useState(0)
    const [death, setDeath] = useState(0)
    const [todaydeath, setTodaydeath] = useState(0)
    const [todaypositive, setTodaypositive] = useState(0)
    const [recovered, setRecovered] = useState(0)
    const [todaytest, setTodaytest] = useState(0)
    const [todayhospitalize, setTodayhospitalize] = useState(0)
    const [todayupdate, setTodayupdate] = useState("")
    const [usHistory, setUSHistory] = useState([]);


    //get today's stateinfo and store in each const
    const fetchStateInfo = () =>{
        axios.get("https://api.covidtracking.com/v1/states/" + props.abbreviation + "/daily.json")
        .then(res => {
            setUSHistory(res.data)
            setState(res.data[0].state)
            setTest(res.data[0].totalTestsPeopleViral)
            setPositive(res.data[0].positive)
            setNegative(res.data[0].negative)
            setDeath(res.data[0].death)
            setTodaydeath(res.data[0].deathIncrease)
            setTodaypositive(res.data[0].todaypositive)
            setTodaytest(res.data[0].totalTestResultsIncrease)
            setTodayhospitalize(res.data[0].hospitalizedIncrease)
            setRecovered(res.data[0].recovered)
            setTodayupdate(res.data[0].lastUpdateEt)
        })
        .catch(err =>console.log(err));
    }

    const[testingCenter, setTestingCenter] = useState();

    const fetchTestLocation = () =>{
        const fullStateName = (st) => {
            for(var i = 0; i < allstate.length; i++){
                if(allstate[i].abbreviation == st){
                    console.log(allstate[i].location)
                    return allstate[i].location
                }
            }
        }
        axios.get("https://covid-19-testing.github.io/locations/" + fullStateName(props.abbreviation) + "/complete.json")
        .then(res => {
            console.log(res.data)
            setTestingCenter(res.data)
        })
        .catch(err =>console.log(err));
    }

    useEffect(()=>{
        fetchStateInfo();
        fetchTestLocation();
    },[])


    //chart for last 7 days
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

    return(
        <div>
            <h1>COVID-19 in {state}</h1>
            {/* numeric data */}
            <div className="col col-md-6">
                {/* today's updated data */}
                <div className="content_numeric">
                <h2>{state} Patient Status</h2>
                <p style={{fontSize:"10px",marginTop:"-25px"}}>(updated at {todayupdate})</p>
                
                <div className="datatable cumulative">
                    <h2 className="title cumulative">Cumulative</h2>
                    <div className="tested">
                        <h3>Tested</h3>
                        {test ? <p>{test}</p> : <p>{positive+negative}</p>}
                    </div>
                    <div className="positive">
                        <h3>Positive</h3>
                        {positive ? <p>{positive}</p> : <p>0</p>}
                    </div>
                    <div className="recovered">
                        <h3>Recovered</h3>
                        {recovered ? <p>{recovered}</p> : <p>0</p>}
                    </div>
                    <div className="death">
                        <h3>Death</h3>
                        {death ? <p>{death}</p> : <p>0</p>}
                    </div>
                </div>

                <div className="datatable today">
                    <h2 className="title today">Today</h2>
                    <div className="testtoday">
                        <h3>Tested</h3>
                        {todaytest ? <p>{todaytest}</p> : <p>0</p>}
                    </div>
                    <div className="positivetoday">
                        <h3>Positive</h3>
                        {todaypositive ? <p>{todaypositive}</p> : <p>0</p>}
                    </div>
                    <div className="hospitalizetoday">
                        <h3>Hospitalized</h3>
                        {todayhospitalize ? <p>{todayhospitalize}</p> : <p>0</p>}
                    </div>
                    <div className="deathtoday">
                        <h3>Death</h3>
                        {todaydeath ? <p>{todaydeath}</p> : <p>0</p>}
                    </div>
                </div>
                </div>
            </div>

            {/* visual data */}
            <div className="col col-md-6">
                <h2>Positive & death Ratio</h2>
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

            {/* weekly line table */}
            <div className="content_table" style={{padding:"0px 140px"}}>
            <Line
                data={weeklyChart.chartData}
                height={120}
                options={{
                title:{
                    display:true,
                    text:"COVID Trends for Last 7 days",
                    fontSize: 25,
                }
                }}
            />
            </div>

            {/* monthly line table */}
            <div className="content_table" style={{padding:"0px 140px"}}>
            <Line
                data={monthlyChart.chartData}
                height={120}
                options={{
                title:{
                    display:true,
                    text:"Monthly COVID Trends",
                    fontSize: 25,
                }
                }}
            />
            </div>

            {/* state testing center location */}
            <div className="testinglocation">
                {testingCenter ? <h1>Testing Center in {state}</h1>: false}
                {
                    testingCenter ?
                        testingCenter.map(a=>
                            <ol className="location">
                                <h3>{a.name}</h3>
                                {a.physical_address[0] ? <p><span style={{fontWeight:"bolder"}}>Address:</span> {a.physical_address[0].address_1}, {a.physical_address[0].city} {a.physical_address[0].state_province} {a.physical_address[0].postal_code}</p> : false}
                                {a.phones[0] ? <p><span style={{fontWeight:"bolder"}}>Phone:</span> {a.phones[0].number}</p> : false}
                                {a.regular_schedule[0] ? <p><span style={{fontWeight:"bolder"}}>Open Hour:</span> {a.regular_schedule[0].opens_at} to {a.regular_schedule[0].closes_at}</p> : false}
                            </ol>
                        ) :
                        false
                
                }
            </div>
        </div>
    );
}
export default Stateinfo;
