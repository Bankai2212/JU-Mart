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
      this.props.onShowAddPage();
      this.props.onHideDetailPage();
      this.props.onHideEditPage();
      this.props.onDeleteOneProduct(this.props.index);
      alert("This product is deleted.");
    }
  }

  render() {
    const product = this.props.product;
    const name = product.quantity>0 ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name + " (out of stock)"}
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
      <input type="image" src="./src/images/deleteBtn.png" className="deleteBtn"
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
    const isSortOnPriceAscending = this.props.isSortOnPriceAscending;
    const isSortOnPriceDescending = this.props.isSortOnPriceDescending;
    const isSelectOnFood = this.props.isSelectOnFood;
    const isSelectOnHomemade = this.props.isSelectOnHomemade;
    const isSelectOnHandcraft = this.props.isSelectOnHandcraft;
    const filterText = this.props.filterText;
    var categoryName = "";
    var products = [].concat(this.props.products);

    products.forEach((product, index) => {
      product.index = index;
    });

    if(isSortOnPriceAscending){
      products.sort(function(a, b){
        return parseFloat(a.price) - parseFloat(b.price)});
    }

    if(isSortOnPriceDescending){
      products.sort(function(a, b){
        return parseFloat(b.price) - parseFloat(a.price)});
    }

    if(isSelectOnFood)
      categoryName = "Food";
    else if (isSelectOnHomemade)
      categoryName = "Homemade Item";
    else if (isSelectOnHandcraft)
      categoryName = "Handcraft Item";
    else
      categoryName = "";


    products.forEach((product) => {
      if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        return;
      }

      if (isSelectOnFood && product.category != "Food"){
        return;
      }

      if (isSelectOnHomemade && product.category != "Homemade Item"){
        return;
      }

      if (isSelectOnHandcraft && product.category != "Handcraft Item"){
        return;
      }

      items.push(
        <ProductItem
          product={product}
          key={product.index}
          index={product.index}
          onShowAddPage={this.props.onShowAddPage}
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
          <h2>Product List</h2>
          <h4>There are no product in the list</h4>
        </div>
      );

    }

    return (
      <div>
        <h2>Product List</h2>
        <h3>{categoryName}</h3>
        <div className="productList">{items}</div>
      </div>
    );
  }
}

export default ViewProduct;
