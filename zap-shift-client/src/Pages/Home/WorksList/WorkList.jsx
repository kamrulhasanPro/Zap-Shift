import React from 'react';
import icon from '../../../assets/bookingIcon.png'
import MyContainer from '../../../Components/MyContainer';

const WorkList = () => {
    const listOfWorks = [
        {
            title: 'Booking Pick & Drop',
            description:  "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            title: 'Cash On Delivery',
            description:  "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            title: 'Delivery Hub',
            description:  "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            title: 'Booking SME & Corporate',
            description:  "From personal packages to business shipments — we deliver on time, every time."
        },
    ]
    return (
        <MyContainer>
            {/* title */}
            <h3 className='text-3xl font-extrabold text-secondary mb-8'>How it Works</h3>

            <div className='grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                listOfWorks.map((list, i) => (
                    <div key={i} className='p-5 rounded-xl bg-base-200 space-y-4'>
                        <figure>
                            <img src={icon} alt="" />
                        </figure>
                        <div>
                            <h4 className='text-xl font-bold mb-2 text-secondary'>{list.title}</h4>
                            <p className='text-secondary-content'>{list.description}</p>
                        </div>
                    </div>
                ))
            }
            </div>
        </MyContainer>
    );
};

export default WorkList;