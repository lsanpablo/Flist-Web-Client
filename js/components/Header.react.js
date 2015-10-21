/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');
var FlistState = require('../stores/FlistStore')
var FlistActions = require('../actions/FlistActions');
var FlistViewConstants = require('../constants/FlistViewConstants');

var Header = React.createClass({
  componentDidMount: function() {
    FlistState.addChangeListener(this._on_change);
  },
  
  render: function() {
    if (/*this.props.view !== FlistViewConstants.CATEGORY && */this.props.category_object)
    {
      var back_button = (this.props.view === FlistViewConstants.DETAIL)? (<li><a href="#" className="item-warning" onCLick={this._on_back}>Back</a></li>):null;
      var account_button = (FlistState.getState().logged_in) ? (<a href="#" onClick={this._logout}>Sign out</a>):(<div id="g-signin2" className="g-signin2"></div>);
      return (
          <ul className="nav navbar-nav navbar-center">
            {back_button}
            <li className="item-warning"><a href="#" onClick={this._on_category_click}>{this.props.category_object.name}</a></li>
            <li className=""><a>Houston</a></li>
            <li className="">{account_button}</li>
          </ul>
          <SearchBar />
          <form class="navbar-form navbar-center" role="search">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search">
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
          </form>
          <HeaderAccountBar />
      );
    }
    return (
        <ul className="nav navbar-nav navbar-center">
        </ul>
    );
  },
  _on_category_click: function(event) {
    event.preventDefault();
    FlistActions.category_unselect();
  },
  _on_back: function(event) {
    event.preventDefault();
    FlistActions.view_change();
  },
  _on_change : function() {
    this.setState(FlistState.getState());
  }

});

module.exports = Header;
