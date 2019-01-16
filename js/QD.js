/**
 * Created by Administrator on 2018/4/24.
 */
(function () {
    custom();
    pieChartInit();
    barChartInit();
    mapInit();

    var resizeTimer = null;
    $(window).bind('resize', function (){
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function(){
            custom();
        } , 500);
    });
})();
function custom() {
    var height=$(window).height();
    var width=$(window).width();
    if(width>1200){
        if(height<Math.floor(width*9/16)){
            $('html,body').css({'overflowY':'auto','height':'auto'});
        }else{
            $('html,body').css({'overflowY':'hidden','height':'100%'});
        }
    }
}
function pieChartInit() {
    var chart = null;
    $(function () {
        $('#pie-chart').highcharts({
            chart: {
                backgroundColor:'transparent',
                margin:[0,0,0,0]
            },
            colors:['#41e4f7','#9089e5','#477ad8','#85c9fe'],
            credits:{
              enabled:false
            },
            title: {
                text: '<span style="position: relative;top: -.9rem;">监测<br/>资源</span>',
                y:50,
                useHTML:true,
                style:{
                    "color": "#fff", "fontSize": "1rem","text-shadow": "0 0.1rem 0 #0577f8","line-height":"1.2rem"
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                innerSize: '70%',
                name: '市场份额',
                data: [
                    ['一类站点',45.0],
                    ['二类站点',26.8],
                    ['三类站点',45.0],
                    ['四类站点',26.8]
                ]
            }]
        }, function(c) {
            // 环形图圆心
            var centerY = c.series[0].center[1],
                titleHeight = parseInt(c.title.styles.fontSize);
            c.setTitle({
                y:centerY + titleHeight/2
            });
            chart = c;
        });
    });
}

