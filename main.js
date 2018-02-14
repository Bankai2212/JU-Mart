import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Add_DeleteAll_Btn from './Add_DeleteAll_Btn.jsx';
import AddProductForm from './AddProductForm.jsx';
import './style.css';
//import ImageUploader from 'react-image-uploader';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import ImageUploader from 'react-images-upload';

var defaultState = {
  showAddPage: false,
  productList: []
};

function showAddPage(){
  return {
    type: 'SHOW_ADD_PAGE'
  };
}

function hideAddPage(){
  return {
    type: 'HIDE_ADD_PAGE'
  };
}

function addProduct(product){
  return {
    type: 'ADD_PRODUCT',
    product: product
  };
}

function deleteAll(){
  return {
    type: 'DELETE_ALL'
  };
}

function reducer(state, action){
  switch(action.type){
    case 'SHOW_ADD_PAGE':
      var newState = Object.assign({}, state);
      newState.showAddPage = true;
      return newState;

    case 'HIDE_ADD_PAGE':
      var newState = Object.assign({}, state);
      newState.showAddPage = false;
      return newState;

    case 'ADD_PRODUCT':
      var newState = Object.assign({}, state);
      newState.productList.push(action.product);
      return newState;

    case 'DELETE_ALL':
      var newState = Object.assign({}, state);
      newState.productList = [];
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
    this.handleAddProductSubmit = this.handleAddProductSubmit.bind(this);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.check = this.check.bind(this);
    this.state = {showAddPage: false, productList: [], pictures: []};
  }

  componentWillMount() {
    store.subscribe(() => {
      var state = store.getState();
      this.setState({
        showAddPage: state.showAddPage,
        productList: state.productList
      });
    });
  }

  handleShowAddPage(){
    store.dispatch(showAddPage());
  }

  handleHideAddPage(){
    store.dispatch(hideAddPage());
  }

  handleAddProductSubmit(product){
    store.dispatch(addProduct(product));
  }

  handleDeleteAll(){
    store.dispatch(deleteAll());
  }

  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
  }

  check(){
    console.log(this.state.pictures);
  }

  //testing purpose
  handleCheckData(){
    console.log(store.getState());
  }

  render(){
    return(
      <div>
        <h1>JU-Mart</h1>
        <div className="container">
          <div className="flex-item">
            <Add_DeleteAll_Btn
              onShowAddPage={this.handleShowAddPage}
              onDeleteAll={this.handleDeleteAll}/>
              <br/>
            <button type="button" onClick={this.handleCheckData.bind(this)}>Show Data</button>
          </div>
          <div className="flex-item">
            <AddProductForm
              showAddPage={this.state.showAddPage}
              onHideAddPage={this.handleHideAddPage}
              onAddProductSubmit={this.handleAddProductSubmit}/>
          </div>
          <div className="flex-item">
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
            <br/>
            <button onClick={this.check}>Check</button>
          </div>
          <div className="flex-item">
            <ImagesUploader
                url="#"
                optimisticPreviews
                onLoadEnd={(err) => {
                    if (err) {
                        console.error(err);
                    }
                }}
                label="Upload multiple images"/>
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
