import { Table , Popconfirm } from 'antd';
import { ProductsList, deleteProduct } from './../../api';
import { useQuery, useMutation, useQueryClient} from 'react-query';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import {useMemo} from 'react';

function AdminProducts() {
    const {isLoading, isError, data, error} = useQuery('admin:products', ProductsList);
    const queryClient = useQueryClient();
    const deleteutation = useMutation(deleteProduct, {
        onSuccess: ()=>{
            queryClient.invalidateQueries('admin:product');
        }
    });
    
    const dataColumn = useMemo(()=>{
        return [
            {
                title: "Title",
                dataIndex: "title",
                key: "title",
            },
            {
                title: "Created At",
                dataIndex: "createdAt",
                key: "createdAt",
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price"
            },
            {
                title: "Action",
                dataIndex: "action",
                render: (text, record)=>(
                    <div>
                        <Link to={`${record._id}`}>EDIT</Link> 
                        <Popconfirm
                        title="Ar' U sure?"
                        onConfirm = {() => {
                            deleteutation.mutate(record._id, {
                                onSuccess: ()=>{
                                    // alert("Deleted");
                                }
                            })
                        }}
                        onCancel = {()=>{
                            alert('Canceled');
                        }}
                        okText = "Yes"
                        cancelText = "Cancel"
                        placment = "left"
                        > <a href="/#" style={{marginLeft: 10}}>Delete</a> </Popconfirm>
                    </div>
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
        <div>
            <Link to="/admin/product/new" width="full" textAlign="right"><Button>Add New</Button></Link>
            <Table dataSource={data} columns={dataColumn} rowKey="_id"/>
        </div>
    )
}

export default AdminProducts




