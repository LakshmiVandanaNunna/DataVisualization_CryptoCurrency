import React from 'react';
import * as d3 from 'd3';
import {getCoinList} from '../utils/api';
import './ChartStyles.css';
import {CoinSummary} from "../interfaces/CoinSummary";
import BarChart from "./BarChart";
import {arc, axisLeft, extent, pie, scaleLinear, scaleOrdinal, schemeCategory10} from "d3";
import { scatterPlot } from './scatterPlot';

interface Data {
  name: string,
  current_price: number,
  symbol: string
}

class Charts extends React.Component<{}, {selectedOption: string, bubbleChartData: any}> {

  static defaultProps = {
    selectedOption: ''
  };

  constructor(props: any) {
    super(props);

    let barChartData = props.coins.map((coin: any) => {
      return {
        name: coin.name,
        value: coin.current_price
      }
    });
    this.state = {
      selectedOption: 'Current',
      barChartData: barChartData
    }
  }

  fetchCoinPage = async () => {
    try {
      const coinPage = await getCoinList(1);
      // @ts-ignore
      this.setState({coinPage: coinPage})
      let chartData =  this.filterBySelection(coinPage, this.state.selectedOption);

      this.drawPieChart(chartData);
      this.drawBubbleChart(coinPage);
      this.scatterPlotChart(coinPage);

      this.setState({barChartData: chartData})
    } finally {
      console.log();
    }
  };

  filterBySelection(data: CoinSummary[], label: any) {
    if (label === 'Current') {
      label = 'current_price'
    }
    if (label === 'Max') {
      label = 'high_24h'
    }
    if (label === 'Min') {
      label = 'low_24h'
    }
    let mappedData = data.map((coin: any) => {
      return {
        name: coin.name,
        value: coin[label]
      }
    });
    return mappedData;
  }

  componentDidMount() {
    this.fetchCoinPage();
  }

