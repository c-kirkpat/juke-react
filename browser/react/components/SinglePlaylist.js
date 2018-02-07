import React, { Component } from 'react';
import Songs from "./Songs";
import axios from "axios";
import AddSongForm from "./AddSongForm"

export default class SinglePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: {}
        }
        this.getPlaylist = this.getPlaylist.bind(this)
    }
    getPlaylist (id) {
        axios.get(`/api/playlists/${id}`)
        .then(res => res.data)
        .then(playlist => this.setState({
          playlist
        }));
    }
    componentDidMount () {

        this.getPlaylist(this.props.match.params.playlistId);
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.match.params.playlistId !== this.props.match.params.playlistId){
            this.getPlaylist(nextProps.match.params.playlistId);
        }
    }


render () {
    const playlist = this.state.playlist;
    return (
        <div>
        <h3>{ playlist.name }</h3>
        <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
        { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
        <hr />
        <AddSongForm />
      </div>
    )
}

}
