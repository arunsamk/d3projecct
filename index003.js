// select the svg container
const svg = d3.select('svg');

d3.json('menu.json').then(data => {
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.orders)])
        .range([0, 500]);
    
    // Finding the minimum value in the json 
    // const min = d3.min(data, d => d.orders);
    // const max = d3.max(data, d => d.orders);
    // const extent = d3.extent(data, d => d.orders);
    // console.log('Value of min >> ', min);
    // console.log('Value of max >> ', max);
    // console.log('Value of extent >> ', extent);

    
    const x = d3.scaleBand()
        .domain(data.map(item => item.name))
        .range([0, 500])
        .paddingInner(0.3)
        .paddingOuter(0.3);
    // console.log(x("veg curry"));
    // console.log(x("veg soup"));
    // console.log(x("veg pasta"));
    // console.log(x("veg surprise"));
    // console.log(x.bandwidth());
    // console.log(data.map(item => item.name));
    // console.log('value of x', x);
    // join the data to the rects
    const rects = svg.selectAll('rect')
        .data(data);
    
    rects.attr('width', x.bandwidth)
        .attr('height', d => y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name));
    
    // append the enter selection to DOM
    rects.enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', d => y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name));            
});
