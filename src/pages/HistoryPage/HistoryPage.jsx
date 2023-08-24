import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import './HistoryPage.css'
import Axios from '../../api/Axios'
import Navbar from "../../components/Navbar/Navbar"
import Banner from "../../components/Banner/Banner"
import Footer from "../../components/Footer/Footer"
import { formatPrice } from "../../utils/utils"
import { DELIVERY_STATUS, PAYMENT_STATUS } from "../../constants/orderStatus"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

const HistoryPage = () => {
    const { userId } = useParams()
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()
    const navigate = useNavigate()

    const getHistory = async (page) => {
        try {
            const res = await Axios.get(`/order/user/${userId}?page=${page}`)
            if (res.status === 200) {
                setData(res.data.results)
                setTotalPage(res.data.total_pages)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getHistory(page)
        // eslint-disable-next-line
    }, [])

    const onHandlePage = (e) => {
        if (page === 0) return;
        let newPage
        if (e === 'next') {
            newPage = page + 1
            setPage(newPage)
        } else {
            newPage = page - 1
            setPage(newPage)
        }
        getHistory(newPage)
    }

    const formatStatus = (status, type) => {
        if (type === 'payment') {
            switch (status) {
                case 'pending':
                    return PAYMENT_STATUS.PENDING
                case 'done':
                    return PAYMENT_STATUS.DONE

                case 'failed':
                    return PAYMENT_STATUS.FAILED
                default:
                    return PAYMENT_STATUS.PENDING
            }
        } else {
            switch (status) {
                case 'pending':
                    return DELIVERY_STATUS.PENDING
                case 'done':
                    return DELIVERY_STATUS.DONE

                case 'failed':
                    return DELIVERY_STATUS.FAILED
                default:
                    return DELIVERY_STATUS.PENDING
            }
        }
    }

    return (<div>
        <Navbar />
        <Banner type="history" />
        {data.length ? (
            <div className="container history-page">
                <table>
                    <thead>
                        <tr>
                            <th className="w-15">ID ORDER</th>
                            <th className="w-15">ID USER</th>
                            <th className="w-10">NAME</th>
                            <th className="w-10">PHONE</th>
                            <th className="w-15">ADDRESS</th>
                            <th className="w-10">TOTAL</th>
                            <th className="w-10">DELIVER</th>
                            <th className="w-10">STATUS</th>
                            <th className="w-5">DETAIL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((v, i) => {
                            return (
                                <tr className="order-list-item" key={i}>
                                    <td className="w-15">{v._id}</td>
                                    <td className="w-15">{v.userId}</td>
                                    <td className="w-10">{v.formData.fullname}</td>
                                    <td className="w-10">{v.formData.phone}</td>
                                    <td className="w-15">{v.formData.address}</td>
                                    <td className="w-10">{formatPrice(v.totalPrice)}</td>
                                    <td className="w-10">{formatStatus(v.deliveryStatus, 'delivery')}</td>
                                    <td className="w-10">{formatStatus(v.paymentStatus, 'payment')}</td>
                                    <td className="w-5 action">
                                        <p onClick={() => navigate(`/order-detail/${v._id}`)}>
                                            View  &nbsp;<FontAwesomeIcon icon={faArrowRight} />
                                        </p>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                {page + "-" + totalPage + " of " + totalPage}
                            </td>
                            <td>
                                <div className='d-flex justify-content-evenly action'>
                                    {page !== 1 && <FontAwesomeIcon className='icon' onClick={() => onHandlePage('back')} icon={faChevronLeft} />}
                                    {page !== totalPage && <FontAwesomeIcon className='icon' onClick={() => onHandlePage('next')} icon={faChevronRight} />}
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        ) : (<h1 className="text-center">You dont have any order.</h1>)}
        <Footer />
    </div>)
}

export default HistoryPage