import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MyBookings = () => {
  const { axios, user, currency } = useAppContext()
  const [bookings, setBookings] = useState([])
  const fetchMyBookings = async ()=>{
    try {
      const {data} = await axios.get('/api/bookings/user')
      if(data.success){
        setBookings(data.bookings)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    user && fetchMyBookings()
  },[user])

  return (
    <div className='px-6 md:px-16 lg:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>
      <Title title='My Bookings'
      subTitle='View and manage your all car bookings'
      align="left" />

      <div>
        {bookings.map((bookings, index)=>(
          <div key = {bookings._id} className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12'>
            {/* car image + info */}
            <div className='md:col-span-1'>
              <div className='rounded-md overflow-hidden mb-3'>
                <img src={bookings.car.image} alt="" className='w-full h-auto aspect-video object-cover'/>
                <p className='text-lg font-medium mt-2'>{bookings.car.brand} {bookings.car.model}</p>

                <p className='text-gray-500'>{bookings.car.year} . {bookings.car.category} . {bookings.car.location}</p>
              </div>
            </div>

            {/* Booking info */}
            <div className='md:col-span-2'>
              <div className='flex items-center gap-2'>
                <p className='px-3 py-1.5 bg-light rounded'>Booking #{index+1}</p>
                <p className={`px-3 py-1 text-xs rounded-full ${bookings.status === 'confirmed' ? 'bg-green-400/15 text-green-600' : 'bg-red-400/15 text-red-600'}`}>{bookings.status}</p>
              </div>

              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-1'/>
                <div>
                  <p className='text-gray-500'>Rental Period</p>
                  <p>{bookings.pickupDate.split('T')[0]} To {bookings.returnDate.split('T')[0]}</p>
                </div>
              </div>

              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-1'/>
                <div>
                  <p className='text-gray-500'>Pickup Location</p>
                  <p>{bookings.car.location}</p>
                </div>
              </div>
            </div>
            {/* Price */}
            <div className='md:col-span-1 flex flex-col justify-between gap-6'>
              <div className='text-sm text-gray-500 text-right'>
                <p>Total Price</p>
                <h1 className='text-2xl font-semibold text-primary'>{currency}{bookings.price}</h1>
                <p>Booked on {bookings.createdAt.split('T')[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings
