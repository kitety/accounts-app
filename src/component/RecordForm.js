import React, { Component } from "react";
import * as RecordsApi from '../utils/RecordsAPI'


export default class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      title: '',
      amount: ''
    }
  }
  valid() {
    return this.state.date && this.state.title && this.state.amount;
  }
  handleChange(event) {
    let name, obj;
    name = event.target.name;
    // (a={},a['a1']=2,a)
    // { a1: 2 }  实质
    this.setState((
      obj = {},
      obj["" + name] = event.target.value,
      obj
    ))
  }
  handleSubmit(event) {
    event.preventDefault();
    let tempData = {
      date: this.state.date,
      title: this.state.title,
      amount: this.state.date - 0,
    }
    RecordsApi.create(tempData).then(
      res => {
        this.setState({
          date: '',
          title: '',
          amount: ''
        })
        this.props.handleNewRecord(res.data)
      }
    ).catch(
      err => console.log(err)
    )
  }
  render() {
    return (
      <form className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group mr-1">
          <input type="text" className="form-control" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group  mr-1">
          <input type="text" className="form-control" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group  mr-1">
          <input type="text" className="form-control" placeholder="Amount" name="amount" value={this.state.amount} onChange={this.handleChange.bind(this)} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
      </form>
    )
  }
}
