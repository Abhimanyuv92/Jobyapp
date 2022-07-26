import React, {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {AiOutlineStar} from 'react-icons/ai'
import Header from '../Header'
import JobItem from '../JobItem'

class JobDetails extends Component {
  state = {jobDetails: [], similarJobs: [], skillsUpdated: false}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {location} = this.props
    const {pathname} = location
    const url = `https://apis.ccbp.in${pathname}`
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const dataJobDetials = data.job_details
    const updatedJobDetails = {
      companyLogoUrl: dataJobDetials.company_logo_url,
      companyWebsiteUrl: dataJobDetials.company_website_url,
      employmentType: dataJobDetials.employment_type,
      id: dataJobDetials.id,
      jobDescription: dataJobDetials.job_description,
      lifeAtCompanyDescription: dataJobDetials.life_at_company.description,
      lifeAtCompanyImageUrl: dataJobDetials.life_at_company.image_url,
      location: dataJobDetials.location,
      packagePerAnnum: dataJobDetials.package_per_annum,
      rating: dataJobDetials.rating,
      skills: dataJobDetials.skills,
      title: dataJobDetials.title,
    }
    const updatedSimilarJobs = data.similar_jobs.map(each => ({
      companyLogoUrlSj: each.company_logo_url,
      //   Sj at the end refers to similar job company Logo url,
      employmentTypeSj: each.employment_type,
      idSj: each.id,
      jobDescriptionSj: each.job_description,
      locationSj: each.location,
      ratingSj: each.rating,
      titleSj: each.title,
    }))

    this.setState({
      jobDetails: updatedJobDetails,
      similarJobs: updatedSimilarJobs,
      skillsUpdated: true,
    })
    // console.log(updatedJobDetails.skills)
  }

  renderSkills = () => {
    const {jobDetails, skillsUpdated} = this.state
    const {skills} = jobDetails

    if (skillsUpdated) {
      const updatedSkills = skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      console.log('skills', updatedSkills)
      return (
        <div className="skill-images">
          {updatedSkills.map(each => (
            <div>
              <img
                src={each.imageUrl}
                alt={each.name}
                className="skill-image"
              />
              <p>{each.name}</p>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <div style={{margin: '20px'}}>
        <p className="sub-heading">Similar Jobs</p>
        <div className="similar-jobs">
          {similarJobs.map(each => (
            <div className="similar-job" key={each.id}>
              <div className="job-item-title-header">
                <span className="company-logo">
                  <img
                    src={each.companyLogoUrlSj}
                    alt="similar job company logo"
                  />
                </span>
                <div>
                  <div className="title">{each.titleSj}</div>
                  <AiOutlineStar
                    color="#fbbf24"
                    fill="#fbbf24"
                    className="star"
                  />
                  <span className="rating">{each.ratingSj}</span>
                </div>
              </div>
              <p style={{height: '200px'}}>{each.jobDescriptionSj}</p>
              <div className="job-item-card-details">
                <div>{each.locationSj}</div>
                <div>{each.employmentTypeSj}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  render() {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
      //   companyWebsiteUrl,
      //   skills,
      id,
    } = jobDetails

    return (
      <div>
        <Header />
        <div className="job-details-header">
          <div className="job-details">
            <JobItem
              companyLogoUrl={companyLogoUrl}
              employmentType={employmentType}
              jobDescription={jobDescription}
              location={location}
              packagePerAnnum={packagePerAnnum}
              rating={rating}
              title={title}
              key={id}
            />
            {/* <a href={companyWebsiteUrl}>Visit</a> */}
            <div className="skills">
              <p className="sub-heading"> Skills</p>
              {this.renderSkills()}
            </div>
            <div className="life-at-company">
              <p className="sub-heading">Life at Company</p>
              <div className="life-at-company-details">
                <p>{lifeAtCompanyDescription}</p>
                <img src={lifeAtCompanyImageUrl} alt="Life at Company" />
              </div>
            </div>
          </div>
          {this.renderSimilarJobs()}
        </div>
      </div>
    )
  }
}

export default JobDetails
