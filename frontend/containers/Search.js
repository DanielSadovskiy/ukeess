import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Search } from '../components/Search';
import * as emplActions from '../actions/employees';

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(emplActions, dispatch)
});
const mapStateToProps = ({ employees }) => ({
  startsWith: employees.startsWith
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
