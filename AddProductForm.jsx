import React from 'react';

class AddProductForm extends React.Component{
  constructor(props){
    super(props);
    this.handleAddBtnSubmit = this.handleAddBtnSubmit.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.state = {name: '', description: '', price: '', category: '',
                  quantity: '', image: {file: '', imagePreviewUrl: ''}};
  }

  handleAddBtnSubmit(event){
    event.preventDefault();
    this.props.onAddProductSubmit(this.state);
    alert("New Product Added!");
    this.setState({name: '', description: '', price: '', category: '',
                   quantity: '', image: {file: '', imagePreviewUrl: ''}});
  }

  handleCancelClick(){
    this.props.onHideAddPage();
    this.setState({name: '', description: '', price: '', category: '',
                   quantity: '', image: {file: '', imagePreviewUrl: ''}});
  }

  handleInputChange(event){
    var name = event.target.name;
    var value = event.target.value;
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
          <form onSubmit={this.handleAddBtnSubmit}>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td>Product Name: </td>
                  <td>
                    <input
                      name="name"
                      type="text"
                      value={this.state.name}
                      onChange={this.handleInputChange} required/>
                  </td>
                </tr>
                <tr>
                  <td>Description: </td>
                  <td>
                    <textarea
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      rows="4" cols="20" required></textarea>
                  </td>
                </tr>
                <tr>
                  <td>Price: </td>
                  <td>
                    <input
                      name="price"
                      type="number"
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
                          onChange={this.handleImageChange}
                          accept="image/*" required/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className="imgPreview">
                      {$imagePreview}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <br/>
            <input type="submit" value="Add"/>
            {' '}
            <button type="button" onClick={this.handleCancelClick}>Cancel</button>
          </form>
        </div>
      );
    }
  }
}

export default AddProductForm;
