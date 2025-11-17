import React from 'react';
import MySection from '../../Components/MySection';
import errorPng from '../../assets/error.png'
import { useNavigate } from 'react-router';

const NotFoundPage = () => {
    const navigate = useNavigate()
    return (
        <MySection className={"flex flex-col items-center justify-center"}>
            <figure>
                <img src={errorPng} alt="" />
            </figure>
            <button onClick={() => navigate('/')} className='my_btn'>Go Home</button>
        </MySection>
    );
};

export default NotFoundPage;