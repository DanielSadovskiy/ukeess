import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EmplTable } from '../components/EmplTable';
import * as emplActions from '../actions/employees';

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(emplActions, dispatch)
});
const mapStateToProps = ({ employees, departments }) => ({
  employees: employees.employees,
  currPage: employees.currPage,
  totalEmployees: employees.totalEmployees,
  fetchedPages: employees.fetchedPages,
  startsWith: employees.startsWith,
  wasDeleted: employees.wasDeleted,
  colors: departments.colors
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmplTable);
