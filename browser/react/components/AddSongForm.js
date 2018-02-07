import React, { Component } from 'react';
import axios from 'axios';

export default class AddSongForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue: '',
            songs: []
        }
    }
    onSubmit(e){
        e.preventDefault();
        const hash = window.location.hash
        const id = hash.slice(hash.lastIndexOf('/') + 1);
        console.log(this.state.inputValue);
        let song = this.state.songs.find(song=> song.id === +this.state.inputValue)
        axios.post(`/api/playlists/${id}/songs`, song)
        .then(res => console.log('success'));
      }
    
      handleChange(e){
       // console.log(typeof e.target.value);
        this.setState({inputValue: e.target.value})
       
        // this.fieldsAreValid()
      }
      getSongs () {
          axios.get('/api/songs')
          .then(res => res.data)
          .then(songs => {
              this.setState({songs})
            });
      }
      componentDidMount () {
          this.getSongs();
      }
    render () {
        return (
            <div className="well">
            <form onSubmit={e=> this.onSubmit(e)} className="form-horizontal" noValidate name="songSelect">
              <fieldset>
                <legend>Add to Playlist</legend>
                <div className="form-group">
                  <label htmlFor="song" className="col-xs-2 control-label">Song</label>
                  <div className="col-xs-10">
                    <select onChange={e=> this.handleChange(e)} className="form-control" name="song">
                        <option>DON'T SELECT ME </option>
                        {this.state.songs.map(song => (
                            <option key={song.id} value={song.id}>{song.name}</option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-10 col-xs-offset-2">
                    <button type="submit" className="btn btn-success">Add Song</button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        )
    }
}