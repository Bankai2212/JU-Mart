import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Add_DeleteAll_Btn from './Add_DeleteAll_Btn.jsx';
import AddProductForm from './AddProductForm.jsx';
import ViewProduct from './ViewProduct.jsx';
import ProductDetail from './ProductDetail.jsx';
import EditProductForm from './EditProductForm.jsx';
import Search_Sort_Form from './Search_Sort_Form.jsx';
import './style.css';
//import ImageUploader from 'react-image-uploader';
//import ImagesUploader from 'react-images-uploader';
//import 'react-images-uploader/styles.css';
//import 'react-images-uploader/font.css';
//import ImageUploader from 'react-images-upload';

var defaultState = {
  showAddPage: true,
  showDetailPage: false,
  showEditPage: false,
  productIndex: null,
  productList: [],
  isSortOnCategory: false,
  isSortOnPriceAscending: false,
  isSortOnPriceDescending: false
};

function showAddPage(){
  return {
    type: 'SHOW_ADD_PAGE'
  };
}

function showDetailPage(){
  return {
    type: 'SHOW_DETAIL_PAGE'
  };
}

function showEditPage(){
  return {
    type: 'SHOW_EDIT_PAGE'
  };
}

function hideAddPage(){
  return {
    type: 'HIDE_ADD_PAGE'
  };
}

function hideDetailPage(){
  return {
    type: 'HIDE_DETAIL_PAGE'
  };
}

function hideEditPage(){
  return {
    type: 'HIDE_EDIT_PAGE'
  };
}

function setProductIndex(index){
  return {
    type: 'SET_PRODUCT_INDEX',
    index: index
  };
}

function addProduct(product){
  return {
    type: 'ADD_PRODUCT',
    product: product
  };
}

function editProduct(newProduct){
  return {
    type: 'EDIT_PRODUCT',
    newProduct: newProduct
  };
}

function deleteOneProduct(index){
  return {
    type: 'DELETE_ONE_PRODUCT',
    index: index
  };
}

function deleteAll(){
  return {
    type: 'DELETE_ALL'
  };
}

function toggleSortOnCategory(){
  return {
    type: 'TOGGLE_SORT_ON_CATEGORY'
  }
}

function toggleSortOnPriceAscending(){
  return {
    type: 'TOGGLE_SORT_ON_PRICE_ASCENDING'
  };
}

function toggleSortOnPriceDescending(){
  return {
    type: 'TOGGLE_SORT_ON_PRICE_DESCENDING'
  };
}

function reducer(state, action){
  switch(action.type){
    case 'SHOW_ADD_PAGE':
      var newState = Object.assign({}, state);
      newState.showAddPage = true;
      return newState;

    case 'SHOW_DETAIL_PAGE':
      var newState = Object.assign({}, state);
      newState.showDetailPage = true;
      return newState;

    case 'SHOW_EDIT_PAGE':
      var newState = Object.assign({}, state);
      newState.showEditPage = true;
      return newState;

    case 'HIDE_ADD_PAGE':
      var newState = Object.assign({}, state);
      newState.showAddPage = false;
      return newState;

    case 'HIDE_DETAIL_PAGE':
      var newState = Object.assign({}, state);
      newState.showDetailPage = false;
      return newState;

    case 'HIDE_EDIT_PAGE':
      var newState = Object.assign({}, state);
      newState.showEditPage = false;
      return newState;

    case 'ADD_PRODUCT':
      var newState = Object.assign({}, state);
      newState.productList.push(action.product);
      return newState;

    case 'SET_PRODUCT_INDEX':
      var newState = Object.assign({}, state);
      newState.productIndex = action.index;
      return newState;

    case 'EDIT_PRODUCT':
      var newState = Object.assign({}, state);
      newState.productList[newState.productIndex]= action.newProduct;
      return newState;

    case 'DELETE_ONE_PRODUCT':
      var newState = Object.assign({}, state);
      newState.productList.splice(action.index, 1);
      return newState;

    case 'DELETE_ALL':
      var newState = Object.assign({}, state);
      newState.productList = [];
      return newState;

    case 'TOGGLE_SORT_ON_CATEGORY':
      var newState = Object.assign({}, state);
      newState.isSortOnCategory = !newState.isSortOnCategory;
      return newState;

    case 'TOGGLE_SORT_ON_PRICE_ASCENDING':
      var newState = Object.assign({}, state);
      newState.isSortOnPriceAscending = !newState.isSortOnPriceAscending;
      newState.isSortOnPriceDescending = false;
      return newState;

    case 'TOGGLE_SORT_ON_PRICE_DESCENDING':
      var newState = Object.assign({}, state);
      newState.isSortOnPriceDescending = !newState.isSortOnPriceDescending;
      newState.isSortOnPriceAscending = false;
      return newState;

    default:
      return state;
  }
};

/* used by react-image-uploader
function uploadImage(file, done, progress) {
  // do your upload logic here
  let error = null;
  let uploadedImageURL = 'dog.jpg';
  done(error, uploadedImageURL);
}
*/

var store = createStore(reducer, defaultState);

