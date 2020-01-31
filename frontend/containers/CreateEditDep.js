import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CreateEditDep } from '../components/CreateEditDep';
import * as depsActions from '../actions/departments';

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(depsActions, dispatch)
});
const mapStateToProps = ({ departments }) => ({
  editDepModalIsOpen: departments.editDepModalIsOpen,
  createDepModalIsOpen: departments.createDepModalIsOpen,
  editableDep: departments.editableDep,
  isFetching: departments.isFetching
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEditDep);
