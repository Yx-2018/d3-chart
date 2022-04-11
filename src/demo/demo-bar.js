import * as d3 from 'd3'

const margin = {top: 60, right: 60, bottom: 60, left: 60}
const data = [10,20,30,23,13,40,27,35,20]

const width = 960
const height = 600

const rectPadding = 20

// 创建比例尺
const XScale = d3.scaleBand().domain(d3.range(data.length)).rangeRound([0, width - margin.left - margin.right])
const XAxis = d3.axisBottom(XScale)

const YScale = d3.scaleLinear().domain([ 0, d3.max(data) ]).range([height - margin.top - margin.bottom,0])
const YAxis = d3.axisLeft(YScale)

// 创建图表空间
const svg = d3.select('svg').style('width', width).style('height', height)
const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)
const gs = g.selectAll('.rect').data(data).enter().append('g').attr('class', 'rect')
gs.append('rect').attr('x', function (d, i) {
    return XScale(i) + rectPadding/2
}).attr('y', function (d) {
    return YScale(0)
}).attr('width', function () {
    return XScale.step() - rectPadding
}).attr('height', function (d) {
    return 0
}).attr('fill', '#00bcff').transition().duration(500).delay(function (d, i) {
    return 100
}).ease(d3.easeSinInOut).attr('y', function (d) {
    return YScale(d)
}).attr('height', function (d) {
    return height - margin.top - margin.bottom - YScale(d)
})

gs.append('text').attr('x', function (d, i) {
    return XScale(i) + rectPadding/2
}).attr('y', function (d) {
    return YScale(d)
}).attr('dx', function () {
    return (XScale.step() - rectPadding)/2
}).attr('dy', 0).text(function (d) {
    return d
})

g.append('g').attr('transform', `translate(0 ,${height - margin.top - margin.bottom})`).call(XAxis)
g.append('g').call(YAxis)

d3.selectAll('.rect').on('click', function (e) {
    d3.select(this).select('rect').attr("fill", "red");
})
