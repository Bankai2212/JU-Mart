import React from 'react';

class ProductItem extends React.Component {

  onDetailsClick(){
    this.props.onHideAddPage();
    this.props.onHideEditPage();
    this.props.onShowDetailPage();
    this.props.onSetProductIndex(this.props.index);
  }

  onDeleteOneProduct(){
    var response = confirm("Do you want to delete this product?\n" +
        "Product Name: " + this.props.product.name);
    if(response){
      this.props.onHideDetailPage();
      this.props.onHideEditPage();
      this.props.onDeleteOneProduct();
      alert("This product is deleted.");
    }
  }

  render() {
    const product = this.props.product;
    const name = product.quantity>0 ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name + "(out of stock)"}
      </span>;

    return (
    <div key={this.props.index} className="productItemContainer">
      <div onClick={this.onDetailsClick.bind(this)} className="productItemFlex">
        <div className="imgPreview">
          <img src={product.image.imagePreviewUrl}/>
        </div>
        <p style={{textAlign: 'center'}}><b>{name}</b></p>
        <p style={{textAlign: 'center'}}>RM {product.price}</p>
      </div>
      <input type="image" src="./src/deleteBtn.png" className="deleteBtn"
        onClick={this.onDeleteOneProduct.bind(this)}/>
    </div>
    );
  }
}

class ViewProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = [];
    const isSortOnPrice = this.props.isSortOnPrice;
    const products = [].concat(this.props.products);
    if(isSortOnPrice){
      products.sort(function(a, b){
        return parseFloat(a.price) - parseFloat(b.price)});
    }

    products.forEach((product, index) => {
      items.push(
        <ProductItem
          product={product}
          key={index}
          index={index}
          onShowDetailPage={this.props.onShowDetailPage}
          onHideDetailPage={this.props.onHideDetailPage}
          onHideAddPage={this.props.onHideAddPage}
          onHideEditPage={this.props.onHideEditPage}
          onSetProductIndex={this.props.onSetProductIndex}
          onDeleteOneProduct={this.props.onDeleteOneProduct}/>
      );
    });

    if(items.length == 0){
      return(
        <div>
          <h1>Product List</h1>
          <h4>There are no product in the list</h4>
        </div>
      );

    }

    return (
      <div>
        <h1>Product List</h1>
        <div className="productList">{items}</div>
      </div>
    );
  }
}

export default ViewProduct;
