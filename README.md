# d3实践
项目采用rollup进行本地服务和热更新启动

安装依赖

`pnpm i`


项目启动

`npm run dev`

## d3常用方法

```
d3.select()：是选择所有指定元素的第一个
d3.selectAll()：是选择指定元素的全部
```

```
text()：为元素设置文本
style()：为元素设置样式
```

```
datum()：绑定一个数据到选择集上
data()：绑定一个数组到选择集上，数组的各项值分别与选择集的各元素绑定
```

```
append()：在选择集尾部插入元素
insert()：在选择集前面插入元素
remove()：删除选中元素
```

```
enter()：当对应的元素不足时 （ 绑定数据数量 > 对应元素 ），通常跟append
exit()：当对应的元素过多时 （ 绑定数据数量 < 对应元素 ），通常跟remove
```

```
attr()：设置元素属性或者获取元素的属性
```

```
比例尺
线性比例尺：d3.scaleLinear() domain域和range域都可以连续变化
var dataset = [1.2, 2.3, 0.9, 1.5, 3.3];
    	var min = d3.min(dataset);//得到最小值
    	var max = d3.max(dataset);//得到最大值
    	var scaleLinear = d3.scaleLinear()
    		.domain([min,max])
    		.range([0,300]);
    		
序数比例尺：d3.scaleOrdinal() domain域和range域是离散的
var index = [0,1,2,3,4];
    	var color = ["red","blue","yellow","black","green"];
    	var scaleOrdinal = d3.scaleOrdinal()
    		.domain(index)
    		.range(color);
    		
等分比例尺：d3.scaleBand()：可以根据输入的domain的长度，等分rangeRound域（类比range域）
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0,width-marge.left-marge.right]);
    
生成等差数列：d3.range(start, stop, step)
    参数：该函数接受三个参数，如下所示：
    start:它是包含整数值，是输出数组的第一个元素。其默认值为0。
    stop:它是不与输出数组相加的互斥整数值。
    step:它是定期与起始值相加并打印结果直到终止值到达的整数值。
d3.range(1, 10, 2);
[1,3,5,7,9]
```

```
坐标轴
//为坐标轴定义一个线性比例尺
var xScale = d3.scaleLinear()
    .domain([0,d3.max(dataset)])
    .range([0,250]);
//定义一个坐标轴
var xAxis = d3.axisBottom(xScale)//定义一个axis，由bottom可知，是朝下的
    .ticks(7);//设置刻度数目
g.append("g")
    .attr("transform","translate("+20+","+(dataset.length*rectHeight)+")")
    .call(xAxis);
```

```
transition()：表示添加过渡，也就是从前一个属性过渡到后一个属性
duration(2000)：表示过渡时间持续2s
delay(500)：表示延迟500ms后再进行过渡
ease(d3.easeElasticInOut)：表示过渡方式
```

`文字要在元素内显示必须调用text(function(value, index) {} | string)， 
这里回调函数最好不要使用箭头函数，此处this指向当前选择元素`

## 示例

```
—— src
   ├—— demo
   │   ├—— demo-bar.js 柱状图示例
   │   ├—— demo-pie.js 饼图示例
   │
   │—— main.js 入口文件
   
将需要查看的示例js拷贝到main.js中运行即可
```