  scatterPlotChart(coinPage) {
    d3.select('#scatter-plot-chart')
        .select('svg')
        .remove();

    const width = 960;
    const height = 500

    const svg = d3.select('#scatter-plot-chart')
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("color", 'black');

    const xValue = (d) => d.current_price;
    const yValue = (d) => d.high_24h;
    const rxValue = (d) => d.low_24h;
    const ryValue = (d) => d.current_price;
    const nameValue = (d) => d.name;
    const colorValue = d => d.name;
    const colorLabel = 'Crypto Currency';


    const load = () => {
        const data = coinPage.map(coin => {
            return {
                current_price: coin.current_price,
                high_24h: coin.high_24h,
                low_24h: coin.low_24h,
                name: coin.name
            }
        })

      const x = xValue((d) => d.high_24h);
      const y = yValue((d) => d.low_24h);

      const marker = (d) => {
        switch(d){
          case 'Tether':
            return 'orange';
          case 'USD Coin':
            return 'blue';
          case 'XRP':
            return 'green';
          case 'Cardano':
            return 'red';
          case 'Dogecoin':
            return 'violet';
          case 'TerraUSD':
            return 'brown';
          case 'Binance USD':
            return 'pink';
          case 'Shiba Inu':
            return 'grey';
          case 'Cronos':
            return 'yellow';
          case 'Dai':
            return 'light blue';
          case 'Polygon':
            return 'dark pink';
          default:
            return 'black';
        }
      }

      const marks = data.map((d) => ({
        x: xValue((d) => d.low_24h),
        y: yValue((d) => d.high_24h),
        name: nameValue(d),
        color: marker(nameValue(d)),
        rx: rxValue(d),
        ry: ryValue(d),

      }));

      const plot = scatterPlot()
          .width(width)
          .height(height)
          .data(data)
          .xValue((d) => d.low_24h)
          .yValue((d) => d.high_24h)
          .margin({
            top: 35,
            right: 50,
            bottom: 80,
            left: 95,

          })
          .radius(5);

      const g = svg.append('g')
          .attr('transform', `translate(${100},${100})`);

      const colorLegendG = g.append('g')
          .attr('transform', `translate(${100}, 150)`);

      //Defining the shape and structure of data points
      svg
          .selectAll('circle')
          .data(marks)
          .join('circle')
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y)
          .attr('fill', (d) => d.color)
          .attr('rx', (d) => (d.rx))
          .attr('ry', (d) => (d.ry));

      const columns = [
        'high_24h',
        'current_price',
        'current_price',
        'low_24h',
      ];

      let i = 0;
      setInterval(() => {
        // console.log((d) => d[columns[i % columns.length]]);
        plot.xValue((d) => d[columns[i % columns.length]]);  /* Generates  'high_24h',
    'current_price',
    'current_price',
    'low_24h'*/
        svg.call(plot);

        colorLegendG.append('text')
            .attr('class', 'legend-label')
            .attr('x', -70)
            .attr('y', -210)
            .style("font-style","italic")
            .style("stroke","black")
            .text(colorLabel);

        // Title
        svg.append("text").attr("x", 450).attr("y", 20).text("Crypto Scatterplot").style("font-size", "35px").attr("alignment-baseline","middle")

        // Add labels in the legend
        svg.append("text").attr("x", 150).attr("y", 70).text("Tether").style("font-size", "20px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 150).attr("y", 90).text("USD Coin").style("font-size", "20px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 150).attr("y", 110).text("XRP").style("font-size", "20px").attr("alignment-baseline","middle")

        svg.append("text").attr("x", 150).attr("y", 130).text("Cardano").style("font-size", "20px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 150).attr("y", 150).text("Dogecoin").style("font-size", "20px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 150).attr("y", 170).text("TerraUSD").style("font-size", "20px").attr("alignment-baseline","middle")

        svg.append("text").attr("x", 150).attr("y", 190).text("Binance USD").style("font-size", "20px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 150).attr("y", 210).text("Shiba Inu").style("font-size", "20px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 150).attr("y", 230).text("Cronos").style("font-size", "20px").attr("alignment-baseline","middle")

        svg.append("text").attr("x", 150).attr("y", 250).text("Dai").style("font-size", "20px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 150).attr("y", 270).text("Polygon").style("font-size", "20px").attr("alignment-baseline","middle")

        svg
            .append("text")
            .attr('transform', 'rotate(-90)')
            .attr('x',0 - (height /2))
            .attr("y",  height/12)
            .style("text-anchor", "middle")
            .style("font-style","italic")
            .style("font-weight","bold")
            .text("Crypto 24 High Label");

        // Add points for legend
        svg.append("circle").attr("cx",130).attr("cy",70).attr("r", 6).style("fill", "orange")
        svg.append("circle").attr("cx",130).attr("cy",90).attr("r", 6).style("fill", "blue")
        svg.append("circle").attr("cx",130).attr("cy",110).attr("r", 6).style("fill", "green")

        svg.append("circle").attr("cx",130).attr("cy",130).attr("r", 6).style("fill", "red")
        svg.append("circle").attr("cx",130).attr("cy",150).attr("r", 6).style("fill", "violet")
        svg.append("circle").attr("cx",130).attr("cy",170).attr("r", 6).style("fill", "brown")

        svg.append("circle").attr("cx",130).attr("cy",190).attr("r", 6).style("fill", "pink")
        svg.append("circle").attr("cx",130).attr("cy",210).attr("r", 6).style("fill", "grey")
        svg.append("circle").attr("cx",130).attr("cy",230).attr("r", 6).style("fill", "yellow")
        svg.append("circle").attr("cx",130).attr("cy",250).attr("r", 6).style("fill", "light blue")
        svg.append("circle").attr("cx",130).attr("cy",270).attr("r", 6).style("fill", "dark pink")

        svg.select('#text-label-replace')
            .remove();

        // plot high_24h on x-axis
        if(i % columns.length==0)
          svg
              .append("text")
              .attr("id",  "text-label-replace")
              .attr("x", width / 2 )
              .attr("y",  480 )
              .style("text-anchor", "middle")
              .style("font-style","italic")
              .style("font-weight","bold")
              .text("Crypto 24 High Label");
        // plot current_price on x-axis
        else if(i % columns.length==1)
          svg
              .append("text")
              .attr("id",  "text-label-replace")
              .attr("x", width / 2 )
              .attr("y",  480 )
              .style("text-anchor", "middle")
              .style("font-style","italic")
              .style("font-weight","bold")
              .text("Crypto Current Price Label");
        // plot current_price on x-axis
        else if(i % columns.length==2)
          svg
              .append("text")
              .attr("id",  "text-label-replace")
              .attr("x", width / 2 )
              .attr("y",  480 )
              .style("text-anchor", "middle")
              .style("font-style","italic")
              .style("font-weight","bold")
              .text("Crypto Current Price Label");
        // plot low_24h on x-axis
        else
          svg
              .append("text")
              .attr("id",  "text-label-replace")
              .attr("x", width / 2 )
              .attr("y",  480 )
              .style("text-anchor", "middle")
              .style("font-style","italic")
              .style("font-weight","bold")
              .text("Crypto 24 Low Label");
        i++;
      }, 2000);// every 3 seconds change the visualization
    };
    load();

  }

