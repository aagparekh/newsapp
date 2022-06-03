import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,descrip,author,imageurl,newsurl,publishedAt} = this.props;
    return (
      <div>
        <div className="card m-3">
  <img src={imageurl} className="card-img-top" height='220px' width='150px' alt="..."/>
  <div className="card-body">
    <h4 className="card-title">{title}</h4>
    <strong className="card-title">{author?author:'Anonymous'}</strong>
    <p><strong className="card-title">{new Date(publishedAt).toGMTString()}</strong></p>
    <p className="card-text">{descrip}....</p>
    <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Continue reading...</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
