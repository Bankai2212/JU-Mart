import React from 'react';

class AddProductForm extends React.Component{
  constructor(props){
    super(props);
    this.handleAddBtnSubmit = this.handleAddBtnSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.state = {name: '', description: '', price: '', category: '',
                  quantity: '', image: {file: '', imagePreviewUrl: ''}};
  }

  handleAddBtnSubmit(event){
    event.preventDefault();
    var msg = [];

    if(this.state.price <= 0){
      msg.push("Please enter a positive value for the price.");
    }
    if(this.state.quantity < 0) {
      msg.push("Please enter a non-negative value for the quantity");
    }
    if(msg.length > 0){
      alert(msg.join("\n"));
    } else {
      this.props.onAddProductSubmit(this.state);
      alert("New Product Added!");
      this.setState({name: '', description: '', price: '', category: '',
                     quantity: '', image: {file: '', imagePreviewUrl: ''}});
      document.getElementById("fileInput").value = null;
    }
  }

  handleInputChange(event){
    var name = event.target.name;
    var value = event.target.value;

    if(name == 'price' && value != 0){
      value = Math.round(value * 100) / 100;
    } else if(name == 'quantity' && value != 0) {
      value = Math.floor(value);
    }

    this.setState({
      [name]: value
    });
  }

  handleImageChange(event){
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    if(file != undefined){
      reader.onloadend = () => {
        this.setState({image: {
          file: file,
          imagePreviewUrl: reader.result
        }});
      };

      reader.readAsDataURL(file);
    }
  }

  render(){
    const showAddPage = this.props.showAddPage;

    let imagePreviewUrl = this.state.image.imagePreviewUrl;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    if(!showAddPage){
      return null;
    }
    else{
      return(
        <div>
          <h2>Add Product Form</h2>
          <form onSubmit={this.handleAddBtnSubmit} className="submitForm">
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td className="fieldName">Product Name: </td>
                  <td>
                    <input
                      name="name"
                      type="text"
                      placeholder="Product Name..."
                      value={this.state.name}
                      onChange={this.handleInputChange} required/>
                  </td>
                </tr>
                <tr>
                  <td>Description: </td>
                  <td>
                    <textarea
                      name="description"
                      placeholder="Product Description..."
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      rows="4" cols="25" required></textarea>
                  </td>
                </tr>
                <tr>
                  <td>Price (RM): </td>
                  <td>
                    <input
                      name="price"
                      type="number"
                      placeholder="eg. 10.00"
                      value={this.state.price}
                      onChange={this.handleInputChange} required/>
                  </td>
                </tr>
                <tr>
                  <td>Category: </td>
                  <td>
                    <select name="category" value={this.state.category}
                      onChange={this.handleInputChange} required>
                      <option value="">Please select a category</option>
                      <option value="Food">Food</option>
                      <option value="Handcraft Item">Handcraft Item</option>
                      <option value="Homemade Item">Homemade Item</option>
                  </select>
                  </td>
                </tr>
                <tr>
                  <td>Quantity: </td>
                  <td>
                    <input
                      name="quantity"
                      type="number"
                      placeholder="eg. 0, 10, ..."
                      value={this.state.quantity}
                      onChange={this.handleInputChange} required/>
                  </td>
                </tr>
                <tr>
                  <td>Image: </td>
                  <td>
                    <div className="previewComponent">
                        <input className="fileInput"
                          type="file"
                          id="fileInput"
                          onChange={this.handleImageChange}
                          accept="image/*" required/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Image Preview:</td>
                  <td>
                    <div className="imgPreview">
                      {$imagePreview}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <br/>
            <div className="centerBtnGroup">
              <input type="submit" value="Add"/>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default AddProductForm;
