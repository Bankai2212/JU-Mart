import React from 'react';

class Search_Sort_Form extends React.Component{
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event){
    if(event.target.name == "isSortOnCategory"){
      this.props.onToggleSortOnCategory();
    } else if (event.target.name == "isSortOnPrice"){
      this.props.onToggleSortOnPrice();
    }
  }

  render(){
    return(
      <div>
        <form>
          <input type="text" name="searchText" onChange={this.handleInputChange}
            placeholder="Search Product Name"/><br/>
          <span>Sort by: </span><br/>
          <input type="checkbox" checked={this.props.isSortOnCategory}
            name="isSortOnCategory" onChange={this.handleInputChange}/>Category<br/>
          <input type="checkbox" checked={this.props.isSortOnPrice}
            name="isSortOnPrice" onChange={this.handleInputChange}/>Price<br/>
        </form>
      </div>
    );
  }
}

export default Search_Sort_Form;
