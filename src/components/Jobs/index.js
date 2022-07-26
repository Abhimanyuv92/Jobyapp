import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobItem from '../JobItem'
import ProfileDetails from '../ProfileDetails'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import './index.css'

class Jobs extends Component {
  state = {
    jobsData: [],
    isLoading: true,
    search: '',
    employmentType: '',
    minimumPackage: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  onChangeSearchText = event => {
    this.setState({search: event.target.value})
  }

  getJobsData = async () => {
    const {employmentType, minimumPackage, search} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${search}`
    console.log(url)
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const jobsData = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({jobsData, isLoading: false})
  }

  searchJobs = () => {
    this.getJobsData()
  }

  employeeTypeFilter = list => {
    console.log(list)

    this.setState({employmentType: list.join(',')}, this.getJobsData)
  }

  salaryFilter = salaryValue => {
    this.setState({minimumPackage: salaryValue}, this.getJobsData)
  }

  renderJobs = () => {
    const {jobsData} = this.state
    const numberOfJobs = jobsData.length
    return (
      <div className="jobs">
        <div className="left-panel">
          <ProfileDetails />
          <hr />
          <div className="employment-type">
            <h3>Type of Employment</h3>
            <EmploymentType employeeTypeFilter={this.employeeTypeFilter} />
          </div>
          <hr />
          <div className="salary-range">
            <h3>Salary Range </h3>
            <SalaryRange salaryFilter={this.salaryFilter} />
          </div>
        </div>
        <div className="right-panel">
          <input
            type="search"
            placeholder="Search"
            onChange={this.onChangeSearchText}
            className="search-box"
          />
          <button
            type="button"
            testid="searchButton"
            className="search"
            onClick={this.searchJobs}
          >
            <BsSearch className="search-icon" />
          </button>
          {numberOfJobs > 0 ? (
            jobsData.map(each => (
              <Link
                to={`/jobs/${each.id}`}
                key={each.id}
                style={{textDecoration: 'none'}}
              >
                <JobItem
                  companyLogoUrl={each.companyLogoUrl}
                  employmentType={each.employmentType}
                  jobDescription={each.jobDescription}
                  location={each.location}
                  packagePerAnnum={each.packagePerAnnum}
                  rating={each.rating}
                  title={each.title}
                />
              </Link>
            ))
          ) : (
            <div className="no-jobs-found">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
                alt="no jobs"
              />
              <p>No Jobs Found</p>
              <div>We could not find any jobs. Try other filters</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        {isLoading && this.renderLoader()}
        {!isLoading && this.renderJobs()}
      </>
    )
  }
}

export default Jobs
