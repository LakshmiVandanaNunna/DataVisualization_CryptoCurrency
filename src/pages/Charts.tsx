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
      this.drawPieChart(data);
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
      .attr("width", 5)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "blue");

    svg.selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text((d) => d)
  .attr("x", (d, i) => i * 70)
  .attr("y", (d, i) => h - (10 * d) - 3);
  }

  drawPieChart(data1) {
    // Remove the old svg
    d3.select('#pie-container')
      .select('svg')
      .remove();

    // Create new svg
    const svg = d3
      .select('#pie-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = svg
      .selectAll()
      .data(pieGenerator(data))
      .enter();

    // Append arcs
    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (_, i) => colorScale(i))
      .style('stroke', '#ffffff')
      .style('stroke-width', 0);

    // Append text labels
    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data1.label)
      .style('fill', (_, i) => colorScale(data1.length - i))
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(data1);
        return `translate(${x}, ${y})`;
      });
  };

}

  render(){
    return <div className="chart-container">
      <div className="container-item" id="bar-chart"></div>
      <div className="container-item" id="pie-container"></div>
      <div className="container-item" id="three-chart"></div>
      <div className="container-item" id="four-chart"></div>
      <div className="container-item" id="five-chart"></div>
    </div>
  }

export default Charts;