function barChartInit() {
    var can = document.getElementById('bar-chart');
    var ctx = can.getContext("2d");
    var fontSize= $('html').css('font-size');
    var remVal = fontSize.substr(0,fontSize.length-2);
    $(can).attr('width',$(can).attr('width')*remVal);
    $(can).attr('height',$(can).attr('height')*remVal);
    xArray=[0,10,20,30,40,50];
    for(var n=0;n<6;n++){
        drawLine(ctx,n,xArray[n],remVal);
    }
    var color_bar=[['#6d80cc','#5066af'],['#71c6d3','#4b99a5'],['#e78dad','#cf5f87'],['#85dda0','#6ab581'],['#936dd5','#754cbb'],['#788e95','#55676d']]
    for(var m=1;m<=6;m++){
        drawCylinder(ctx, 7*remVal*m*0.4+8, 50, 2*remVal*0.4, 1.3*remVal*0.4,color_bar[m-1][0],color_bar[m-1][1],remVal);
    }
}
function drawCylinder(context, x, per, a, b, color_1,color_2,remVal)
{
    var step = (a > b) ? 1 / a : 1 / b;
    var footerLine=(36*0.8*remVal-remVal)*0.4;
    var y=footerLine-footerLine*(per)/115;
    context.beginPath();
    context.moveTo(x - a, y);
    for (var i = 0; i < 2 * Math.PI; i += step)
    {
        context.lineTo(x - a * Math.cos(i), y + b * Math.sin(i));
    }
    context.closePath();
    context.fillStyle=color_1;
    context.fill();

    context.beginPath();
    context.moveTo(x + a, y);
    context.lineTo(x + a, footerLine);
    for (var i = 0; i < Math.PI; i += step)
    {
        context.lineTo(x + a * Math.cos(i), footerLine+ b * Math.sin(i));
    }
    context.lineTo(x-a, y);
    for (var i = 0; i < Math.PI; i += step)
    {
        context.lineTo(x - a * Math.cos(i), y + b * Math.sin(i)-2);
    }
    context.fillStyle=color_2;
    context.fill();
}
function drawLine(ctx,num,value,remVal) {
    ctx.fillStyle='#5980ff';
    ctx.strokeStyle='#4672ff';
    ctx.font = remVal+"px 雅黑";
    ctx.fillText(value,remVal*0.4, ((6-num)*6*0.8*remVal-0.4*remVal)*0.4);
    ctx.beginPath();
    ctx.moveTo(1.8*remVal,((6-num)*6*0.8*remVal-0.2*remVal-remVal)*0.4);
    ctx.lineTo(48*remVal*0.4,((6-num)*6*0.8*remVal-0.2*remVal-remVal)*0.4);
    ctx.closePath();
    ctx.stroke();
}
function mapInit() {
    echarts.util.mapData.params.params.QD = {
        getGeoJson: function (callback) {
            $.getJSON('map-data/370200.json', callback);
        }
    };
    var fontSize= $('html').css('font-size');
    var remVal = fontSize.substr(0,fontSize.length-2);
    var labelSize=remVal;
    var borderWidth=remVal/6;
    var myChart = echarts.init(document.getElementById('center-part'));
    var option = {
        color: ['#f4d125','#1aad08'],
        backgroundColor: 'transparent',
        series: [
            {
                name: '管制区域',
                type: 'map',
                data:[],
                geoCoord: {
                    '城阳区': [120.37,36.30],
                    '黄岛区':[120.18,35.97],
                    '即墨市':[120.45,36.38],
                    '胶南市':[120.03,35.87],
                    '胶州市':[120.03,36.27],
                    '莱西市':[120.50,36.87],
                    '奥帆中心':[120.397399,36.06077],
                    '媒体中心':[120.448266,36.076505],
                    '飞机场':[120.022632,36.31902],
                    '火车站':[120.319084,36.070328],
                    '青岛无线电管理委员会':[120.462423,36.092744],
                    '海关总署青岛教育培训基地':[120.426013,36.072646]
                },
                mapType: 'QD', // 自定义扩展图表类型
                itemStyle: {
                    normal: {
                        color:'#004881',
                        areaStyle:{
                            color: '#004881'
                        },
                        borderColor: '#019fd4',
                        borderWidth:borderWidth,
                        label:{
                            show:true,
                            textStyle:{
                                color:'#fff',
                                fontSize:labelSize
                            }
                        }
                    },
                    emphasis: {
                        color:'#004881',
                        areaStyle:{
                            color: '#004881'
                        },
                        borderColor: '#019fd4',
                        borderWidth:borderWidth,
                        label:{
                            show:true,
                            textStyle:{
                                color:'#fff',
                                fontSize:labelSize
                            }
                        }
                    }
                },
                markPoint : {
                    symbol:'emptyCircle',
                    symbolSize : function (v){
                        return (5 + v/10)*remVal/12;
                    },
                    effect : {
                        show: true,
                        shadowBlur : 0
                    },
                    itemStyle:{
                        normal:{
                            label:{show:false}
                        }
                    },
                    data : [
                        {name: '奥帆中心', value: 100},
                        {name: '媒体中心', value: 50},
                        {name: '飞机场', value: 70},
                        {name: '火车站', value: 50}
                    ]
                }
            },
            {
                name: '驻点',
                type: 'map',
                data:[],
                mapType: 'QD', // 自定义扩展图表类型
                itemStyle: {
                    normal: {
                        color:'#004881',
                        areaStyle:{
                            color: '#004881'
                        },
                        borderColor: '#019fd4',
                        borderWidth:2
                    },
                    emphasis: {
                        color:'#004881',
                        areaStyle:{
                            color: '#004881'
                        },
                        borderColor: '#019fd4',
                        borderWidth:2,
                        label:{
                            show:true
                        }
                    }
                },
                markPoint : {
                    symbol:'emptyCircle',
                    symbolSize : function (v){
                        return (10 + v/10)*remVal/12;
                    },
                    effect : {
                        show: true,
                        shadowBlur : 0
                    },
                    itemStyle:{
                        normal:{
                            label:{show:false}
                        }
                    },
                    data : [
                        {name: '青岛无线电管理委员会', value: 80},
                        {name: '海关总署青岛教育培训基地', value: 40}
                    ]
                }
            }
        ]
    };
    myChart.setOption(option);
}