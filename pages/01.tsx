import React from "react";
import Head from "next/dist/next-server/lib/head";
import fetch from "node-fetch";

export async function getAllAPI() {
    const APIURL = "https://api.openweathermap.org/data/2.5/onecall?lat=35.6518205&lon=139.5446124&lang=ja&units=metric&appid=f9794935a670f65e810fe0253ce78aa8"
    const response = await fetch(APIURL)
    const data = await response.json()
    console.log(data)
}
getAllAPI()

var day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//var week = ["week0", "week1", "week2", "week3", "week4", "week5", "week6"];
var date = new Date();
console.log(day[date.getDay()]);

//get today's date
//document.getElementById("week").textContent = day[date.getDay()];

for(let i = 1; i < 7; i++){
    console.log(day[(date.getDay() + i)%7]);
    //get whole week date   
    //document.getElementById("week"+i).textContent = day[(date.getDay() + i)%7]; 
}

class HelloMessageClass extends React.Component{
    render(){
        return<div>Hello World</div>
    }
}

const HelloMessageFunction: React.FC = () => <div>Hello World</div>;

export default function Index(){
    return(
        <div className="container">
            <Head>
                <title>weather panel</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
                <div>
                    <HelloMessageClass />
                    <HelloMessageFunction />
                </div>
        </div>
    );
}