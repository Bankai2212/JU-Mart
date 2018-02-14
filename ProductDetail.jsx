import React from 'react';

class ProductDetail extends React.Component{
  constructor(props){
    super(props);
    this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
  }

  handleEditBtnClick(){
    this.props.onShowEditPage();
  }

  render(){
    const showDetailPage= this.props.showDetailPage;
    if(showDetailPage){

      const product= this.props.products[this.props.productIndex];
      const rows = [];
      for (var keys in product){
        rows.push(
          <DetailsRow
            key={keys}
            value={product[keys]}/>
        );
      }
      return(
      <div>
        <table>
          {rows}
        </table>
        <button onClick={this.handleEditBtnClick}>Edit Product</button>
      </div>
      );
    }else{
      return null;
    }
  }
}

class DetailsRow extends React.Component{
  render(){
    if(this.props.key == 'image'){
      return(
      <tr>
        <th>{this.props.key}</th>
        <td>
          <div className="imgPreview">
            <img src={this.props.value.imagePreviewUrl}/>
          </div>
        </td>
      </tr>
      );
    }
    return(
      <tr>
        <th>{this.props.key}</th>
        <td>{this.props.value}</td>
      </tr>
    );
  }
}

export default ProductDetail;
