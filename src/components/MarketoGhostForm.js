import React, { Component } from 'react';

export default class MarketoGhostForm extends React.Component {
  constructor(props) {
    super(props);
    MktoForms2.loadForm("//app-ab06.marketo.com", "380-SBA-754", props.ID, this.handleFormSubmission );
  }

  handleFormSubmission(form) {
    form.submit();
    form.onSuccess( result => false );
  }

  render() {
  	const formID = `mktoForm_${this.props.ID}`;
    return (
      <form style={{ display: 'none' }} name={formID} id={formID}></form>
    );
  }
}

