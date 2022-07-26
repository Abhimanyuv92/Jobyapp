import React,{Component} from 'react'
import './index.css'

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class SalaryRange extends Component {
  onChangeSalaryRange = event => {
    const {salaryFilter} = this.props
    const number = event.target.value
    //    console.log(`${number} LPA`)
    salaryFilter(number)
  }

  render() {
    return (
      <div className="salary-range" onChange={this.onChangeSalaryRange}>
        {salaryRangesList.map(each => (
          <div key={each.salaryRangeId}>
            <label className="salary-ranges">
              <input
                type="radio"
                label={each.label}
                value={each.salaryRangeId}
                name="salary_range"
              />
              {each.label}
            </label>
          </div>
        ))}
      </div>
    )
  }
}

export default SalaryRange
