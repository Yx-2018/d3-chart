import * as d3 from 'd3'

const margin = {top: 60, right: 60, bottom: 60, left: 60}
const data = [30 , 10 , 43 , 55 , 13]

const width = 960
const height = 600

// 创建图表空间
const svg = d3.select('svg').style('width', width).style('height', height)
const g = svg.append('g')
    .attr('transform', `translate(${(width - margin.left - margin.right)/2}, ${(height - margin.top - margin.bottom)/2})`)

// 创建颜色比例尺
const colorScale = d3.scaleOrdinal().domain(d3.range(data.length)).range(d3.schemeCategory10)

// 创建饼图
const pie = d3.pie()

// 创建弧生成器
const arc_generator = d3.arc().innerRadius(0).outerRadius(100)

const pieData = pie(data)

const gs = g.selectAll('.item').data(pieData).enter().append('g')
gs.append('path').attr('d', function (d) {
    return arc_generator(d)
}).attr('fill', function (d, i) {
    return colorScale(i)
})

gs.append('text').attr('transform', function (d) {
    return `translate(${arc_generator.centroid(d)})`
}).attr('text-anchor', 'middle').text(function (d) {
    return d.data
})
