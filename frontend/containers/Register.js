import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Register } from '../components/Register';
import * as authActions from '../actions/auth';

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch)
});
const mapStateToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
