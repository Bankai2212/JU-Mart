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
        <h2>Product Details</h2>
        <table>
          <thead></thead>
          <tbody>
            <tr><th valign="top">Product Name:</th><td>{product.name}</td></tr>
            <tr><th valign="top">Description:</th><td>{product.description}</td></tr>
            <tr><th valign="top">Price:</th><td>RM {product.price}</td></tr>
            <tr><th valign="top">Category:</th><td>{product.category}</td></tr>
            <tr><th valign="top">Quantity:</th><td>{product.quantity}</td></tr>
            <tr>
              <th>Image:</th>
              <td><div className="imgPreview"><img src={product.image.imagePreviewUrl}/></div></td>
            </tr>
          </tbody>
        </table>
        <br/>
        <div className="centerBtnGroup">
          <button onClick={this.handleEditBtnClick}>Edit Product</button>
        </div>
      </div>
      );
    }else{
      return null;
    }
  }
}

export default ProductDetail;
