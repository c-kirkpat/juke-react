import React, { Component } from 'react';
import axios from 'axios';
import Songs from '../components/Songs';

export default class SingleAlbum extends Component {

  constructor() {
    super();
    this.state = {
      album: {}
    };
    this.getSingleAlbum = this.getSingleAlbum.bind(this);
  }
  getSingleAlbum(id) {
    axios.get(`/api/albums/${id}`)
      .then(res => res.data)
      .then(album => this.setState({
        album
      }));
  }
  componentDidMount() {
    const albumId = this.props.match.params.albumId;
    this.getSingleAlbum(albumId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.albumId !== this.props.match.params.albumId) {
      this.getSingleAlbum(nextProps.match.params.albumId);
    }
  }

  render() {
    const album = this.state.album;

    return (
      <div className="album">
        <div>
          <h3>{album.name}</h3>
          <img src={album.imageUrl} className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}
