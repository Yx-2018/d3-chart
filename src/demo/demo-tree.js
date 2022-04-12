import * as d3 from 'd3'

let marge = {top:60,bottom:60,left:60,right:60}

const width = 960
const height = 600

// 创建图表空间
const svg = d3.select('svg').style('width', width).style('height', height)
let g = svg.append("g")
    .attr("transform","translate("+marge.top+","+marge.left+")");

let data = {
    name:"中国",
    children:[
        {
            name:"浙江",
            children:[
                {name:"杭州" ,value:100},
                {name:"宁波",value:100},
                {name:"温州",value:100},
                {name:"绍兴",value:100}
            ]
        },
        {
            name:"广西",
            children:[
                {
                    name:"桂林",
                    children:[
                        {name:"秀峰区",value:100},
                        {name:"叠彩区",value:100},
                        {name:"象山区",value:100},
                        {name:"七星区",value:100}
                    ]
                },
                {name:"南宁",value:100},
                {name:"柳州",value:100},
                {name:"防城港",value:100}
            ]
        },
        {
            name:"黑龙江",
            children:[
                {name:"哈尔滨",value:100},
                {name:"齐齐哈尔",value:100},
                {name:"牡丹江",value:100},
                {name:"大庆",value:100}
            ]
        },
        {
            name:"新疆" ,
            children:
                [
                    {name:"乌鲁木齐"},
                    {name:"克拉玛依"},
                    {name:"吐鲁番"},
                    {name:"哈密"}
                ]
        }
    ]
};

/**
 * 创建层级布局，用来生成节点和边的数据，处理后数据包含以下属性
 *
 * node.data - 关联的数据，由 constructor 指定.
 * node.depth - 当前节点的深度（即当前节点层级）, 根节点为 0.
 * node.height - 当前节点的高度, 叶节点为 0.
 * node.parent - 当前节点的父节点, 根节点为 null.
 * node.children - 当前节点的孩子节点(如果有的话); 叶节点为 undefined.
 * node.value - 当前节点以及 descendants(后代节点) 的总计值; 可以通过 node.sum 和 node.count 计算.
 */
const hierarchy = d3.hierarchy(data).sum(function (d) {
    return d.value
})

// 创建树状图
const tree = d3.tree().size([width - marge.left - marge.right,600]).separation(function (a, b) {
    return a.parent === b.parent ? 1:2
})

const treeData = tree(hierarchy)

// 获取节点和边，也可用hierarchy获取
const nodes = treeData.descendants();
const links = treeData.links();

// 创建贝塞尔曲线
const link = d3.linkHorizontal()
    .x(function(d) { return d.y; })
    .y(function(d) { return d.x; });

// 画边
// 直线方式
// g.append('g').selectAll('.line').data(links).enter().append('line').attr('x1', function (d) {
//     return d.source.x
// }).attr('y1', function (d) {
//     return d.source.y
// }).attr('x2', function (d) {
//     return d.target.x
// }).attr('y2', function (d) {
//     return d.target.y
// }).attr('stroke', '#777').attr('stroke-width', 1)

// 贝塞尔曲线方式
g.append('g').selectAll('.line').data(links).enter().append('path').attr('d', function (d) {
    return link({source: d.source, target: d.target})
}).attr('fill', 'none').attr('stroke', '#777').attr('stroke-width', 1)

// 画点 坐标反转一下，不然是垂直树
let gs = g.selectAll('.node').data(nodes).enter().append('g').attr('transform', function (d) {
    return `translate(${d.y}, ${d.x})`
});
gs.append('circle').attr('r', 15).attr('fill', '#00b3ff')

gs.append('text').attr('font-size', 12).attr('x', function () {
    return -12
}).attr('y', function () {
    return 4
}).text(function (d) {
    return d.data.name
})

// 动态设置高度，防止生成图太长被截断
svg.style('height', g.node().getBoundingClientRect().height + marge.top + marge.bottom)
