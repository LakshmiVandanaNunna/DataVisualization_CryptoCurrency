import React from 'react';
import {scaleBand, scaleLinear, max, schemeCategory10} from 'd3';
import * as d3 from "d3";

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 50, left: 200 };

const BarChart = (props) => {
    let barChartData = props.barChartData
    if (!barChartData) {
        return <pre>Loading...</pre>;
    }

    const innerHeight = height - margin.top - margin.bottom - 100;
    const innerWidth = width - margin.left - margin.right;

    const yScale = scaleBand()
        .domain(barChartData.map(data => data.name))
        .range([0, innerHeight]);

    const xScale = scaleLinear()
        .domain([0, max(barChartData, data => data.value)])
        .range([0, innerWidth]);

    var labelsData = barChartData.map(data => data.name);
    var myColor = d3.scaleOrdinal().domain(labelsData).range(schemeCategory10);

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                {xScale.ticks().map(tickValue => (
                    <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
                        <line y2={innerHeight} stroke="blue" />
                        <text
                            style={{ textAnchor: 'middle' }}
                            dy=".70em"
                            y={innerHeight + 3}
                        >
                            {tickValue}
                        </text>
                    </g>
                ))}
                {yScale.domain().map(tickValue => (
                    <text
                        key={tickValue}
                        style={{ textAnchor: 'end' }}
                        x={-3}
                        dy=".32em"
                        y={yScale(tickValue) + yScale.bandwidth() / 2}
                    >
                        {tickValue}
                    </text>
                ))}
                {barChartData.map((data) => (
                    <rect
                        key={data.name}
                        x={0}
                        y={yScale(data.name)}
                        width={xScale(data.value)}
                        height={yScale.bandwidth()}
                        fill={myColor(data.name)}
                        stroke="#006600"
                    />
                ))}
            </g>
        </svg>
    );
};

export default BarChart;
