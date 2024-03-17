import React, { useState, useEffect } from 'react';
import './form.css'
// import { useNavigate } from 'react-router-dom';
// import './Navbar.css'; // Asegúrate de tener este archivo CSS
// import Swal from 'sweetalert2';

const CustomForm = (props) => {
    console.log(props)
    const readOnlyProp = props.readOnlyProp;
    var initial_data = {
        start_date: '',
        finish_date: '',
        title: '',
        description: '',
        image: '',
        state: ''
    }
    if (readOnlyProp && props.data) {
        initial_data = props.data;
    }
    const [data, setData] = useState(initial_data);

    const handleInput = (e) => {
        console.log(e)
        let input = e.target.id;
        setData({
            ...data,
            [input]: e.target.value
        })
    }

    const handleCheckBoxInput = (e) => {
        let input = e.target.id;
        setData({
            ...data,
            [input]: e.target.checked
        })
    }

    const handleImageInput = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.nativeEvent.srcElement.files[0]);
        console.log(reader)
        reader.onloadend = function () {
            let input = e.target.id;
            setData({
                ...data,
                [input]: reader.result
            })
        }
    }

    const sendData = () => {
        alert(JSON.stringify(data))
    }

    // useEffect(() => {
    //     async function fechtData() {
    //         console.log("haciendo peticion")
    //         const code = new URLSearchParams(window.location.search).get('code');
    //         const CLIENT_ID = '1218718388809891841';
    //         const CLIENT_SECRET = 'NmMU9hIzlnC18bs3qToZDFAlxg6H1BF8';
    //         let options = {
    //             url: 'https://discord.com/api/oauth2/token',
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    //             body: new URLSearchParams({
    //                 'client_id': CLIENT_ID,
    //                 'client_secret': CLIENT_SECRET,
    //                 'grant_type': 'authorization_code',
    //                 'code': code,
    //                 'redirect_uri': 'http://localhost:5173/principal'
    //             })
    //         }
    //         const data = await fetch('https://discord.com/api/v10/oauth2/token', options);
    //         const response = await data.json();
    //         console.log(response)
    //         const accessToken = response.access_token;
    //         const tokenType = response.token_type;
    //         sessionStorage.setItem("tokenType", tokenType);
    //         sessionStorage.setItem("accessToken", accessToken);
    //         if (!accessToken) {
    //             // window.location.href = '/';
    //         }

    //         fetch('https://discord.com/api/users/@me/guilds', {
    //             headers: {
    //                 authorization: `${tokenType} ${accessToken}`,
    //             },
    //         })
    //             .then(result => result.json())
    //             .then(response => {
    //                 console.log(response);
    //             })
    //             .catch(console.error);

    //         fetch('https://discord.com/api/users/@me', {
    //             headers: {
    //                 authorization: `${tokenType} ${accessToken}`,
    //             },
    //         })
    //             .then(result => result.json())
    //             .then(response => {
    //                 console.log(response);
    //                 const { username, discriminator, avatar, id } = response;
    //                 //set the welcome username string
    //                 setData(response);
    //                 sessionStorage.setItem('userData', JSON.stringify(response));
    //             })
    //             .catch(console.error);
    //     }
    //     if (window.location.pathname === "/principal") {
    //         if (!sessionStorage.getItem("accessToken")) {
    //             fechtData();
    //         }
    //     }

    // }, []);

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [userName, setUserName] = useState('');
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const loggedInUserString = sessionStorage.getItem('userData');
    //     if (!loggedInUserString) {
    //         setIsLoggedIn(false);
    //         setUserName('');
    //     } else {
    //         const loggedInUser = JSON.parse(loggedInUserString);
    //         setIsLoggedIn(true);
    //         setUserName(loggedInUser.name);
    //     }

    // }, [sessionStorage.getItem('userData')]);

    // const handleLogin = () => {
    //     const clientId = '1218718388809891841';
    //     const redirectUri = encodeURIComponent('http://localhost:5173/principal');
    //     const scope = encodeURIComponent('identify guilds');
    //     const authorizationUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fprincipal&scope=guilds+identify`;
    //     window.location.href = authorizationUrl;
    // };

    // const handleLogout = () => {
    //     sessionStorage.clear();
    //     setIsLoggedIn(false);
    //     navigate('/', { replace: true });
    //     Swal.fire({
    //         icon: 'success',
    //         title: '¡Logout!',
    //         text: 'Cierre de sesión existoso.',
    //     });
    // };

    return (
        <>
            <div className="col-12 col-sm-9 col-md-5 mt-3 mb-5 mx-auto">
                <fieldset className="border border-light rounded p-3">
                    {readOnlyProp ? <legend>Edit giveaway</legend> : <legend>Create giveaway</legend>}
                    <div id="reactSignUpForm" className="px-2">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="title" onChange={handleInput} readOnly={readOnlyProp} value={data.title} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" rows="3" onChange={handleInput} readOnly={readOnlyProp} value={data.description}></textarea>
                        </div>

                        {!readOnlyProp && <div className="mb-3">
                            <label htmlFor="avatar" className="form-label">Image</label>
                            <input className="form-control" type="file" id="image" name="avatar" accept="image/png, image/jpeg, image/gif" onChange={handleImageInput} readOnly={readOnlyProp} />
                        </div>}
                        {data.image && <div className="mb-3">
                            <label htmlFor="avatar" className="form-label">Image</label>
                            <img id="blah" src={data.image} alt="your image" style={{ width: '100%' }} />
                        </div>}

                        <div className="mb-3">
                            <label htmlFor="start_date" className="form-label">Start date</label>
                            <input className="form-control" type="date" id="start_date" onChange={handleInput} readOnly={readOnlyProp} value={data.start_date} />
                            <label htmlFor="finish_date" className="form-label">Finish date</label>
                            <input className="form-control" type="date" min={data.start_date} id='finish_date' onChange={handleInput} readOnly={readOnlyProp} value={data.finish_date} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="start_date" className="form-label">Giveaway state</label>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="state" disabled={readOnlyProp} onChange={handleCheckBoxInput} />
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Open</label>
                            </div>
                        </div>
                    </div>

                    {!readOnlyProp && <button type="button" className="btn btn-success" onClick={sendData}>Create</button>}
                </fieldset>
            </div>

        </>
    );
};

export default CustomForm;
