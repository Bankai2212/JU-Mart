import React from 'react';

class ProductDetail extends React.Component{
  constructor(props){
    super(props);
    this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
  }

  handleEditBtnClick(){
    this.props.onHideDetailPage();
    this.props.onShowEditPage();
  }

  render(){
    const showDetailPage= this.props.showDetailPage;
    if(showDetailPage){

      var product = this.props.products[this.props.productIndex];

      return(
      <div>
        <table>
          <thead></thead>
          <tbody>
            <tr><th>Product Name:</th><td>{product.name}</td></tr>
            <tr><th>Description:</th><td>{product.description}</td></tr>
            <tr><th>Price: RM</th><td>{product.price}</td></tr>
            <tr><th>Category:</th><td>{product.category}</td></tr>
            <tr><th>Quantity:</th><td>{product.quantity}</td></tr>
            <tr>
              <th>Image:</th>
              <td><div className="imgPreview"><img src={product.image.imagePreviewUrl}/></div></td>
            </tr>
          </tbody>
        </table>
        <button onClick={this.handleEditBtnClick}>Edit Product</button>
      </div>
      );
    }else{
      return null;
    }
  }
}

export default ProductDetail;
