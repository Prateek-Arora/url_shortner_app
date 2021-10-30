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
                const shortUrl = `${baseUrl}/${urlCode}`
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

const redirectUrl = async (req, res) => {
    try{
        const url = await Url.findOne({urlCode: req.params.code})

        if(url) res.redirect(url.longUrl)
        else res.status(404).send('Url not found.')
    }
    catch (err){
        res.status(500).send('Internal Server Error.')
    }
}

module.exports = {
    shortenUrl,
    redirectUrl
}