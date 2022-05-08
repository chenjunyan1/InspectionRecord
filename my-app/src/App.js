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
  
  // 判断在值日楼层5
  floor(num_1, num_2) {
    // num_1 是提交的第几天（次数）
    // num_2 是第几楼层的人名单
    if (Data.name[num_2].indexOf(this.state.name_arr[1][num_1][0][0]) != -1) {
      return 1;
    } else if (Data.name[num_2].indexOf(this.state.name_arr[1][num_1][1][0]) != -1) {
      return 2;
    } else if (Data.name[num_2].indexOf(this.state.name_arr[1][num_1][2][0]) != -1) {
      return 3;
    } else if (Data.name[num_2].indexOf(this.state.name_arr[1][num_1][3][0]) != -1) {
      return 4;
    }
  }

  // 数字转英文
  forEnglish(num) {
    if (num == 1) {
      return "one"
    } else if (num == 2) {
      return "two"
    } else if (num == 3) {
      return "three"
    } else if (num == 4) {
      return "fout"
    }
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
            <div>{Data.name[0]}</div>
            <div>{Data.name[1]}</div>
            <div>{Data.name[2]}</div>
            <div>{Data.name[3]}</div>
          </div>
          {/* 日期及合格 */}
          <div className="page_name">
            <div>提交时间</div>
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
                    {this.floor(index, 0)}F
                  </div>}
                  {/* 一组不合格区域 */}
                  <div>{
                    this.judge(this.state.name_arr[0][index][this.forEnglish(this.floor(index, 0))]) ?
                      this.state.name_arr[0][index][this.forEnglish(this.floor(index, 0))].map((item_hege_1, index_hege_1) => {
                        return (
                          <div key={index_hege_1}>
                            {item_hege_1 ? "不合格，应 : " + Data["str_" + this.floor(index, 0)][index_hege_1] : null}
                          </div>
                        )
                      }) : (<div>合格</div>)
                  }</div>
                  {/* 一组今日值日楼层 */}
                  <div>
                    {this.floor(index, 1)}F
                  </div>
                  {/* 二组不合格区域 */}
                  <div>{
                    this.judge(this.state.name_arr[0][index][this.forEnglish(this.floor(index, 1))]) ?
                      this.state.name_arr[0][index][this.forEnglish(this.floor(index, 1))].map((item_hege_1, index_hege_1) => {
                        return (
                          <div key={index_hege_1}>
                            {item_hege_1 ? "不合格，应 : " + Data["str_" + this.floor(index, 1)][index_hege_1] : null}
                          </div>
                        )
                      })
                      : (<div>合格</div>)
                  }</div>
                  {/* 三组今日值日楼层 */}
                  <div>
                    {this.floor(index, 2)}F
                  </div>
                  {/* 三组不合格区域 */}
                  <div>{
                    this.judge(this.state.name_arr[0][index][this.forEnglish(this.floor(index, 2))]) ?
                      this.state.name_arr[0][index][this.forEnglish(this.floor(index, 2))].map((item_hege_1, index_hege_1) => {
                        return (
                          <div key={index_hege_1}>
                            {item_hege_1 ? "不合格，应 : " + Data["str_" + this.floor(index, 2)][index_hege_1] : null}
                          </div>
                        )
                      })
                      : (<div>合格</div>)
                  }</div>
                  {/* 四组今日值日楼层 */}
                  <div>
                    {this.floor(index, 3)}F
                  </div>
                  {/* 四组楼不合格区域 */}
                  <div>{
                    this.judge(this.state.name_arr[0][index][this.forEnglish(this.floor(index, 3))]) ?
                      this.state.name_arr[0][index][this.forEnglish(this.floor(index, 3))].map((item_hege_1, index_hege_1) => {
                        return (
                          <div key={index_hege_1}>
                            {item_hege_1 ? "不合格，应 : " + Data["str_" + this.floor(index, 3)][index_hege_1] : null}
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
