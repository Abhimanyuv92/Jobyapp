import React , {Component} from 'react'
import {AiOutlineStar} from 'react-icons/ai'
// import {IoLocation} from 'react-icons/io'
import './index.css'

class JobItem extends Component {
  render() {
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = this.props
    return (
      <div className="job-item">
        <div className="job-item-title-header">
          <span className="company-logo">
            <img src={companyLogoUrl} alt="company logo" />
          </span>
          <div>
            <div className="title">{title}</div>
            <AiOutlineStar color="#fbbf24" fill="#fbbf24" className="star" />
            <span className="rating">{rating}</span>
          </div>
        </div>
        <div className="job-item-card-details">
          <div>{location}</div>
          <div>{employmentType}</div>
          <div>{packagePerAnnum}</div>
        </div>
        <hr />
        <p>Description</p>
        <p>{jobDescription}</p>
      </div>
    )
  }
}

export default JobItem