class JU_Mart extends React.Component{
  constructor(props){
    super(props);
    this.handleShowAddPage = this.handleShowAddPage.bind(this);
    this.handleHideAddPage = this.handleHideAddPage.bind(this);
    this.handleShowDetailPage = this.handleShowDetailPage.bind(this);
    this.handleHideDetailPage = this.handleHideDetailPage.bind(this);
    this.handleShowEditPage = this.handleShowEditPage.bind(this);
    this.handleHideEditPage = this.handleHideEditPage.bind(this);
    this.handleAddProductSubmit = this.handleAddProductSubmit.bind(this);
    this.handleEditProductSubmit = this.handleEditProductSubmit.bind(this);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
    this.handleSetProductIndex = this.handleSetProductIndex.bind(this);
    this.handleDeleteOneProduct = this.handleDeleteOneProduct.bind(this);
    this.handleToggleSortOnCategory = this.handleToggleSortOnCategory.bind(this);
    this.handleToggleSortOnPriceAscending = this.handleToggleSortOnPriceAscending.bind(this);
    this.handleToggleSortOnPriceDescending = this.handleToggleSortOnPriceDescending.bind(this);
    this.state = {showAddPage: true, showDetailPage: false, showEditPage:false,
      productIndex: null, productList: [], isSortOnCategory: false,
      isSortOnPriceAscending: false, isSortOnPriceDescending: false};
  }

  componentWillMount() {
    store.subscribe(() => {
      var state = store.getState();
      this.setState({
        showAddPage: state.showAddPage,
        showDetailPage: state.showDetailPage,
        showEditPage: state.showEditPage,
        productIndex: state.productIndex,
        productList: state.productList,
        isSortOnCategory: state.isSortOnCategory,
        isSortOnPriceAscending: state.isSortOnPriceAscending,
        isSortOnPriceDescending: state.isSortOnPriceDescending
      });
    });
  }

  handleShowAddPage(){
    store.dispatch(showAddPage());
  }

  handleHideAddPage(){
    store.dispatch(hideAddPage());
  }

  handleShowDetailPage(){
    store.dispatch(showDetailPage());
  }

  handleSetProductIndex(index){
    store.dispatch(setProductIndex(index));
  }

  handleHideDetailPage(){
    store.dispatch(hideDetailPage());
  }

  handleShowEditPage(){
    store.dispatch(showEditPage());
  }

  handleHideEditPage(){
    store.dispatch(hideEditPage());
  }

  handleEditProductSubmit(newProduct){
    store.dispatch(editProduct(newProduct));
  }

  handleAddProductSubmit(product){
    store.dispatch(addProduct(product));
  }

  handleDeleteOneProduct(index){
    store.dispatch(deleteOneProduct(index));
  }

  handleDeleteAll(){
    store.dispatch(deleteAll());
  }

  handleToggleSortOnCategory(){
    store.dispatch(toggleSortOnCategory());
  }

  handleToggleSortOnPriceAscending(){
    store.dispatch(toggleSortOnPriceAscending());
  }

  handleToggleSortOnPriceDescending(){
    store.dispatch(toggleSortOnPriceDescending());
  }

  render(){
    return(
      <div>
        <h1>JU-Mart</h1>
        <div className="container">
          <div className="flex-item1">
            <Search_Sort_Form
              isSortOnCategory={this.state.isSortOnCategory}
              isSortOnPriceAscending={this.state.isSortOnPriceAscending}
              isSortOnPriceDescending={this.state.isSortOnPriceDescending}
              onToggleSortOnCategory={this.handleToggleSortOnCategory}
              onToggleSortOnPriceAscending={this.handleToggleSortOnPriceAscending}
              onToggleSortOnPriceDescending={this.handleToggleSortOnPriceDescending}/>
            <br/>
            <Add_DeleteAll_Btn
              onShowAddPage={this.handleShowAddPage}
              onDeleteAll={this.handleDeleteAll}
              onHideDetailPage={this.handleHideDetailPage}
              onHideEditPage={this.handleHideEditPage}/>
          </div>
          <div className="flex-item2">
            <ViewProduct
              products={this.state.productList}
              onShowAddPage={this.handleShowAddPage}
              onShowDetailPage={this.handleShowDetailPage}
              onSetProductIndex={this.handleSetProductIndex}
              onHideAddPage={this.handleHideAddPage}
              onHideEditPage={this.handleHideEditPage}
              onHideDetailPage={this.handleHideDetailPage}
              onDeleteOneProduct={this.handleDeleteOneProduct}
              isSortOnPriceAscending={this.state.isSortOnPriceAscending}
              isSortOnPriceDescending={this.state.isSortOnPriceDescending}
              isSortOnCategory={this.state.isSortOnCategory}/>
          </div>
          <div className="flex-item3">
            <AddProductForm
              showAddPage={this.state.showAddPage}
              onHideAddPage={this.handleHideAddPage}
              onAddProductSubmit={this.handleAddProductSubmit}/>

            <ProductDetail
              showDetailPage={this.state.showDetailPage}
              products={this.state.productList}
              productIndex={this.state.productIndex}
              onShowEditPage={this.handleShowEditPage}
              onHideDetailPage={this.handleHideDetailPage}/>

            <EditProductForm
              showEditPage={this.state.showEditPage}
              onHideEditPage={this.handleHideEditPage}
              onEditProductSubmit={this.handleEditProductSubmit}
              onShowDetailPage={this.handleShowDetailPage}
              products={this.state.productList}
              productIndex={this.state.productIndex}/>
          </div>

        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <JU_Mart/>,
  document.getElementById('app')
)
