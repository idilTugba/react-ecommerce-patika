import { Table } from 'antd';
import { fetchOrderResult } from './../../api';
import { Image} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import {useMemo} from 'react';

function AdminOrders() {
    const {isLoading, isError, data, error} = useQuery('admin/order', fetchOrderResult);
    const dataColumn = useMemo(()=>{
        return [
            {
                title: "Address",
                dataIndex: "adress",
                key: "adress",
            },
            {
                title: "Order Time",
                dataIndex: "createdAt",
                key: "createdAt",
            },
            {
                title: "Items",
                key: "items",
                render: (text, record)=>(
                    record.items.length > 0 && (<div>{record.items.map(item => ( <Link to={`/products/${item._id}`}><Image htmlWidth={50} m="1" display="inline-block" key={item._id} src={item.photos[0]} /></Link> ))}</div>) 
                )
            },
        ];
    },[]);

    if(isLoading){ 
        return (<div>Loading...</div>)
    }
    
    if(isError){
        return (<div>Error : {error.message}</div>)
    }

    return (
        <Table dataSource={data} columns={dataColumn} rowKey="_id"/>
    )
}

export default AdminOrders
