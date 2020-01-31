import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HomePage } from '../components/HomePage';
import * as authActions from '../actions/auth';
import * as emplActions from '../actions/employees';
import * as depsActions from '../actions/departments';

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch),
  ...bindActionCreators(emplActions, dispatch),
  ...bindActionCreators(depsActions, dispatch)
});
const mapStateToProps = ({ auth, departments }) => ({
  user: auth.user,
  departments: departments.departments
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
