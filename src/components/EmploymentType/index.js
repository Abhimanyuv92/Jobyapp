import React,{Component} from 'react'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

class EmploymentTypes extends Component {
  state = {
    isCheckedfullTime: false,
    isCheckedpartTime: false,
    isCheckedfreelance: false,
    isCheckedinternship: false,
    selectedEmploymentList: [],
  }

  onChangeEmploymentType = event => {
    const {
      isCheckedfullTime,
      isCheckedpartTime,
      isCheckedfreelance,
      isCheckedinternship,
      selectedEmploymentList,
    } = this.state

    const {employeeTypeFilter} = this.props
    employeeTypeFilter(event.target.value)

    // switch (event.target.value) {
    //   case 'Full Time':
    //     this.setState(
    //       {isCheckedfullTime: !isCheckedfullTime},
    //       this.updateEmploymentList(isCheckedfullTime, 'FULLTIME'),
    //     )
    //     break
    //   case 'Part Time':
    //     this.setState(
    //       {isCheckedpartTime: !isCheckedpartTime},
    //       this.updateEmploymentList(isCheckedpartTime, 'PARTTIME'),
    //     )
    //     break
    //   case 'Internship':
    //     this.setState(
    //       {isCheckedinternship: !isCheckedinternship},
    //       this.updateEmploymentList(isCheckedinternship, 'INTERNSHIP'),
    //     )

    //     break
    //   case 'Freelance':
    //     this.setState(
    //       {isCheckedfreelance: !isCheckedfreelance},
    //       this.updateEmploymentList(isCheckedfreelance, 'FREELANCE'),
    //     )
    //     break
    //   default:
    //     break
    // }
    // employeeTypeFilter(selectedEmploymentList)
  }

  render() {
    return (
      <div className="employment-list">
        {employmentTypesList.map(each => (
          <div key={each.employmentTypeId}>
            <label>
              <input
                type="radio"
                label={each.label}
                value={each.employmentTypeId}
                onChange={this.onChangeEmploymentType}
                name="employment_type"
              />
              {each.label}
            </label>
          </div>
        ))}
      </div>
    )
  }
}

export default EmploymentTypes

// updateEmploymentList = (bool, typeOfEmployment) => {
//     const {selectedEmploymentList} = this.state
//     if (!bool) {
//       this.setState(prevState => ({
//         selectedEmploymentList: [
//           ...prevState.selectedEmploymentList,
//           typeOfEmployment,
//         ],
//       }))
//     } else {
//       const updatedList = selectedEmploymentList.filter(
//         each => each !== typeOfEmployment,
//       )
//       this.setState({selectedEmploymentList: updatedList})
//     }
//   }
