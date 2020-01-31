import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DepTable } from '../components/DepTable';
import * as depsActions from '../actions/departments';

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(depsActions, dispatch)
});
const mapStateToProps = ({ departments }) => ({
  departments: departments.departments,
  currPage: departments.currPage,
  wasDeleted: departments.wasDeleted,
  totalDepartments: departments.totalDepartments
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepTable);
