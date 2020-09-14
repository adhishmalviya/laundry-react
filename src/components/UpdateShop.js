import React, { Component } from 'react'
import { Pickup } from './PickupFunction'

class UpdateShop extends Component {
  constructor() {
    super()
    this.state = {
      OpeningTime: '',
      ClosingTime: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const user = {
     OpeningTime: this.state.OpeningTime,
      ClosingTime: this.state.ClosingTime
    }

    Pickup(user).then(res => {
      if (res) {
        this.props.history.push(`/shops/profle`)
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal" className="font-weight-bold text-primary">Update the shop Timing</h1>
              <div className="form-group">
                <label htmlFor="OpeningTime" className="font-weight-bold text-danger">Opening Time</label>
                <input
                  type="text"
                  className="form-control"
                  name="OpeningTime"
                  placeholder="9am-10pm"
                  value={this.state.OpeningTime}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ClosingTime" className="font-weight-bold text-danger">Closing Time</label>
                <input
                  type="text"
                  className="form-control"
                  name="ClosingTime"
                  placeholder="9am-10pm"
                  value={this.state.ClosingTime}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Update
              </button>
          <button className="btn btn-lg btn-primary btn-block">
       Forgot <a href="/shops/myorder">My Order</a></button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Pickup;