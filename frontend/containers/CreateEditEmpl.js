import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CreateEditEmpl } from '../components/CreateEditEmpl';
import * as emplActions from '../actions/employees';

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(emplActions, dispatch)
});
const mapStateToProps = ({ employees, departments }) => ({
  editEmplModalIsOpen: employees.editEmplModalIsOpen,
  createEmplModalIsOpen: employees.createEmplModalIsOpen,
  departments: departments.departments,
  editableEmpl: employees.editableEmpl,
  isFetching: employees.isFetching
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEditEmpl);
