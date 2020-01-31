import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header } from '../components/Header';
import * as authActions from '../actions/auth';
import * as emplActions from '../actions/employees';
import * as depsActions from '../actions/departments';

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch),
  ...bindActionCreators(emplActions, dispatch),
  ...bindActionCreators(depsActions, dispatch)
});
const mapStateToProps = ({ auth }) => ({
  user: auth.user
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
