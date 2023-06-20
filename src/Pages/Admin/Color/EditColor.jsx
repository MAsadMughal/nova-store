import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Notification from '../../../Components/utils/Notifications/Notifications'
import { ReactNotifications } from 'react-notifications-component'
import Loader from '../../../Components/utils/Loader/Loader'

const EditColor = () => {
    const { id } = useParams()
    let [loading, setLoading] = useState(false)
    let [color, setColor] = useState({
        name: "",
    })

    useEffect(() => {
        getColor();
    }, [])

    const getColor = async () => {
        setLoading(true);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/color/${id}`);
        setColor(data);
        setLoading(false);

    }

    const { name } = color;

    const handleChange = (e) => {
        setColor((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const Navigate = useNavigate();

    const editColor = async (e) => {
        e.preventDefault()
        try {
            if (name) {
                const s = new Option().style;
                s.color = name;
                if (s.color !== '') {
                    setLoading(true)
                    await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/color/${id}`, { name });
                    setLoading(false)
                    Notification('Success', 'Color Updated Successfully', 'success')
                    setColor({
                        name: "",
                    })
                    setTimeout(() => {
                        Navigate('/admin/colors')
                    }, 2000);
                } else {
                    Notification('Error', 'Enter a valid css color.', 'danger')
                }
            } else {
                Notification('Error', 'Enter Complete Information', 'danger')
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
                <h1 className="text-center text-black">Edit Color</h1>
            </div>
            {loading ? <Loader /> :
                <div className="container">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Color Name</label>
                            <input type="text" className="form-control" onChange={handleChange} value={name} name="name" required />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={editColor}>Update Color</button>
                        <Link to="/admin/colors">
                            <button type="submit" className="btn btn-primary ms-5">Go Back</button>
                        </Link>
                    </form>
                </div>}</div>
    )
}

export default EditColor