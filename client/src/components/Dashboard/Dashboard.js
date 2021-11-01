import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "../Layout/Modal/Modal"
import { logoutUser } from "../../actions/authActions";
import { shortenUrl, deleteUrl, updateUrl } from "../../actions/urlActions";
import axios from "axios";


const Dashboard = (props) => {
    const [longUrl, setlongUrl] = useState("")
    const [editUrl, seteditUrl] = useState("")
    const [urls, seturls] = useState({})
    const [show, setShow] = useState(false);
    const [updateUrl, setupdateUrl] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        (async () => {
            const urlData = await axios.get('/api/urls');
            seturls({ urls: urlData.data })
        })()
    }, [])

    useEffect(() => {
        seturls(props.urls)
    }, [props.urls])

    console.log(urls)

    // useEffect(() => {
    //     console.log(urls)
    // })

    // useEffect(async () => {
    //     await props.getAllUrls();
    //     seturls(props.urls)
    // }, [props.urls])

    const handleLongUrlChange = (e) => {
        setlongUrl(e.target.value)
    }

    const handleEditUrlChange = (e) => {
        seteditUrl(e.target.value)
    }


    const onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
    };

    const handleUrlUpdateClick = (urlCode) => {
        setupdateUrl(urlCode);
        handleShow()
    }

    const handleUrlUpdate = (e) => {
        // e.preventDefault()
        props.updateUrl(updateUrl, editUrl);
    }

    const handleUrlDelete = (urlCode) => {
        props.deleteUrl(urlCode)
    }


    const handleLongUrlSubmit = async (e) => {
        // e.preventDefault()
        const newUrl = {
            longUrl: longUrl
        };
        await props.shortenUrl(newUrl);
        console.log(props.urls)
        // seturls(props.urls)
    }

    const { user } = props.auth;
    return (
        <div style={{ height: "90vh" }} className="container center-align">
            <div className="row">
                <div className="col s12">
                    <div style={{ width: "80%", marginTop: "4rem" }} className="container center-align">

                        <Modal show={show} modalClose={handleClose} style={{ marginTop: "-760px" }}>
                            <div>
                                <div style={{borderBottom: "1px solid #9e9e9e"}} className="left-align">
                                    <span style={{fontSize: "18px"}}>Edit URL</span>
                                </div>
                                <form noValidate onSubmit={(e) => handleUrlUpdate(e)} style={{height: "70px", padding: "20px"}}>
                                    <div class="col s6 offset-s2">
                                        <input className="form control form-control-lg" type="text" id="editUrl" placeholder="URL" aria-label=".form-control-lg example" value={editUrl} onChange={(e) => handleEditUrlChange(e)} />
                                    </div>
                                    <div class="col s3">
                                        <button
                                            style={{
                                                width: "120px",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px",
                                                marginTop: "1rem",
                                            }}
                                            type="submit"
                                            className="btn waves-effect waves-light hoverable green lighten-1"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Modal>
                        <form noValidate onSubmit={(e) => handleLongUrlSubmit(e)} >
                            <div class="col s6 offset-s2">
                                <input className="form control form-control-lg" type="text" id="longUrl" placeholder="URL" aria-label=".form-control-lg example" value={longUrl} onChange={(e) => handleLongUrlChange(e)} />
                            </div>
                            <div class="col s3">
                                <button
                                    style={{
                                        width: "120px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem",
                                    }}
                                    type="submit"
                                    className="btn waves-effect waves-light hoverable green lighten-1"
                                >
                                    Shorten
                                </button>
                            </div>
                        </form>
                        <table className="highlight">
                            <thead>
                                <tr>
                                    <th>Long URL</th>
                                    <th>Short URL</th>
                                    <th>Analytics</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {urls.urls?.map((urlData) => (
                                    <tr>
                                        <td><a href={urlData.longUrl} target="_blank" style={{ color: 'black' }} className="hoverable">{urlData.longUrl}</a></td>
                                        <td><a href={urlData.shortUrl} target="_blank" className="hoverable">{urlData.shortUrl}</a></td>
                                        <td><Link style={{ color: '#026CA5' }} exact to={`/dashboard/analytics/${urlData.urlCode}`} ><i class="material-icons">insights</i></Link></td>
                                        <td><button className="btn-flat" onClick={(e) => { handleUrlUpdateClick(urlData.urlCode) }}><i class="material-icons" style={{ color: '#118003' }}>edit</i></button> </td>
                                        <td><button className="btn-flat" onClick={(e) => handleUrlDelete(urlData.urlCode)}><i class="material-icons" style={{ color: '#a60e03' }}>delete</i></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    <button
                        style={{
                            width: "120px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "14rem"
                        }}
                        onClick={(e) => onLogoutClick(e)}
                        className="btn waves-effect waves-light hoverable blue accent-3"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    shortenUrl: PropTypes.func.isRequired,
    deleteUrl: PropTypes.func.isRequired,
    updateUrl: PropTypes.func.isRequired,
    // getAllUrls: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    urls: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    urls: state.urls
});
export default connect(
    mapStateToProps,
    { logoutUser, shortenUrl, deleteUrl, updateUrl }
)(Dashboard);
