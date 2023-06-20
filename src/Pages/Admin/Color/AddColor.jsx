import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from '../../../Components/utils/Notifications/Notifications'
import { ReactNotifications } from 'react-notifications-component'
import Loader from '../../../Components/utils/Loader/Loader'
import Color from 'color';
const AddColor = () => {
    let [color, setColor] = useState({
        name: "",
    })
    let [loading, setLoading] = useState(false)

    const { name } = color;

    const handleChange = (e) => {
        setColor((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const addColor = async (e) => {
        e.preventDefault()
        try {
            if (name) {
                const s = new Option().style;
                s.color = name;
                if (s.color !== '') {
                    setLoading(true)
                    await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/addColor`, color, { withCredentials: true });
                    setLoading(false)
                    setColor({
                        name: "",
                    })
                    Notification('Success', 'Color Created Successfully', 'success')
                } else {
                    Notification('Error', 'Enter a valid css color.', 'danger')
                }
            } else {
                Notification('Error', 'Enter Both Fields', 'danger')
            }
        } catch (error) {
            setLoading(false)
            Notification('Error', error?.response?.data?.message, 'danger')
        }
    }

    return (
        <div>
            <ReactNotifications />
            <div className="header">
                <h1 className="text-center text-black">Add Color</h1>
            </div>
            <div className="container-fluid">
                {loading ? <Loader /> : <form>
                    <div className="mb-3">
                        <label className="form-label">Color Name</label>
                        <input type="text" className="form-control" onChange={handleChange} value={name} name="name" required />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={addColor}>Add Color</button>
                    <Link to="/admin/colors">
                        <button type="submit" className="btn btn-primary ms-5">Go Back</button>
                    </Link>
                </form>}
            </div></div>
    )
}

export default AddColor