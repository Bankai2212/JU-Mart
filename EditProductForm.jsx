import React from 'react';

class EditProductForm extends React.Component{
  constructor(props){
    super(props);
    this.handleEditBtnSubmit = this.handleEditBtnSubmit.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);

    this.state = {name: '', description: '', price: '', category: '',
          quantity: '', image: {file: '', imagePreviewUrl: ''}};
  }

  componentWillReceiveProps(nextProps){
    var product = nextProps.products[nextProps.productIndex];
    this.setState(product);
  }

  handleEditBtnSubmit(event){
    event.preventDefault();
    this.props.onEditProductSubmit(this.state);
    alert("Product Updated!");
    this.setState({name: '', description: '', price: '', category: '',
                   quantity: '', image: {file: '', imagePreviewUrl: ''}});
    this.props.onHideEditPage();
    this.props.onShowDetailPage();
  }

  handleCancelClick(){
    this.props.onHideEditPage();
    this.props.onShowDetailPage();
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
    const showEditPage = this.props.showEditPage;

    let imagePreviewUrl = this.state.image.imagePreviewUrl;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }


    if(!showEditPage){
      return null;
    }
    else{
      return(
        <div>
          <h2>Edit Product Form</h2>
          <form onSubmit={this.handleEditBtnSubmit}>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td>New Product Name: </td>
                  <td>
                    <input
                      name="name"
                      type="text"
                      value={this.state.name}
                      onChange={this.handleInputChange} required/>
                  </td>
                </tr>
                <tr>
                  <td>New Description: </td>
                  <td>
                    <textarea
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      rows="4" cols="20" required></textarea>
                  </td>
                </tr>
                <tr>
                  <td>New Price: </td>
                  <td>
                    <input
                      name="price"
                      type="number"
                      value={this.state.price}
                      onChange={this.handleInputChange} required/>
                  </td>
                </tr>
                <tr>
                  <td>New Category: </td>
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
                  <td>New Quantity: </td>
                  <td>
                    <input
                      name="quantity"
                      type="number"
                      value={this.state.quantity}
                      onChange={this.handleInputChange} required/>
                  </td>
                </tr>
                <tr>
                  <td>New Image: </td>
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
                    <span>Image Preview</span><br/>
                    <div className="imgPreview">
                      {$imagePreview}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <br/>
            <input type="submit" value="Save"/>
            {' '}
            <button type="button" onClick={this.handleCancelClick}>Cancel</button>
          </form>
        </div>
      );
    }
  }
}

export default EditProductForm;
