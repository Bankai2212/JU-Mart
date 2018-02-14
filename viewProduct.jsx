import React from 'react';



class ProductItem extends React.Component {

  onDetailsClick(){
    this.props.onHideAddPage();
    this.props.onShowDetailPage(this.props.index);
  }

  render() {
    const product = this.props.product;
    const name = product.quantity>0 ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
    <li>
      <a href="#" onClick={this.onDetailsClick.bind(this)}>
        <div className="imgPreview">
          <img src={product.image.imagePreviewUrl}/>
        </div>
        {name}
        {product.price}
      </a>
    </li>
    );
  }
}

class ViewProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = [];

    this.props.products.forEach((product, index) => {
      items.push(
        <ProductItem
          product={product}
          index={index}
          onShowDetailPage={this.props.onShowDetailPage}
          onHideAddPage={this.props.onHideAddPage}/>
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
        <ul>{items}</ul>
      </div>
    );
  }
}

export default ViewProduct;
