const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const urlParams = require('./url_params')
const lyricsFetch = require('./lyrics_fetch')

app.use(bodyParser.json())

app.listen(3000, () => {
    console.log(`Server is Listening on 3000`)
})

app.post('/',(req,res)=>{
    try{    
        const song_data = req.body;
        const artist = song_data.artist,
        track = song_data.track
        console.log('got the parameters');
        const getLyrics = (async ()=>{
            if(artist && track){
                const songUrlParams = urlParams(artist,track);
                const lyrics = await lyricsFetch(songUrlParams)
                console.log('recieved');
                res.send(lyrics)
            }else if(!artist){
                res.send('Parameter missing : Artist')
            }else if(!track){
                res.send('Parameter missing : Track')
            }             
        })()         
    }catch(err){
        res.send(err)
    }
})




