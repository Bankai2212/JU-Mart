import React from 'react';

class Search_Sort_Form extends React.Component{
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event){
    if (event.target.name == "isSortOnPriceAscending"){
      this.props.onToggleSortOnPriceAscending();
    } else if (event.target.name == "isSortOnPriceDescending"){
      this.props.onToggleSortOnPriceDescending();
    } else if (event.target.name == "searchText"){
      this.props.onFilterTextChange(event.target.value);
    } else if (event.target.name == "isSelectOnFood"){
      this.props.onHandleSelectOnFood();
    } else if (event.target.name == "isSelectOnHomemade"){
      this.props.onHandleSelectOnHomemade();
    } else if (event.target.name == "isSelectOnHandcraft"){
      this.props.onHandleSelectOnHandcraft();
    }
  }

  render(){
    return(
      <div>
        <form>
          <span><b>Search:</b></span><br/>
          <input type="text" name="searchText" onChange={this.handleInputChange}
            placeholder="Search Product Name" className="searchBar"/><br/><br/>
          <span><b>Category: </b></span><br/>
          <input type="checkbox" checked={this.props.isSelectOnFood}
            name="isSelectOnFood" onChange={this.handleInputChange}/>Food<br/>
          <input type="checkbox" checked={this.props.isSelectOnHandcraft}
            name="isSelectOnHandcraft" onChange={this.handleInputChange}/>Handcraft Item<br/>
          <input type="checkbox" checked={this.props.isSelectOnHomemade}
            name="isSelectOnHomemade" onChange={this.handleInputChange}/>Homemade Item<br/><br/>
          <span><b>Sort by: </b></span><br/>
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
