const axios = require('axios')
const cheerio = require('cheerio')

const fetch_url = (url_params)=>{
    const url = `https://genius.com/${url_params}`
    return new Promise((resolve,reject)=>{
        try{
            const fetching = (async ()=>{
                const response = await axios.get(url,{
                    headers : {
                        "User-Agent" : 'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3B48b Safari/419.3'
                    }
                })
                console.log('fetching lyrics');
                resolve(response.data);                
            })()
        }
        catch(err){
            reject(new Error('Page not found'))
        }        
    })
   
}

const DOMparse = async (url_parms) =>{
    const dom = await fetch_url(url_parms)

    try{
        const $ = cheerio.load(dom);

        const lyrics_complete = []; //accumulator for lines of lyrics
        const lyrics_block = $(".lyrics");
        if(lyrics_block[0]){
        let lyric_line = "";
        lyrics_block[0].children[3].children.forEach((line) => {
            if (line.type === "text") {
            lyric_line = lyric_line + line.data;
            } else if (line.type === "tag" && line.name !== "br") {
            line.children.forEach((item) => {
                if (item.type === "text") {
                lyric_line = lyric_line + item.data;
                }else if(item.type==='tag' && item.name!=='br'){
                item.children.forEach((item)=>{
                    if(item.type==='text'){
                    lyric_line = lyric_line + item.data;
                    }
                })
                }else{
                lyrics_complete.push(lyric_line);
                lyric_line = "";
                }
            });
            } else {
            lyrics_complete.push(lyric_line);
                lyric_line = ''
            }
        });   
        }else{
            lyrics_complete.push('Could not find lyrics for this song')
        }
        const lyrics = lyrics_complete.join('')//convert array to string 
        console.log('fetched');
        return lyrics   
    }catch(err){
        console.log(err);
        return 'Lyrics of this song could not be found'
    }
}

module.exports = DOMparse