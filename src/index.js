import React from 'react';
import { defaultProps } from './default-props';
import { propTypes } from './prop-types';
import MaterialTable from './material-table';
import { withStyles } from '@material-ui/core';

MaterialTable.defaultProps = defaultProps;
MaterialTable.propTypes = propTypes;

const styles = theme => ({
  paginationRoot: {
    width: '100%'
  },
  paginationToolbar: {
    padding: 0,
    width: '100%'
  },
  paginationCaption: {
    display: 'none'
  },
  paginationSelectRoot: {
    margin: 0
  },
  '@global': {
    '.MuiTableCell-body.cell-fixed': {
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      zIndex: 1
    },
    '.MuiTableCell-head.cell-fixed, .MuiTableCell-footer.cell-fixed': {
      zIndex: 11
    }
  }
});


export default withStyles(styles, { withTheme: true })(props => <MaterialTable {...props} ref={props.tableRef} />);
export * from './components';
