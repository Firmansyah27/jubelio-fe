import React,{ useState, useContext, useRef } from 'react';
import "../css/home.css"
import CustomCard from "../component/card";
import CustomCard2 from "../component/card2";
import classNames from "classnames";
import InfiniteScroll from "react-infinite-scroller";
import { StoreContext } from "../store.context";
import { Grid, Card, TextareaAutosize, TextField, Button, FormControl, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Modal from 'react-modal';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import logo from '../assets/image/loading.gif'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  text: {
    minWidth: 120
  },
  type: {
    fontWeight: 600
  },
  select: {
    maxWidth: 130
  },
  closeButton: {
    cursor:'pointer', 
    float:'right', 
    marginTop: '5px', 
    width: '20px'
  }
}

const defaultProduct = { name: '', sku: '', image: '', price: '', description: '' }

const Home = ()=>  {
  // State
  const [data, setData] = useState([])
  const [product, setProduct] = useState(defaultProduct)
  const [productId, setProductId] = useState(0)
  const [action, setAction] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(8)
  const [hasMore, setHasMore] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  // Context
  const { productStore } = useContext(StoreContext)
  // Ref
  const modalRef = useRef(null);

  const handleLoadMore = async ()=> {
    setTimeout(async ()=> {
        const res = await productStore.getListProducts({page, limit})
        setData(data.concat(res.products))
        const total = res.counts[0].count
        const rest = total - (limit * page)
        if(rest > 0 ) {
          setPage(page +1 )
        } else {
          setHasMore(false)
        }
    }, 3000);
  }

  const handleOnlickCard = async (product)=> {
    setAction('update')
    setIsOpen(true)
    setProductId(product.id)
    const detailProduct = await productStore.getDetailProduct(product.id)
    delete detailProduct.id
    setProduct(detailProduct)
  }
  
  const handleCloseModal = ()=> {
    setIsOpen(false)
    setProduct(defaultProduct)
    console.log("Handle Close Modal")
  }

  const handleUpdate = async (values)=> {
    try {
      const res = await productStore.updateProduct(productId, values)
      const message = res.message
      const icon = res.statusCode == 200 ? 'success' : 'error'
      const title = res.statusCode == 200 ? 'Success!' : 'Failed!'
      Swal.fire(
          title,
          message,
          icon
      )
      setIsOpen(false)
    } catch (error) {
      Swal.fire(
          'Failed!',
          error.message,
          'error'
      )
    }
  }
  const handleCreate = async (values)=> {
    try {
      const res = await productStore.createProduct(productId, values)
      const message = res.message
      const icon = res.statusCode == 200 ? 'success' : 'error'
      const title = res.statusCode == 200 ? 'Success!' : 'Failed!'
      Swal.fire(
          title,
          message,
          icon
      )
      setIsOpen(false)
      setHasMore(true)
    } catch (error) {
      Swal.fire(
          'Failed!',
          error.message,
          'error'
      )
    }
  }

  const handleDelete = async ()=> {
    try {
      const res = await productStore.deleteProduct(productId)
      const message = res.message
      const icon = res.statusCode == 200 ? 'success' : 'error'
      const title = res.statusCode == 200 ? 'Success!' : 'Failed!'
      Swal.fire(
          title,
          message,
          icon
      )
      const newData = data.filter((value)=> value.id !== productId)
      setData(newData)
      setIsOpen(false)
    } catch (error) {
      Swal.fire(
          'Failed!',
          error.message,
          'error'
      )
    }
  }

  const handleCreateButton = ()=> {
    setAction('create')
    setIsOpen(true)
  }

  const handleFormSubmit = async (values)=> {
    switch (action) {
      case 'update':
        await handleUpdate(values)
        break;
      case 'create':
        await handleCreate(values)
        break;
      default:
        break;
    }
  }

  return (
      <div >
        <Button style={{ float: "left" }} variant="contained" color="primary" onClick={handleCreateButton}>
          Create
        </Button>
        {data ? (
          <InfiniteScroll
              style={{backGroundColor: 'red', overflow: "unset"}}
              pageStart={0}
              loadMore={handleLoadMore}
              hasMore={hasMore}
              loader={
                <div className="loader" key={0}>
                  <img src={logo} alt="loading..." />
                </div>
              }
            >
              <Grid container spacing={4} style={{paddingTop: "30px", width: "100%", display: 'flex'}}>
                {data.map((product, i) => (
                  <Grid key={i} item xs={12} sm={6} md={4} lg={3} style={{display: 'flex'}}>
                    <CustomCard2
                      onClick={()=> handleOnlickCard(product)}
                      style={{width: "100%", maxWidth: 250}}
                      name={product.name}
                      image={product.image}
                      price={product.price}
                      description={product.description}
                    />
                  </Grid>
                ))}
              </Grid>
            </InfiniteScroll>
        ) : (
          <h1>Loading Products</h1>
        )}

        <Modal
          isOpen={isOpen}
          // onAfterOpen={afterOpenModal}
          ariaHideApp={false}
          onRequestClose={handleCloseModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{ marginBottom: 35}} onClick={handleCloseModal}>
              <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' style={customStyles.closeButton}/>
          </div>
          <Formik
            enableReinitialize
            initialValues={product}
            validate={values => {
              const errors = {};
              if (!values.sku) {
                errors.sku = 'SKU is required.';
              }

              return errors;
            }}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="column">
                      <FormControl className={classNames(customStyles.text)}>
                        <Typography variant="body1">
                          Name :
                        </Typography>
                      </FormControl>
                      </div>
                    <div className="column">
                      <FormControl className={classNames(customStyles.text)}>
                        <TextField
                          id="name-input"
                          name="name"
                          type="text"
                          value={values.name}
                          onChange={handleChange}
                          style={{ marginBottom: 15, marginLeft: 10  }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="row">
                    <div className="column">
                      <FormControl className={classNames(customStyles.text)}>
                        <Typography variant="body1">
                          SKU :
                        </Typography>
                      </FormControl>
                    </div>
                    <div className="column">
                      <FormControl className={classNames(customStyles.text)}>
                        <TextField
                          id="sku-input"
                          name="sku"
                          type="text"
                          value={values.sku}
                          onChange={handleChange}
                          style={{ marginBottom: 15, marginLeft: 10 }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="row">
                    <div className="column">
                      <FormControl className={classNames(customStyles.text)}>
                        <Typography variant="body1">
                          Image :
                        </Typography>
                      </FormControl>
                    </div>
                    <div className="column">
                      <FormControl className={classNames(customStyles.text)}>
                        <TextField
                          id="image-input"
                          name="image"
                          type="text"
                          value={values.image}
                          onChange={handleChange}
                          style={{ marginBottom: 15, marginLeft: 10 }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="row">
                    <div className="column">
                      <FormControl className={classNames(customStyles.text)}>
                        <Typography variant="body1">
                          Price :
                        </Typography>
                      </FormControl>
                    </div>
                    <div className="column">
                      <FormControl className={classNames(customStyles.text)}>
                        <TextField
                          id="price-input"
                          name="price"
                          type="number"
                          value={values.price}
                          onChange={handleChange}
                          style={{ marginBottom: 15, marginLeft: 10 }}
                        />
                      </FormControl>
                    </div>
                  </div>
                    <FormControl className={classNames(customStyles.text)}>
                        <Typography variant="body1">
                          Description :
                        </Typography>
                      </FormControl>

                      <FormControl className={classNames(customStyles.text)}>
                        <TextareaAutosize
                          id="description-input"
                          name="description"
                          label="description"
                          type="text"
                          value={values.description}
                          onChange={handleChange}
                          style={{ minHeight: 200, marginLeft: 10 }}
                        />
                      </FormControl>
                    <div style={{marginTop:10}} className="row">
                      <div className="column">
                        <Button variant="contained" color="primary" type="submit">
                          {action == "create"? "Create" : "Update"}
                        </Button>
                      </div>
                      <div className="column">
                        <Button variant="contained" color="error" onClick={handleDelete}>
                          Delete
                        </Button>
                      </div>
                    </div>
                </form>
              </div>
            )}
          </Formik>
        </Modal>
      </div>
  );
}


export default Home;