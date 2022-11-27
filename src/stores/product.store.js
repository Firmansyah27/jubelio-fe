import { makeObservable, action, observable} from 'mobx';
import { apiGet, apiPost, apiPut, apiDelete } from '../utils/axios'

export class ProductStore {
    products = []

    constructor() {
        makeObservable(this,{
            products: observable,
            getStoreProducts: action,
            importProducts: action,
            getListProducts: action,
            updateProduct: action,
        })
    }

    async getStoreProducts(query={}) {
        const query_param = new URLSearchParams(query).toString()
        const url = `${process.env.REACT_APP_STORE_URL}/wp-json/wc/v3/products?${query_param}`
        const auth ={
            username: process.env.REACT_APP_CUSTOMER_KEY,
            password: process.env.REACT_APP_CUSTOMER_SECRET
          }
          const res = apiGet(url, {}, auth)
          this.products.push(res)
          return res
        }
        
    async importProducts(data=[]) {
        const url = `${process.env.REACT_APP_BASE_URL}/products/import`
        const res = apiPost(url, data)
        return res
    }
    
    async getListProducts(query={}) {
        const query_param = new URLSearchParams(query).toString()
        const url = `${process.env.REACT_APP_BASE_URL}/products?${query_param}`
        const res = apiGet(url, {})
        return res
    }

    async createProduct(id, data={}) {
        const url = `${process.env.REACT_APP_BASE_URL}/products/`
        const res = await apiPost(url, data)
        return res
    }

    async getDetailProduct(id) {
        const url = `${process.env.REACT_APP_BASE_URL}/products/${id}`
        const res = await apiGet(url, {})
        return res
    }

    async updateProduct(id, data={}) {
        const url = `${process.env.REACT_APP_BASE_URL}/products/${id}`
        const res = await apiPut(url, data)
        return res
    }

    async deleteProduct(id) {
        const url = `${process.env.REACT_APP_BASE_URL}/products/${id}`
        const res = await apiDelete(url)
        return res
    }
}