import React, {Component} from 'react'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchStr: ''  
    }
  }
  
  render() {
    switch (this.props.view) {
      case "view_all": {
        return ( 
          <div className="show-all-header">  
            <div className="d-flex align-items-stretch justify-content-between">
              <h2 className="font-light">Contacts</h2>
              <p className="h2 link btn btn-link btn-dark text-light shadow-sm" 
                 onClick={ (e)=>{this.props.onHeaderViewChange("new")} }>
                 <span className="oi oi-plus"></span>
              </p> 
            </div>
            <form className="mt-3">
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <span className="border border-bottom text-muted input-group-text bg-dark border-secondary rounded-0 border-top-0 border-left-0 border-right-0">
                    <span className="oi oi-magnifying-glass align-bottom"></span>
                  </span>
                </div>
                <input type="text" className="form-control bg-dark bg-dark border border-bottom text-light border-secondary rounded-0 border-top-0 border-left-0 border-right-0" id="searchContacts" placeholder="Search"
                  value={this.state.searchStr} 
                  onChange={(e) => this.handleSearch(e)}
                />
              </div>
            </form> 
          </div>
        )
      }
      case "view": {
        return ( <div>
          <div className="view-header">  
            <div className="d-flex align-content-center justify-content-between">
              <button className="btn btn-link px-0 text-light font-light m-0" 
                onClick={ () => {this.props.onHeaderViewChange("view_all")} }>
                &#10216; Contacts
              </button>
              <button className="btn btn-dark shadow-sm font-light m-0" 
                onClick={ () => {this.props.onHeaderViewChange("edit")} }>
                <span className="oi oi-pencil"></span>
              </button> 
            </div>
          </div>
        </div> )
      }
      case "edit": {
        return ( 
          <div className="new-header">  
          <div className="d-flex align-content-center justify-content-between">
            <button className="btn btn-link px-0 text-light font-light m-0" 
              onClick={ (e)=>{this.props.onHeaderViewChange("view_all")} }>
              &#10216; Contacts
            </button> 
            <button className="btn btn-dark shadow-sm font-light m-0" 
              type="submit" form="contact_form">
              <span className="oi oi-check"></span>
            </button> 
          </div>
        </div>
        )
      }
      case "new": {
        return (
          <div className="new-header">  
            <div className="d-flex align-content-center justify-content-between">
              <button className="btn btn-link px-0 text-light font-light m-0" 
                onClick={ (e)=>{this.props.onHeaderViewChange("view_all")} }>
                &#10216; Contacts
              </button> 
              <button className="btn btn-dark shadow-sm font-light m-0" 
                type="submit" form="contact_form">
                <span className="oi oi-check"></span>
              </button> 
            </div>
          </div>
        )
      }
      default: {
        return ( <div>Contacts</div> )        
      }
    }
  }

  handleSearch(e) {
    // update the searchStr
    let searchStr = e.target.value
    this.setState({searchStr: searchStr})

    // throttle search
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {this.props.handleSearch(this.state.searchStr)}, 500);
  }
}

export default Header