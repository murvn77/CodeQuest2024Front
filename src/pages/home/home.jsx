import React from "react";
import './home.css';
import CustomForm from "../../components/form/form";

const Home = () => {
    return (
        <>
            <div>
                <CustomForm readOnlyProp={true} data={
                    {
                        start_date: '2024-03-17',
                        finish_date: '2024-03-18',
                        title: 'Test',
                        description: 'Desc',
                        image: '',
                    }
                }></CustomForm>
            </div>
        </>
    )
}

export default Home;