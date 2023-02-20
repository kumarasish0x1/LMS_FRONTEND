import { useEffect, useState } from "react";

async function getData(url = '') {
    const response = await fetch(url, {
        credentials: 'include'
    });
    let responseCode = await response.json();
    return responseCode;
}

const Profile = () => {
    let [authenticate, setAuthenticate] = useState(false);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        getData("http://localhost:8000/check-auth")
        .then((response) => {
            console.log(response);
            if (response.status === "success") {
                setAuthenticate(true);
                setLoading(false);
            }
        })
        .catch((err) => {
            setLoading(false);
        })
    }, []);

    let profile = <div>Profile</div>;
    let showError = <div>You are not Authenticate.</div>

    console.log(authenticate);
    if (!loading) {
        if (authenticate) {
            return (
                <>
                    { profile }
                </>
            );
        }
    
        return (
            <>
                { showError }
            </>
        )
    } else {
        return <div>Loading...</div>
    }
}

export default Profile;