  drawPieChart(chartData) {

    d3.select('#pie-chart')
        .select('svg')
        .remove();

    const width = 960;
    const height = 500

    const svg = d3.select('#pie-chart')
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    //Define pie chart structure
    const render = data => {
      const pieData = pie().sort(null).value(d=>d.value)(data);
      const colors = scaleOrdinal(schemeCategory10);
      const segments = arc()
          .innerRadius(0)
          .outerRadius(200)
          .padAngle(0)
          .padRadius(0);

      const sections = svg.append("g")
          .attr("transform", `translate(250,250)`)
          .selectAll("path").data(pieData);
      sections.enter().append("path").attr("d", segments)
          .attr("fill", d => colors(d.data.value))
          .on("mouseover", d => console.log(d.data.value));

      const legends = svg.append("g")
          .attr("transform", "translate(500,100)")
          .selectAll(".legends").data(pieData);
      const legend = legends.enter().append("g").classed(".legends",true)
          .attr("transform", (d,i)=>{
            return `translate(0,${(i+1)*30})`;
          });

      //Define legend
      legend.append("rect").attr("width",20).attr("height",20)
          .attr("fill", d => colors(d.data.value));
      legend.append("text")
          .attr("x", 25)
          .attr("y", 15)
          .attr("class","legend_text")
          .text(d => d.data.name);
      legend.append("text")
          .attr("x", 250)
          .attr("y", 15)
          .attr("class","legend_value")
          .text(d=>d.data.value);
    }
    render(chartData);
  };

