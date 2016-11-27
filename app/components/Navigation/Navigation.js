import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function component (props) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AppBar
        title="Title"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    </MuiThemeProvider>
  )
}

