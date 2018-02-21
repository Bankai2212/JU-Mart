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

var defaultState = {
  showAddPage: true,
  showDetailPage: false,
  showEditPage: false,
  productIndex: null,
  productList: [],
  isSelectOnFood: false,
  isSelectOnHomemade: false,
  isSelectOnHandcraft: false,
  isSortOnPriceAscending: false,
  isSortOnPriceDescending: false,
  filterText: ""
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

function toggleSelectOnFood(){
  return {
    type: 'TOGGLE_SELECT_ON_FOOD'
  }
}

function toggleSelectOnHomemade(){
  return {
    type: 'TOGGLE_SELECT_ON_HOMEMADE'
  }
}

function toggleSelectOnHandcraft(){
  return {
    type: 'TOGGLE_SELECT_ON_HANDCRAFT'
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

function filterTextChange(filterText){
  return {
    type: 'FILTER_TEXT_CHANGE',
    filterText: filterText
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
      var newProduct = Object.assign({}, action.product);
      if(parseInt(newProduct.quantity) == 0){
        newProduct.quantity = 0;
      }
      newState.productList.push(newProduct);
      return newState;

    case 'SET_PRODUCT_INDEX':
      var newState = Object.assign({}, state);
      newState.productIndex = action.index;
      return newState;

    case 'EDIT_PRODUCT':
      var newState = Object.assign({}, state);
      var newProduct = Object.assign({}, action.newProduct);
      if(parseInt(newProduct.quantity) == 0){
        newProduct.quantity = 0;
      }
      newState.productList[newState.productIndex] = newProduct;
      return newState;

    case 'DELETE_ONE_PRODUCT':
      var newState = Object.assign({}, state);
      newState.productList.splice(action.index, 1);
      return newState;

    case 'DELETE_ALL':
      var newState = Object.assign({}, state);
      newState.productList = [];
      return newState;

    case 'TOGGLE_SELECT_ON_FOOD':
      var newState = Object.assign({}, state);
      newState.isSelectOnFood = !newState.isSelectOnFood;
      newState.isSelectOnHomemade = false;
      newState.isSelectOnHandcraft = false;
      return newState;

    case 'TOGGLE_SELECT_ON_HOMEMADE':
      var newState = Object.assign({}, state);
      newState.isSelectOnHomemade = !newState.isSelectOnHomemade;
      newState.isSelectOnFood = false;
      newState.isSelectOnHandcraft = false;
      return newState;

    case 'TOGGLE_SELECT_ON_HANDCRAFT':
      var newState = Object.assign({}, state);
      newState.isSelectOnHandcraft = !newState.isSelectOnHandcraft;
      newState.isSelectOnFood = false;
      newState.isSelectOnHomemade = false;
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

    case 'FILTER_TEXT_CHANGE':
      var newState = Object.assign({}, state);
      newState.filterText = action.filterText;
      return newState;

    default:
      return state;
  }
};

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
    this.handleToggleSortOnPriceAscending = this.handleToggleSortOnPriceAscending.bind(this);
    this.handleToggleSortOnPriceDescending = this.handleToggleSortOnPriceDescending.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleSelectOnFood = this.handleSelectOnFood.bind(this);
    this.handleSelectOnHandcraft = this.handleSelectOnHandcraft.bind(this);
    this.handleSelectOnHomemade = this.handleSelectOnHomemade.bind(this);
    this.state = {showAddPage: true, showDetailPage: false, showEditPage:false,
      productIndex: null, productList: [], isSelectOnFood: false,
      isSelectOnHomemade: false, isSelectOnHandcraft: false,
      isSortOnPriceAscending: false, isSortOnPriceDescending: false,
      filterText: ""};
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
        isSelectOnFood: state.isSelectOnFood,
        isSelectOnHomemade: state.isSelectOnHomemade,
        isSelectOnHandcraft: state.isSelectOnHandcraft,
        isSortOnPriceAscending: state.isSortOnPriceAscending,
        isSortOnPriceDescending: state.isSortOnPriceDescending,
        filterText: state.filterText
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

  handleToggleSortOnPriceAscending(){
    store.dispatch(toggleSortOnPriceAscending());
  }

  handleToggleSortOnPriceDescending(){
    store.dispatch(toggleSortOnPriceDescending());
  }

  handleFilterTextChange(filterText){
    store.dispatch(filterTextChange(filterText));
  }

  handleSelectOnFood(){
    store.dispatch(toggleSelectOnFood());
  }

  handleSelectOnHomemade(){
    store.dispatch(toggleSelectOnHomemade());
  }

  handleSelectOnHandcraft(){
    store.dispatch(toggleSelectOnHandcraft());
  }

  render(){
    return(
      <div>
        <span className="Logo"><img src="./src/images/shopping-cart.png"/>JU-Mart</span>
        <div className="container">
          <div className="flex-item1">
            <Search_Sort_Form
              isSortOnPriceAscending={this.state.isSortOnPriceAscending}
              isSortOnPriceDescending={this.state.isSortOnPriceDescending}
              isSelectOnFood={this.state.isSelectOnFood}
              isSelectOnHomemade={this.state.isSelectOnHomemade}
              isSelectOnHandcraft={this.state.isSelectOnHandcraft}
              onToggleSortOnPriceAscending={this.handleToggleSortOnPriceAscending}
              onToggleSortOnPriceDescending={this.handleToggleSortOnPriceDescending}
              onFilterTextChange={this.handleFilterTextChange}
              onHandleSelectOnFood={this.handleSelectOnFood}
              onHandleSelectOnHomemade={this.handleSelectOnHomemade}
              onHandleSelectOnHandcraft={this.handleSelectOnHandcraft}/>
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
              isSelectOnFood={this.state.isSelectOnFood}
              isSelectOnHomemade={this.state.isSelectOnHomemade}
              isSelectOnHandcraft={this.state.isSelectOnHandcraft}
              filterText={this.state.filterText}/>
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
