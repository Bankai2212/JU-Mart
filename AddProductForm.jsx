import React from 'react';

class AddProductForm extends React.Component{
  constructor(props){
    super(props);
    this.handleAddBtnSubmit = this.handleAddBtnSubmit.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {name: '', description: '', image: '', price: '',
      category: '', quantity: ''};
  }

  handleAddBtnSubmit(event){
    event.preventDefault();
    this.props.onAddProductSubmit(this.state);
    alert("New Product Added!");
    this.setState({name: '', description: '', image: '', price: '',
      category: '', quantity: ''});
  }

  handleCancelClick(){
    this.props.onHideAddPage();
    this.setState({name: '', description: '', image: '', price: '',
      category: '', quantity: ''});
  }

  handleInputChange(event){
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value
    });

  }

  render(){
    const showAddPage = this.props.showAddPage;

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
                  <td>Image: </td>
                  <td>
                    <input
                      name="image"
                      type="text"
                      value={this.state.image}
                      onChange={this.handleInputChange} required/>
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
