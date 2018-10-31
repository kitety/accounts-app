import React, { Component } from "react";
import Record from "./Record";
import RecordForm from "./RecordForm";
import * as RecordsApi from '../utils/RecordsAPI'
import AmountBox from './AmountBox'
// import {getJSON} from "jquery";
class Records extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoad: false,
      records: []
    };
  }
  componentDidMount() {
    // jquery.ajax
    // getJSON(
    //   "https://5babb011ecc1a70014306b48.mockapi.io/api/v1/records"
    // ).then(
    //   res =>
    //     this.setState({
    //       records: res,
    //       isLoaded: true
    //     }),
    //   error =>
    //     this.setState({
    //       isLoaded: true,
    //       error
    //     })
    // );
    // axios
    RecordsApi.getAll().then(
      res => this.setState({
        records: res.data,
        isLoaded: true
      })
    ).catch(error =>
      this.setState({
        isLoaded: true,
        error
      })
    )
  }
  addRecord(record) {
    this.setState({
      error: null,
      isLoad: true,
      records: [
        ...this.state.records,
        record
      ]
    })
  }
  updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record)
    const newRecords = this.state.records.map((item, index) => {
      if (index !== recordIndex) {
        // This isn't the item we care about - keep it as-is
        return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...data
      };
    });
    this.setState({
      records: newRecords
    })
  }
  deleteRecord(record) {
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    const recordIndex = this.state.records.indexOf(record)
    this.setState({
      records: this.state.records.filter((record, index) => index !== recordIndex)
    })
  }
  credit() {
    // 返回的是一个数组
    let credit = this.state.records.filter(record => {
      return record.amount>=0
    })
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    return credit.reduce((pre,cur)=>{
      return pre + (cur.amount-0)
    },0)
  }
  debit() {
    let credit = this.state.records.filter(record => {
      return record.amount < 0
    })
    return credit.reduce((pre, cur) => {
      return pre + (cur.amount - 0)
    }, 0)
  }
  balance() {
    return this.credit() + this.debit()
  }
  render() {
    /*解构复制 */
    const { error, isLoaded, records } = this.state;
    let recordsComponent;

    if (error) {
      recordsComponent = <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      recordsComponent = <div> Loading... </div>;
    } else {
      recordsComponent = (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/*此处遍历,传入的是一个对象.遍历的单个对象*/}
            {records.map(record => (
              <Record
                record={record}
                key={record.id}
                handleEditRecord={this.updateRecord.bind(this)}
                handleDeleteRecord={this.deleteRecord.bind(this)}
              />
            ))}
          </tbody>
        </table>
      );
    }
    return (
      <div>
        <h2>Records</h2>
        <div className="row ">
          <AmountBox text="Credit" type="success" amount={this.credit()} />
          <AmountBox text="Debit" type="danger" amount={this.debit()} />
          <AmountBox text="Balance" type="info" amount={this.balance()} />
        </div>
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        {recordsComponent}
      </div>
    )
  }
}

export default Records;
