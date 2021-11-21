import React, { Component } from 'react'


const AV = require('leancloud-storage');
const { Query, User } = AV;
AV.init({
  appId: "v6yTYDj8Lvd4tPoqdz4j85qi-gzGzoHsz",
  appKey: "kmVzFkIPu7YkAB6CqHoRQqpX",
  serverURL: "https://v6ytydj8.lc-cn-n1-shared.com"
});
const Todo = AV.Object.extend('Todo');
const query = new AV.Query('Todo');

// 构建对象
const todo = new Todo();
let array;
let array_2;
query.find().then((function (message) {
  array = message.map((item) => item.attributes);
  array_2 = message.map((item_2) => item_2.updatedAt);
  array.forEach((element,index) => {
    console.log(array_2[index])
    console.table(JSON.parse(element.title))
    console.table(JSON.parse(element.TeamMembers))
    console.log("-----------------------我是分界线----------------------------")
  });
}))


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {

    return (
      <div>
        {/* {
          array.map((item,index)=>{
            return(
              <div key={index}>
                {item.title}
              </div>
            )
          })
        } */}
      </div>
    )
  }
}
