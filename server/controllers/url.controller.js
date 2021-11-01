const jwt_decode = require('jwt-decode')
const Url = require('../models/url.model')
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('../config/keys')

const shortenUrl = async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.baseUrl;

    if(!validUrl.isUri(baseUrl)){
        return res.status(400).send('Invalid base URL.')
    }

    const urlCode = shortid.generate();

    if(validUrl.isUri(longUrl)){
        try{
            let url = await Url.findOne({longUrl})
            if(url) res.json(url)
            else{
                const shortUrl = `${baseUrl}/short/${urlCode}`
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()

                res.json(url)
            }
        }
        catch (err) {
            res.status(500).send('Internal Server Error.')
        }
    }
    else{
        res.status(400).send('Invalid long URL.')
    }
}

const deleteUrl = async (req, res) => {
    console.log(req.params);
    try{
        const url = await Url.deleteOne({ urlCode: req.params.urlCode })
        res.json(url)
    }
    catch (err){
        res.status(500).send('Internal Server Error.')
    }
}

const updateUrl = async (req, res) => {
    const baseUrl = config.baseUrl;
    try{
        let url = await Url.findOne({urlCode: req.params.urlCode})
        if(url) {
            const shortUrl = `${baseUrl}/short/${req.body.newUrlCode}`;
            url.urlCode = req.body.newUrlCode;
            url.shortUrl = shortUrl;
            await url.save();
            res.json(url);
        }
        else{
            res.status(400).send('Invalid URL.')
        }
        
    }
    catch(err) {
        res.status(500).send('Internal Server Error.')
    }
}

const getHistoricUrls = async (req, res) => {
    try{
        const urls = await Url.find({})
        if(urls){
            res.json(urls);
        }
        else{
            res.status(404).send('No historic urls found.')
        }
    }
    catch (err) {
        res.status(500).send('Internal Server Error.')
    }
}

const redirectUrl = async (req, res) => {
    try{
        const token = req.headers.authorization;
        const userData = jwt_decode(token);
        const url = await Url.findOne({urlCode: req.params.code})

        if(url) {
            url.clicks++;
            const urlUniqueVisitors = [...url.uniqueVisitors];
            let userAlreadyExists = false;
            urlUniqueVisitors.forEach((uniqueVisitor) => {
                if(uniqueVisitor === userData.email){
                    userAlreadyExists = true;
                }
            })
            if(!userAlreadyExists){
                urlUniqueVisitors.push(userData.email);
            }
            url.uniqueVisitors = urlUniqueVisitors;
            await url.save()
            res.send(url.longUrl);
        }
        else res.status(404).send('Url not found.')
    }
    catch (err){
        res.status(500).send('Internal Server Error.')
    }
}

const getUrlData = async (req, res) => {
    try {
        const urlData = await Url.findOne({urlCode: req.params.urlCode})

        if(urlData){
            res.json(urlData);
        }
        else res.status(404).send('Url not found.')
    }
    catch (err) {
        res.status(500).send('Internal Server Error.')
    }
}

module.exports = {
    shortenUrl,
    redirectUrl,
    getHistoricUrls,
    getUrlData,
    deleteUrl,
    updateUrl
}