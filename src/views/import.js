import { useContext, useEffect, useState } from "react";
import { Pagination, Button } from "antd";
import { observer } from "mobx-react";
import { StoreContext } from "../store.context";
import EditableTable from '../component/editable-table'; 
import Swal from 'sweetalert2';

const Import = () => { 
    const [total, setTotal] = useState(0)
    const [data, setData] = useState([])
    const [payload, setPayload] = useState([])
    const [page, setPage] = useState(1)
    const { productStore } = useContext(StoreContext)

    useEffect(() => {
        if(total == 0) {
            getTotal()
        }
    },[])

    const getTotal = async ()=> {
        const allProduct = await productStore.getStoreProducts({per_page:100})
        setTotal(allProduct.length)
        const data = await productStore.getStoreProducts({page})
        const formatedData = data.map((obj) => {return {
            key: obj.id,
            name: obj.name,
            sku: obj.sku || "-",
            image: obj.images.length > 0 ? obj.images[0].src : "-",
            price: obj.price || 0,
            description: obj.description || "-",
        }})
        setData(formatedData)
        const payload = createPayload(formatedData)
        setPayload(formatedData)
    }

    const handlePageChange = async (newPage)=> {
        const data = await productStore.getStoreProducts({page:newPage})
        const formatedData = data.map((obj) => {return {
            key: obj.id,
            name: obj.name,
            sku: obj.sku || "",
            image: obj.images.length > 0 ? obj.images[0].src : "",
            price: obj.price || 0,
            description: obj.description || "",
        }})
        setData(formatedData)
        const payload = createPayload(formatedData)
        setPayload(payload)
    }
    
    const createPayload = (data)=> {

        return data.map(({key, ...payload}) => payload)
    }

    const hanleOnDataChange = (data)=> {
        setData(data)
        const payload = createPayload(data)
        setPayload(payload)
    }

    const handleImport = async ()=> {
        try {
            const res = await productStore.importProducts(payload)
            const message = res.message
            const icon = res.statusCode == 200 ? 'success' : 'error'
            const title = res.statusCode == 200 ? 'Success!' : 'Failed!'
            Swal.fire(
                title,
                message,
                icon
            )
        } catch (error) {
            Swal.fire(
                'Failed!',
                error.message,
                'error'
            )
        }
    }

    
    return (
        <div>
            <Button type="primary" style={{float: "left", marginBottom: 10, width: 100 }} onClick={handleImport}>Import</Button>
            <EditableTable 
                data={data}
                CustomPagination={
                    <Pagination defaultCurrent={1} total={total} showSizeChanger={false} current={page} onChange={(page, size) => {handlePageChange(page); setPage(page)}}/>
                } 
                onDataChange={(data)=> hanleOnDataChange(data)}
            />
        </div>
    )
}

export default observer(Import)