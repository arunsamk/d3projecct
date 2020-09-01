const svg = d3.select('.canvas')
    .append('svg')
        .attr('width', 600)
        .attr('height', 600);

// create margin and dimensions

const margin = {top: 20, right: 20, bottom: 100, left: 100};
const graphWidth = 600 - margin.right - margin.left;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left},${margin.top})`);

const xAxisGroup = graph.append('g')
    .attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');

        db.collection('dishes').get().then(res => {

            var data =[];
            res.docs.forEach(doc => {
                data.push(doc.data());
                // console.log(doc.data());
            });
            console.log('In data Array >> ', data);
            // console.log(res);
    
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.orders)])
                .range([graphHeight, 0]);

            const x = d3.scaleBand()
                .domain(data.map(item => item.name))
                .range([0, 500])
                .paddingInner(0.3)
                .paddingOuter(0.3);
            
            const rects = graph.selectAll('rect')
                .data(data);
            
            rects.attr('width', x.bandwidth)
                .attr('height', d => graphHeight - y(d.orders))
                .attr('fill', 'orange')
                .attr('x', d => x(d.name))
                .attr('y', d => y(d.orders));
            
            // append the enter selection to DOM
            rects.enter()
                .append('rect')
                .attr('width', x.bandwidth)
                .attr('height', d => graphHeight - y(d.orders))
                .attr('fill', 'orange')
                .attr('x', d => x(d.name))
                .attr('y', d => y(d.orders));            

            // create and call the axes
            const xAxis = d3.axisBottom(x);
            const yAxis = d3.axisLeft(y);

            xAxisGroup.call(xAxis);
            yAxisGroup.call(yAxis);
        });