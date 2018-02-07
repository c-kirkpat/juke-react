import React, { Component } from 'react';
import axios from 'axios';

export default class NewPlaylist extends Component {
  constructor () {
    super();
    this.state = {
      inputValue: "",
      isDirty: false
    };
    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  onSubmit(e){
    const {inputValue} = this.state;
    axios.post('/api/playlists', {name: inputValue})

    e.preventDefault();

    this.setState({ inputValue: "", isDirty: false})
    this.fieldsAreValid();
  }

  handleChange(e){
    this.setState({inputValue: e.target.value, isDirty: true})
    this.fieldsAreValid()
  }

  fieldsAreValid(){
    if (this.state.inputValue.length > 16){
      return false;
    } else if (this.state.inputValue.length === 0 && this.state.isDirty){
      return false;
    }
    return true;
  }

  render(){

    return (
    <div className="well">
      <form className="form-horizontal" onSubmit={e => this.onSubmit(e)}>
        <fieldset>
          <legend>New Playlist</legend>
          <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-xs-10">
              <input className="form-control" type="text" onChange={this.handleChange}  value={this.state.inputValue} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              <button disabled={!this.fieldsAreValid()} type="submit" className="btn btn-success">Create Playlist</button>
              {this.fieldsAreValid() ? <div></div> : <div className="alert alert-warning">Fix your name</div>}
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    )
    }
  }
