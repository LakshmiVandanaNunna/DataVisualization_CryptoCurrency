import {
    scaleLinear,
    extent,
    axisLeft,
    axisBottom,
} from 'd3';

export const scatterPlot = () => {
    let width;
    let height;
    let data;
    let xValue;
    let yValue;
    let margin;
    let radius;

    const my = (selection) => {
        console.log('yValue')
        console.log(data)
        console.log(yValue)
        const x = scaleLinear()
            .domain(extent(data, xValue))
            // .domain([0, 1])
            .range([margin.left, width - margin.right]);

        const y = scaleLinear()
            .domain(extent(data, yValue))
            .range([height - margin.bottom, margin.top]);

        const marks = data.map((d) => ({
            x: x(xValue(d)),
            y: y(yValue(d)),
        }));

        const circles = selection
            .selectAll('circle')
            .data(marks)
            .join('circle')
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)
            .attr('r', radius);

        selection
            .selectAll('.y-axis')
            .data([null])
            .join('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${margin.left},0)`)
            .call(axisLeft(y));

        selection
            .selectAll('.x-axis')
            .data([null])
            .join('g')
            .attr('class', 'x-axis')
            .attr(
                'transform',
                `translate(0,${height - margin.bottom})`
            )
            .call(axisBottom(x));

        selection
            .selectAll('.x-axis')
            .append('text')
            .attr('class', 'x-axis')
            .attr('x', 100)
            .attr('y', -20)
            .text('TEXT');
    };

    my.width = function (_) {
        return arguments.length ? ((width = +_), my) : width;
    };

    my.height = function (_) {
        return arguments.length ? ((height = +_), my) : height;
    };

    my.data = function (_) {
        return arguments.length ? ((data = _), my) : data;
    };

    my.xValue = function (_) {
        console.log('arguments.length')
        return arguments.length ? ((xValue = _), my) : xValue;
    };

    my.yValue = function (_) {
        return arguments.length ? ((yValue = _), my) : yValue;
    };

    my.margin = function (_) {
        return arguments.length ? ((margin = _), my) : margin;
    };

    my.radius = function (_) {
        return arguments.length ? ((radius = +_), my) : radius;
    };

    return my;
};
