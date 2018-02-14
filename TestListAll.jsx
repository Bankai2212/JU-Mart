import React from 'react';

class TestListAll extends React.Component{
  render(){
    var productList = [];
    this.props.productList.forEach((product, index) => {
        var listItem = (
          <li key={index}>
            <h3>Product Name: {product.name}</h3><br/>
            <span>Description: {product.description}</span><br/>
            <span>Price: RM {product.price}</span><br/>
            <span>Category: {product.category}</span><br/>
            <span>Quantity: {product.quantity}</span><br/>
            <span>Image:</span><br/>
            <div className="imgPreview">
              <img src={product.image.imagePreviewUrl}/>
            </div>
          </li>
        );
        productList.push(listItem);
      }
    );

    if(productList.length == 0){
      return <h4>There are no product in the list</h4>;
    }
    return(
      <ul>{productList}</ul>
    );
  }
}

export default TestListAll;
