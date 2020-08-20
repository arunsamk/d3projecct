
const svg = d3.select('svg');

const data = [
    {width: 200, height: 400, fill: 'red'},
    {width: 100, height: 60, fill: 'purple'},
    {width: 50, height: 30, fill: 'pink'}
];

// Join data to rects
const rects = svg.selectAll('rect')
    .data(data);

// add attrs to rects already in DOM
    rects.attr('width', (d, i, n) => d.width)
    .attr('height', d => d.height )
    .attr('fill', d => d.fill );

// append the enter selection to DOM
rects.enter()
    .append('rect')
    .attr('width', (d, i, n) => d.width)
    .attr('height', d => d.height )
    .attr('fill', d => d.fill );
// console.log('rect : ', rect)