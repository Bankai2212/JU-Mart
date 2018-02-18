import React from 'react';

class Search_Sort_Form extends React.Component{
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event){
    if(event.target.name == "isSortOnCategory"){
      this.props.onToggleSortOnCategory();
    } else if (event.target.name == "isSortOnPriceAscending"){
      this.props.onToggleSortOnPriceAscending();
    } else if (event.target.name == "isSortOnPriceDescending"){
      this.props.onToggleSortOnPriceDescending();
    }
  }

  render(){
    return(
      <div>
        <form>
          <span>Search:</span><br/>
          <input type="text" name="searchText" onChange={this.handleInputChange}
            placeholder="Search Product Name" className="searchBar"/><br/><br/>
          <span>Sort by: </span><br/>
          <input type="checkbox" checked={this.props.isSortOnCategory}
            name="isSortOnCategory" onChange={this.handleInputChange}/>Category<br/>
          <input type="checkbox" checked={this.props.isSortOnPriceAscending}
            name="isSortOnPriceAscending" onChange={this.handleInputChange}/>Price low to high<br/>
          <input type="checkbox" checked={this.props.isSortOnPriceDescending}
            name="isSortOnPriceDescending" onChange={this.handleInputChange}/>Price high to low<br/>
        </form>
      </div>
    );
  }
}

export default Search_Sort_Form;