  drawBubbleChart(data) {

    d3.select('#bubble-chart')
        .select('svg')
        .remove();

      var canvasWidth = 1000
      var canvasHeight = 800
      var margin = 250

      const svg = d3.select('#bubble-chart')
          .append("svg")
          .attr("width", canvasWidth)
          .attr("height", canvasHeight)
          .style("color", 'black');

      var width = canvasWidth-margin;
      var height = canvasHeight-margin;

      //title of the chart
      svg.append("text")
          .attr("x",345)
          .attr("y",70)
          .attr("font-size","18px")
          .text("Crypto Currency Bubble Chart")

      //y axis label
      svg.append("text")
          .attr("x",-440)
          .attr("y",60)
          .attr("font-size","14px")
          .attr("transform","rotate(-90)")
          .text("Crypt Currency High Label")

      //x axis label
      svg.append("text")
          .attr("x",405)
          .attr("y",690)
          .attr("font-size","14px")
          .text("Crypt Currency Low Label")

      //using scale linear
      var xScale = d3.scaleLinear().range([0,width])
      var yScale = d3.scaleLinear().range([height,0])
      var labelsData = data.map(item => item.name);

    var myColor = d3.scaleOrdinal().domain(labelsData).range(schemeCategory10)
      var container_g = svg.append("g")
          .attr("transform" , "translate("+100 + "," + +100+ ")");
      xScale.domain([0, d3.max(data,function (d) {
          return +d.low_24h;
      })])
      yScale.domain([0,d3.max(data,function(d){
          return +d.high_24h;

      })])

      //legends for size and color
      svg.append("text")
          .attr("x",890)
          .attr("y",50)
          .attr("font-size",".9rem")
          .attr("font-weight","400")
          .text("Legend: ")

      svg.append("text")
          .attr("x",890)
          .attr("y",70)
          .attr("font-size",".9rem")
          .attr("font-weight","400")
          .text(d3.min(data,function (d){
              return +d.current_price;
          }))

      svg.append("circle")
          .attr("cx",890)
          .attr("cy",65)
          .attr("stroke","black")
          .attr("r",d3.min(data,function(d){
              return +d.current_price * 10;
          }))
          .attr("fill","none")

      svg.append("text")
          .attr("x",910)
          .attr("y",100)
          .attr("font-size",".9rem")
          .attr("font-weight","400")
          .text(d3.max(data,function (d){
              return +d.current_price;
          }))
      svg.append("circle")
          .attr("cx",890)
          .attr("cy",95)
          .attr("stroke","black")
          .attr("r",d3.max(data,function(d){
              return +d.current_price * 10;
          }))
          .attr("fill","none")

    let increment1 =0, increment2=0;
    for (let i=0; i < data.length; i++) {
      svg.append("circle")
          .attr("cx",890)
          .attr("cy",130+increment1)
          .attr("r",8)
          .attr("fill",myColor(data[i].name))

      svg.append("text")
          .attr("x",910)
          .attr("y",133+increment1+increment2)
          .attr("font-size",".9rem")
          .attr("font-weight","400")
          .text(data[i].name)
      increment1 += 20;
      increment1 += 3;
    }

      //using dots
      container_g.selectAll(".dot")
          .data(data)
          .enter()
          .append("circle")
          .attr("class","dot")
          .attr("cx",function (d){
              return xScale(+d.low_24h)
          })
          .attr("cy",function (d){
              return yScale(+d.high_24h)
          })

          //radius according to the charges
          .attr("r",function (d){
              return +d.current_price * 10
          })

          //color depending on male and female.
          .style("fill",function (d){
              return myColor(d.name)
          })
          // .style("fill-opacity","1")
          // .style("fill-rule","nonzero")
          // .style("stroke","none")
          .attr("stroke","transparent")
          .attr("fill-opacity","0.7")
          .attr("stroke-width","1")

      //x axis
      container_g.append("g")
          .attr("transform","translate(0,"+height+")")
          .call(d3.axisBottom(xScale))

      //y axis
      container_g.append("g")
          .call(d3.axisLeft(yScale).tickFormat(function (d){
              return d;
          }).ticks(10))
  };

  handleOptionChange = (e) => {
    this.setState({selectedOption: e.target.value});
    this.fetchCoinPage();
  }


  render() {
    return (<div>
      <div className="radio-container">
        <div className="radio-title">Select Price Type: </div>
      <input type="radio" value="Max" name="max" checked={this.state.selectedOption === 'Max'} onChange={this.handleOptionChange} /> Max Price
      <input type="radio" value="Min" checked={this.state.selectedOption === 'Min'} name="min" onChange={this.handleOptionChange} /> Min Price
      <input type="radio" defaultChecked checked={this.state.selectedOption === 'Current'} value="Current" name="current" onChange={this.handleOptionChange} /> Current Price
      </div>
      <div>
      <div className="chart-container-item">
        <BarChart barChartData={this.state.barChartData}/>
      </div>
      <div className="chart-container-item" id="pie-chart"></div>
      <div className="chart-container-item" id="bubble-chart"></div>
      <div className="chart-container-item" id="scatter-plot-chart"></div>
      </div></div>);
  }
}
export default Charts;

