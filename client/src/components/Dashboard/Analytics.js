import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { shortenUrl } from "../../actions/urlActions";
import axios from "axios";


const Analytics = (props) => {
    const [urlData, seturlData] = useState({})

    useEffect( () => {
        (async () => {
            const urlDataObject = await axios.get(`/api/urls/data/${props.match.params.url}`);
            seturlData(urlDataObject.data)
            console.log(urlData.uniqueVisitors?.length)
        })()
    },[])
    return (
        <div className="container center-align">
            <div class="row">

                <div class="col s4">
                    <i class="material-icons medium">link</i>
                    <p style={{fontSize: "20px"}}>Link</p>
                    <p style={{fontSize: "20px", color: "#3a90f2"}}>{urlData.shortUrl}</p>
                </div>
                <div class="col s4">
                    <i class="material-icons medium">visibility</i>
                    <p style={{fontSize: "20px"}}>Page Views</p>
                    <p style={{fontSize: "20px"}}>{urlData.clicks}</p>
                </div>
                <div class="col s4">
                    <i class="material-icons medium">face</i>
                    <p style={{fontSize: "20px"}}>Unique Visitors</p>
                    <p style={{fontSize: "20px"}}>{urlData.uniqueVisitors?.length}</p>
                </div>

            </div>
        </div>
    )
}

Analytics.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    shortenUrl: PropTypes.func.isRequired,
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
    { logoutUser, shortenUrl }
)(Analytics);
