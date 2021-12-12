import React, { Component } from 'react';
import Data from './data.json';
import './App.css';
const AV = require('leancloud-storage');
const { Query, User } = AV;
AV.init({
  appId: "v6yTYDj8Lvd4tPoqdz4j85qi-gzGzoHsz",
  appKey: "kmVzFkIPu7YkAB6CqHoRQqpX",
  serverURL: "https://v6ytydj8.lc-cn-n1-shared.com"
});


const Todo = AV.Object.extend('Todo');
const query = new AV.Query('Todo');


export default class App extends Component {
  constructor(props) {
    super(props)
    this.name = this.name.bind(this);
    this.state = {
      name_arr: [[], [], []]
    };
  };
  // 获取数据
  name() {
    let floor = [];
    let titleArr = [];
    let time = [];
    // this.setState({
    //   name_arr:"mls"
    // })

    // query.find()
    // .then((response) => {
    //   this.setState({ name_arr: response });
    // });

    query.find().then((message) => {
      let array;
      let array_2;
      array = message.map((item) => item.attributes);
      array_2 = message.map((item_2) => item_2.updatedAt);
      array.map((element, index) => {
        // console.log(array_2[index]);
        time.push(array_2[index]);
        // console.table(JSON.parse(element.title));
        floor.push(JSON.parse(element.title));
        // console.table(JSON.parse(element.TeamMembers));
        titleArr.push(JSON.parse(element.TeamMembers));
        console.log("-----------------------我是分界线----------------------------");
      });
      this.setState({
        name_arr: [floor, titleArr, time]
      })
    });
    // console.log(time)
    return [floor, titleArr, time];
  }

  // 生命周期函数
  componentDidMount() {
    this.name();
  };

  // 加工时间
  checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    };
    return i;
  };


  // 获取时间
  time(today) {
    var y = today.getFullYear();
    var a = today.getMonth() + 1;
    var b = today.getDate();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = this.checkTime(m);
    s = this.checkTime(s);
    return y + "/" + a + "/" + b + " | " + h + ":" + m + ":" + s;
  };
  // 判断合格和不合格
  judge(arr) {
    for (let a = 0; a < arr.length; a++) {
      if (arr[a] == true) {
        return true;
      }
    }
    return false;
  }
  // 判断在值日楼层
  floor(){
    
  }
  render() {

    return (
      <div className="app">
        {console.table(this.state.name_arr[0][0])}
        {console.table(this.state.name_arr[1])}
        {console.table(this.state.name_arr[2])}
        {/* 页面1 */}
        <div>
          {/* 标题 */}
          <div className="page_title">
            <h1>实务学堂卫生检查数据分析</h1>
          </div>
          {/* 小组人员 */}
          <div className="page_name">
            <div>小组人员 : </div>
            <div>一组：葛雨城,尹泽森，周光明，陈紫鹏</div>
            <div>二组：王台归，吴玉笋，李子颖，窦泽钊，吕志浩</div>
            <div>三组：陈艺文，崔永祥，谷文瑞，刘海武，雷涵</div>
            <div>四组：陈俊雁，罗家祥，李小娟，颜学润，张斌</div>
          </div>
          {/* 日期及合格 */}
          <div className="page_name">
            <div>日期</div>
            <div>合格 / 不合格 | 不合格区域</div>
            <div>合格 / 不合格 | 不合格区域</div>
            <div>合格 / 不合格 | 不合格区域</div>
            <div>合格 / 不合格 | 不合格区域</div>
          </div>
          {/* 每日检查报告 */
          }
          {
            this.state.name_arr[2].map((item, index) => {
              return (
                <div key={index + item} className="page_name page_test">
                  {/* 时间 */}
                  <div>
                    {this.time(this.state.name_arr[2][index])}
                  </div>
                  {/* 一组今日值日楼层 */}
                  {<div>
                    1f
                  </div>}
                  {/* 一组不合格区域 */}
                  <div>{
                    this.judge(this.state.name_arr[0][index].one) ?
                      this.state.name_arr[0][index].one.map((item_hege_1, index_hege_1) => {
                        return (
                          <div key={index_hege_1}>
                            {item_hege_1 ? "不合格:" + Data.str_1[index_hege_1] : null}
                          </div>
                        )
                      }) : (<div>合格</div>)
                  }</div>
                  {/* 一组今日值日楼层 */}
                  <div>
                    2f
                  </div>
                  {/* 二组不合格区域 */}
                  <div>{
                    this.judge(this.state.name_arr[0][index].two) ?
                      this.state.name_arr[0][index].two.map((item_hege_1, index_hege_1) => {
                        return (
                          <div key={index_hege_1}>
                            {item_hege_1 ? "不合格:" + Data.str_2[index_hege_1] : null}
                          </div>
                        )
                      })
                      : (<div>合格</div>)
                  }</div>
                  {/* 三组今日值日楼层 */}
                  <div>
                    3f
                  </div>
                  {/* 三组不合格区域 */}
                  <div>{
                    this.judge(this.state.name_arr[0][index].three) ?
                      this.state.name_arr[0][index].three.map((item_hege_1, index_hege_1) => {
                        return (
                          <div key={index_hege_1}>
                            {item_hege_1 ? "不合格:" + Data.str_3[index_hege_1] : null}
                          </div>
                        )
                      })
                      : (<div>合格</div>)
                  }</div>
                  {/* 四组今日值日楼层 */}
                  <div>
                    4f
                  </div>
                  {/* 四组楼不合格区域 */}
                  <div>{
                    this.judge(this.state.name_arr[0][index].fout) ?
                      this.state.name_arr[0][index].fout.map((item_hege_1, index_hege_1) => {
                        return (
                          <div key={index_hege_1}>
                            {item_hege_1 ? "不合格:" + Data.str_4[index_hege_1] : null}
                          </div>
                        )
                      })
                      : (<div>合格</div>)
                  }</div>
                </div>

              )
            })
          }

        </div>


      </div>
    )
  };
};
