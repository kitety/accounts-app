import React, { Component } from "react";
import PropTypes from 'prop-types';
import * as RecordsApi from '../utils/RecordsAPI'

export default class Record extends Component {
  constructor() {
    super();
    this.state = {
      edit: false
    }
  }
  handleToggle() {
    this.setState({
      edit: !this.state.edit
    })
  }
  handleEdit(event) {
    event.preventDefault()
    const record = {
      date: this.refs.date.value,
      title: this.refs.title.value,
      amount: this.refs.amount.value - 0
    }
    RecordsApi.update(this.props.record.id, record).then(
      (res) => {
        this.props.handleEditRecord(this.props.record, res.data)
        this.setState({
          edit: false
        })
      }
    ).catch(
      (err) => {
        console.log(err.message);
      }
    )
  }
  handleDelte(event) {
    event.preventDefault()
    RecordsApi.remove(this.props.record.id).then(
      (res) => {
        this.props.handleDeleteRecord(this.props.record)
      }
    ).catch(
      (err) => {
        console.log(err.message);
      }
    )
  }
  recordRow() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{this.props.record.amount}</td>
        <td>
          <button type="button" className="btn btn-default mr-1" onClick={this.handleToggle.bind(this)}>Edit</button>
          <button type="button" className="btn btn-danger" onClick={this.handleDelte.bind(this)}>Delete</button>
        </td>
      </tr>
    )
  }
  recordForm() {
    return (
      <tr>
        <td><input className="form-control" defaultValue={this.props.record.date} ref="date" /></td>
        <td><input className="form-control" defaultValue={this.props.record.title} ref="title" /></td>
        <td><input className="form-control" defaultValue={this.props.record.amount} ref="amount" /></td>
        <td>
          <button type="button" className="btn btn-default mr-1" onClick={this.handleEdit.bind(this)}>Update</button>
          <button type="button" className="btn btn-danger">Cancel</button>
        </td>
      </tr>
    )
  }
  render() {
    if (this.state.edit) {
      return this.recordForm()
    } else {
      return this.recordRow()
    }
  }
}

Record.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number
};
