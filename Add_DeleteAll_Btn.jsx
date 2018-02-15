import React from 'react';

class Add_DeleteAll_Btn extends React.Component{
  constructor(props){
      super(props);
      this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
      this.handleDeleteAllBtnClick = this.handleDeleteAllBtnClick.bind(this);
  }

  handleAddBtnClick(){
    this.props.onShowAddPage();
    this.props.onHideDetailPage();
    this.props.onHideEditPage();
  }

  handleDeleteAllBtnClick(){
    this.props.onDeleteAll();
    this.props.onShowAddPage();
    this.props.onHideDetailPage();
    this.props.onHideEditPage();
    alert("All products have been deleted.");
  }

  render(){
    return(
      <div>
        <button onClick={this.handleAddBtnClick}>Add New Product</button>
        <br/><br/>
        <button onClick={this.handleDeleteAllBtnClick}>Delete All Products</button>
      </div>
    );
  }
}

export default Add_DeleteAll_Btn;
