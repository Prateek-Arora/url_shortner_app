import axios from "axios";
import { GET_HISTORIC_URLS, GET_ERRORS } from "./types";
// Register User
export const shortenUrl = (urlData) => dispatch => {
    axios
        .post("/api/urls/shorten", urlData)
        .then(res => {
            console.log('inside urlActions shortenUrl')
            axios.get("/api/urls")
                .then(urls => {
                    console.log('inside urlActions getAllUrls', urls.data)
                    dispatch(getHistoricUrls(urls.data))
                })
                .catch(err =>
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                );
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const deleteUrl = (urlData) => dispatch => {
    axios
    .delete(`/api/urls/delete/${urlData}`)
    .then(res => {
        console.log(res)
        axios.get("/api/urls")
                .then(urls => {
                    console.log('inside urlActions getAllUrls', urls.data)
                    dispatch(getHistoricUrls(urls.data))
                })
                .catch(err =>
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                );
    })
    .catch( err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
}

export const updateUrl = (urlUpdate, newUrlCode) => dispatch => {
    axios
    .put(`/api/urls/update/${urlUpdate}`, {newUrlCode: newUrlCode})
    .then(res => {
        console.log(res)
        axios.get("/api/urls")
                .then(urls => {
                    console.log('inside urlActions getAllUrls', urls.data)
                    dispatch(getHistoricUrls(urls.data))
                })
                .catch(err =>
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                );
    })
    .catch( err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
}



// export const getAllUrls = () => dispatch => {
//     console.log('inside urlActions getAllUrls')
//     axios.get("/api/urls")
//         .then(urls => {
//             console.log('inside urlActions getAllUrls', urls.data)
//             dispatch(getHistoricUrls(urls.data))
//         })
//         .catch(err =>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             })
//         );
// }
// Get all historic urls
export const getHistoricUrls = (payload) => {
    return {
        type: GET_HISTORIC_URLS,
        payload: payload
    }
}