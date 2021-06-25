const get_url_parms = (artist,track) => {
      const url_parm_raw = artist + " " + track;
      const url_parm_components = url_parm_raw
        .split("(")[0]
        .split("/")[0]
        .trim()
        .split(" ");
      const remove_elements = ['-']
      let index=0
      url_parm_components.forEach((elem) => {
        remove_elements.forEach((char) => {
          if (elem === char) {
            url_parm_components.splice(index, 1);
          }
        });
        index++;
      });
      for (var i = 0; i < url_parm_components.length; i++) {
        const split_by = ["'", "’", ".", "ʼ", "-"];
        var word = "";
        split_by.forEach((char) => {
          const word_correction = url_parm_components[i].split(char);
          if (i !== 0) {
            word = word_correction.join("").toLowerCase();
          }if(i===0){
            word = word_correction.join("").toLowerCase().charAt(0).toUpperCase() + word_correction.join("").toLowerCase().slice(1);
          }
          url_parm_components[i] = word;
        });

      }
      url_parm_components.push("lyrics");
      let url_parms = url_parm_components.join("-");
      const replace_char = {
        "&": "and",
        "Á": "A",
        "É": "E",
        "Í": "I",
        "Ó": "O",
        "Ú": "U",
        "Ü": "U",
        "Ñ": "N",
        'á': "a",
        "é": "e",
        "í": "i",
        "ó": "o",
        "ú": "u",
        "ü": "u",
        "ñ": "n",
      };
      for(const[key,value] of Object.entries(replace_char)){
        url_parms = url_parms.replace(key,value)
      }
      return url_parms;
      
};

module.exports = get_url_parms
