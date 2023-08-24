import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import './OrderDetailPage.css'
import Navbar from "../../components/Navbar/Navbar"
import Banner from "../../components/Banner/Banner"
import Footer from "../../components/Footer/Footer"
import Axios from "../../api/Axios"
import { formatPrice, isEmptyObject } from "../../utils/utils"
import { baseImgUrl } from "../../constants/baseImgUrl"


const OrderDetailPage = () => {
    const { id } = useParams()
    const [data, setData] = useState({})

    const getOrder = async () => {
        try {
            const res = await Axios.get(`/order/detail/${id}`)
            if (res.status === 200) {
                setData(res.data)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getOrder()
        // eslint-disable-next-line
    }, [])

    return (<div>
        <Navbar />
        <Banner type="Order Detail" />
        <div className="container">
            {!isEmptyObject(data) &&
                <div className="order-detail-page">
                    <div>
                        <h1>INFORMATION ORDER</h1>
                        <p>ID User: {data.userId}</p>
                        <p>Full Name: {data.formData.fullname}</p>
                        <p>Phone: {data.formData.phone}</p>
                        <p>Address: {data.formData.address}</p>
                        <p>Total: {formatPrice(data.totalPrice)}</p>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID PRODUCT</th>
                                    <th>IMAGE</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>COUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.cart.map((v, i) => {
                                    return (
                                        <tr className="order-detail-list-item" key={i}>
                                            <td>{v.item._id}</td>
                                            <td><img src={`${baseImgUrl}/${v.item.images[0]}`} alt={v.item.name} /></td>
                                            <td>{v.item.name}</td>
                                            <td>{formatPrice(v.item.price)}</td>
                                            <td>{v.amount}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
        <Footer />
    </div>)
}

export default OrderDetailPage