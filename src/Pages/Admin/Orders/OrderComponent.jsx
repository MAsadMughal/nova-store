import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const OrderComponent = ({ item, changeStatus, deleteOrder }) => {
    const [disabled, setDisable] = useState(true)
    const [status, setStatus] = useState(item?.status)
    const [changed, setChanged] = useState(false)

    return (

        <div className={window.innerWidth >= 600 ? `col` : `row`}>
            <div className="card">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img style={{ maxHeight: "200px" }} src={item?.products[0]?.product?.images[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"} alt="Product" className="img-fluid" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Order #{item._id}</h5>
                            <h5 className="card-title">Ordered By User <p>({item?.user?.name})</p></h5>
                            <p className="card-text">Ordered At: {new Date(item?.createdAt).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}</p>
                            <p className="card-text">Status: {item?.status}</p>
                            <p className="card-text">Total: ${item?.total * 0.1 + item?.total + 10}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <Link to={`/admin/orderDetail/${item?._id}`}>
                                    <button className="btn btn-primary">View Details</button>
                                </Link>
                                <button className="btn btn-danger" onClick={() => deleteOrder(item._id)}>Delete</button>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-1">
                                <select disabled={disabled} name='category' value={status} onChange={(e) => { setStatus(e.target.value); setChanged(true) }} className={window.innerWidth >= 400 ? 'signupInput me-2' : 'p-2 me-2'} >
                                    {
                                        ['Processing', 'Shipped', 'Delivered', 'Returned']?.map((i, key) => {
                                            return (
                                                <option key={key} value={i}>{i}</option>)
                                        })
                                    }
                                </select>
                                <button className="btn btn-info text-light mt-2" onClick={disabled ? () => setDisable(false) : changed ? () => { changeStatus(item._id, status); setDisable(true); } : (!disabled) ? () => setDisable(true) : null}>{disabled ? `Status` : `Submit`}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default OrderComponent