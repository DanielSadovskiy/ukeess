import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ControlDepartment } from '../components/ControlDepartment';
import * as authActions from '../actions/auth';

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch)
});
const mapStateToProps = ({ auth }) => ({
  user: auth.user
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlDepartment);
