import * as d3 from 'd3'

let marge = {top:60,bottom:60,left:60,right:60}

const width = 960
const height = 600

// 创建图表空间
const svg = d3.select('svg').style('width', width).style('height', height)
let g = svg.append("g")
    .attr("transform","translate("+marge.top+","+marge.left+")");

//准备数据
let nodes = [//节点集
    {name:"湖南邵阳"},
    {name:"山东莱州"},
    {name:"广东阳江"},
    {name:"山东枣庄"},
    {name:"泽"},
    {name:"恒"},
    {name:"鑫"},
    {name:"明山"},
    {name:"班长"}
];

let edges = [//边集
    {source:0,target:4,relation:"籍贯",value:1.3},
    {source:4,target:5,relation:"舍友",value:1},
    {source:4,target:6,relation:"舍友",value:1},
    {source:4,target:7,relation:"舍友",value:1},
    {source:1,target:6,relation:"籍贯",value:2},
    {source:2,target:5,relation:"籍贯",value:0.9},
    {source:3,target:7,relation:"籍贯",value:1},
    {source:5,target:6,relation:"同学",value:1.6},
    {source:6,target:7,relation:"朋友",value:0.7},
    {source:6,target:8,relation:"职责",value:2}
];

// 创建颜色比例尺
const colorScale = d3.scaleOrdinal().domain(d3.range(nodes.length)).range(d3.schemeCategory10)

// 创建力导向图
const forceSimulation = d3.forceSimulation().force('link', d3.forceLink()).force('charge', d3.forceManyBody()).force('center', d3.forceCenter())

// 生成节点数据：自动为nodes中对象添加
// index - 节点在 nodes 数组中的索引
// x - 节点当前的 x-坐标
// y - 节点当前的 y-坐标
// vx - 节点当前的 x-方向速度
// vy - 节点当前的 y-方向速度
// 同时力作用会触发tick事件
forceSimulation.nodes(nodes).on("tick",ticked)

// 生成边数据：自动将非引用类型的source和target转换为引用类型，并为其添加
// index - 节点在 nodes 数组中的索引
// x - 节点当前的 x-坐标
// y - 节点当前的 y-坐标
// vx - 节点当前的 x-方向速度
// vy - 节点当前的 y-方向速度
forceSimulation.force('link').links(edges).distance(function (d) {
    return d.value * 100
})

// 设置图中心点
forceSimulation.force('center').x(width/2).y(height/2)

// 边
let links = g.selectAll('.line').data(edges).enter().append('line').attr('stroke', function (d, i) {
    return colorScale(i)
}).attr('stroke-width', 1)

// 边文字
let linksText = g.append("g")
    .selectAll("text")
    .data(edges)
    .enter()
    .append("text")
    .text(function(d){
        return d.relation;
    })

let gs = g.selectAll('.box').data(nodes).enter().append('g').call(d3.drag()
    .on("start",started)
    .on("drag",dragged)
    .on("end",ended))

//绘制节点
gs.append("circle")
    .attr("r",10)
    .attr("fill",function(d,i){
        return colorScale(i);
    })
//文字
gs.append("text")
    .attr("x",-10)
    .attr("y",-20)
    .attr("dy",10)
    .text(function(d){
        return d.name;
    })

function ticked(){
    links.attr("x1",function(d){return d.source.x;})
        .attr("y1",function(d){return d.source.y;})
        .attr("x2",function(d){return d.target.x;})
        .attr("y2",function(d){return d.target.y;});

    linksText.attr("x",function(d){
        return (d.source.x+d.target.x)/2;
    })
        .attr("y",function(d){
            return (d.source.y+d.target.y)/2;
        });

    gs.attr("transform",function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}

/**
 * 此处subject为拖拽主体，即node本身
 * 这里的fx指节点固定的位置，当设置了这个值时，该点不受力的影响，即不会有回弹效果，最终tick完成之后，x依旧会被赋值为fx
 * 取消点固定将fx和fy置空即可
 *
 * 设置x拖拽时，会产生抖动，但是也可以实现拖拽
 * */
function started(d){
    if(!d.active){
        forceSimulation.alphaTarget(0.8).restart();
    }
    // d.subject.x = d.x;
    // d.subject.y = d.y;
}
function dragged(d){
    d.subject.fx = d.x;
    d.subject.fy = d.y;
    // d.subject.x = d.x;
    // d.subject.y = d.y;
}
function ended(d){
    // 拖拽事件结束之后，状态依然为0
    if(!d.active){
        forceSimulation.alphaTarget(0);
    }
    // d.subject.fx = null;
    // d.subject.fy = null;
}
