import React, {Component} from 'react';
import * as d3 from 'd3';
import {getCoinList} from '../utils/api';
import './ChartStyles.css';


class Charts extends Component {

  fetchCoinPage = async (data) => {
    try {
      const coinPage = await getCoinList(1);
      data = coinPage.map((coin: any) => Math.ceil(coin.current_price));
      this.drawBarChart(data);
      this.drawBarChart(data);
      // this.drawThreeChart(data);
      // this.drawFourChart(data);
      // this.drawFiveChart(data);
    } finally {
      console.log();
    }
  };

  componentDidMount() {
    let data: Array<number>;
    data = [];
    this.fetchCoinPage(data);
  }
    
  drawBarChart(data1) {
    let data = [...data1];
    console.log(data1);
    const w = 700;
    const h = 400;
    
    const svg = d3.select('#bar-chart')
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("margin-left", 100);
                  
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");

    svg.selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text((d) => d)
  .attr("x", (d, i) => i * 70)
  .attr("y", (d, i) => h - (10 * d) - 3);


  }
        
  render() {
    return <div className="chart-container">
      <div className="container-item" id="bar-chart"></div>
      <div className="container-item" id="two-chart"></div>
      <div className="container-item" id="three-chart"></div>
      <div className="container-item" id="four-chart"></div>
      <div className="container-item" id="five-chart"></div>
    </div>

  }
}
    
export default Charts;