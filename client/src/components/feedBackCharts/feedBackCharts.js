import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tabs,Row,Col,Button} from 'antd';
import ReactHighcharts from 'react-highcharts';
import axios from 'axios';
import './feedBackCharts.css';
import config from '../../config/config';

const HighchartsExporting = require('highcharts-exporting')
HighchartsExporting(ReactHighcharts.Highcharts)

require('highcharts-export-csv')(ReactHighcharts.Highcharts)
const TabPane = Tabs.TabPane;
let tableData=[];
let conf=[];
const config_line={
	chart: {
        type: 'bar'
    },
    title: {
        text: '成绩排名'
    },
    xAxis: {
        categories: [],
        title:{
        	text:'姓名'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '总分'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
            }
        }
    },
    legend: {
        reversed: true
    },
    sum:[],
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
                style: {
                    textOutline: 'none'
                }
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name}: {point.y}'
    },
    series: [{
        name: '教师评分',
        data: []
    }, {
        name: '学生互评',
        data: []
    }, {
        name: '自评',
        data: []
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
}

let config_pie={
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: '分数分布'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: []
    }]
}

class Charts extends React.Component{
	static contextTypes = {
        store: PropTypes.object,
        router:PropTypes.object.isRequired,
    };

    componentWillMount(){
    	let data=this.context.store.getState();
        axios.post(`${config.basicURL}/getConf`)
        .then((response)=>{
            conf.push({size:response.data.size,self:response.data.r1,teacher:response.data.r2,students:response.data.r3});
        })
        this.setState({
            tableData:[]
        })
        tableData.length=0;

    	if(typeof(data.chartsData)==='undefined'){
            var chartsdata=JSON.parse(localStorage.getItem('chartsData'));
        }else{
            var chartsdata=data.chartsData;
        }

        let sum=chartsdata.length;
        let cont_90=0;
        let cont_80=0;
        let cont_70=0;
        let cont_60=0;
        let cont_other=0;
    	chartsdata=chartsdata.sort((a,b)=>{return b.eval_result-a.eval_result});
    	config_line.series[0].data.length=0;
    	config_line.series[1].data.length=0;
    	config_line.series[2].data.length=0;
    	config_line.xAxis.categories.length=0;

        config_pie.series[0].data.length=0;
        let allSum=0;
    	for(var i=0;i<chartsdata.length;i++){
    		let submit=chartsdata[i];
            let TableData={name:submit.name,self:0,teacher:0,students:[],eval_result:submit.eval_result};
    		config_line.xAxis.categories.push(`${submit.name}`);
    		config_line.series[0].data.push(`${submit.tea}`*1);
    		config_line.series[1].data.push(`${submit.student}`*1);
    		config_line.series[2].data.push(`${submit.self}`*1);
    		config_line.sum.push(`${submit.eval_result}`*1);

            if(submit.eval_result>=90)cont_90+=1;
            else if(submit.eval_result>=80)cont_80+=1;
            else if(submit.eval_result>=70)cont_70+=1;
            else if(submit.eval_result>=60)cont_60+=1;
            else cont_other+=1;
            allSum+=submit.eval_result;

            axios.post(`${config.basicURL_T}/getVeryDetail`,{name:submit.name,title:submit.title,id:submit.id})
            .then((response)=>{       
                let temp=response.data;
                TableData.name=temp[0].name;
                for(var i=0;i<temp.length;i++){
                    let eva=temp[i];
                    if(eva.type===0)TableData.self=eva.sum;
                    else if(eva.type===2)TableData.teacher=eva.sum;
                    else{
                        axios.post(`${config.basicURL}/getStudentName`,{id:eva.eval})
                        .then((response)=>{
                            TableData.students.push({name:response.data.name,sum:eva.sum});
                        })
                        .then(()=>{
                            if(TableData.students.length===3){
                                tableData.push(TableData);
                                if(tableData.length===chartsdata.length){
                                    this.setState({
                                        tableData:tableData.sort((a,b)=>{return b.eval_result-a.eval_result}),
                                        sum:allSum
                                    })
                                }
                            }
                        })
                    }
                }
            })

    		if(i===chartsdata.length-1){
                config_pie.series[0].data.push({name:'90分以上',y:cont_90/sum*100});
                config_pie.series[0].data.push({name:'80~90',y:cont_80/sum*100});
                config_pie.series[0].data.push({name:'70~80',y:cont_70/sum*100});
                config_pie.series[0].data.push({name:'60~70',y:cont_60/sum*100});
                config_pie.series[0].data.push({name:'60以下',y:cont_other/sum*100});

                this.setState({
                    chartsData:chartsdata,
                    tableData:tableData
                })
    		}
    	}
    }

    onReturn=()=>{
        this.context.router.history.push('/teacher/feedBack');
    }

    returnScore = () =>{
        if(this.state.sum !== undefined){
            return(
                <div>
                <p>提交人数：{this.state.tableData.length}</p>
                <p>平均分：{(this.state.sum/this.state.tableData.length).toFixed(1)}</p>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }

	render(){
		return(
            <div className='g-main'>
			<div className='m-tabs'>
            <Tabs defaultActiveKey="1" tabBarExtraContent={<Button type='primary' onClick={this.onReturn}>返回</Button>}>
                <TabPane tab="图表" key="1" className='tabPane'>
                <div className='u-charts'>
                <ReactHighcharts config={config_line} className='charts'></ReactHighcharts>
                </div>
                <div className='u-charts'>
                <ReactHighcharts config={config_pie} className='charts'></ReactHighcharts>
                </div>
                </TabPane>
                <TabPane tab="列表" key="2" className='tabPane'>
                 <Row type="flex" justify="space-between" className='u-task-row'>
                    <Col span={2}>姓名</Col>
                    <Col span={4}>自评({conf.length>0?conf[0].self:0})</Col>
                    <Col span={4}>教师评分({conf.length>0?conf[0].teacher:0})</Col>
                    <Col span={4}>互评(size:{conf.length>0?conf[0].size:0},{conf.length>0?conf[0].students:0})</Col>
                    <Col span={2}>总分</Col>
                    <Col span={2}>排名</Col>
                </Row>
                {this.state.tableData.map((item,i)=>{
                    return(
                        <Row type="flex" justify="space-between" className='u-task-row' key={i}>
                            <Col span={2}>{item.name}</Col>
                            <Col span={4}>{item.self}</Col>
                            <Col span={4}>{item.teacher}</Col>
                            <Col span={4}>{item.students.map((stu,j)=>{
                                return(
                                    <div key={j}>{stu.name}:{stu.sum}</div>
                                )
                            })}</Col>
                            <Col span={2}>{item.eval_result}</Col>
                            <Col span={2}>{i+1}</Col>
                        </Row>
                        )
                })}
                </TabPane>
            </Tabs>
            <div className='m-extra-info'>
                {this.returnScore()}
            </div>
			</div>
            </div>
			)
		}
}

const mapStateToProps=(state)=>({
   
})

const mapDispatchToProps=(dispatch)=>{
    return{
        initail(name,type,className){
            var data={name:name,type:type}
            dispatch({type:'REFRESH',data})
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Charts);