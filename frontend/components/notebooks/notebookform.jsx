var React = require('react'),
    NotebookActions = require('../../actions/notebook_actions'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');

var NoteBookForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return ({title: "", description: ""});
  },

  createNotebook: function(e){
    e.preventDefault();
    NotebookActions.createNotebook({title: this.state.title});
    this.setState({title: ''});
    this.props.hideModal();
  },

  render: function(){
    return(
      <form role='form' onSubmit={this.createNotebook}>
        <div className="notebook-form form-group">
              Notebook Title:
              <br/>
            <div className="mdl-textfield mdl-js-textfield">
              <input className='mdl-textfield__input' type='text' valueLink={this.linkState('title')} id="notebook-title"/>
              {/*<label className="mdl-textfield__label" htmlFor="notebook-title">Notebook Title</label>*/}
            </div>
        </div>
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-color-text--white mdl-js-ripple-effect">Create Notebook</button>
      </form>
    );
  }
});

module.exports = NoteBookForm;
