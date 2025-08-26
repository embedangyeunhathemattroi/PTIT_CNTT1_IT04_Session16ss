
import React, { Component } from 'react'
type State={
  subjects:string[]
}

export default class Ex1Subject extends Component<{},State> {
  constructor (props:{}){
    super(props)
    this.state={
      subjects:["toan","van","anh"]
    }
  }
  render() {
    return (
      <div>Ex1Subject
        <ul >
          {this.state.subjects.map((subject,index)=><li key={index}>{subject}</li>)}
          <li></li>
        </ul>
      </div>
    )
  }
}
