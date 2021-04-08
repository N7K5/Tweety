let Twit= require("twit")
let config= require("./config")
const pdf_drive= require("./pdf_drive")


let T = new Twit(config)


let ask_yourself_interval= null
let post_quote_interval= null



function post_ask_yourself() {
 
    return new Promise((resolve, reject) => {
        
        pdf_drive.ask_yourself()
        .then(res => {
            let ask_yourself_fonts= [
                "𝒜𝓈𝓀 𝓎𝑜𝓊𝓇𝓈𝑒𝓁𝒻",
                "𝕬𝖘𝖐 𝖞𝖔𝖚𝖗𝖘𝖊𝖑𝖋",
                "ₐₛₖ yₒᵤᵣₛₑₗf",
                "𝗔𝘀𝗸 𝘆𝗼𝘂𝗿𝘀𝗲𝗹𝗳",
                "₳₴₭ ɎØɄⱤ₴ɆⱠ₣",
                "卂丂Ҝ ㄚㄖㄩ尺丂乇ㄥ千",
                "Ⱥʂҟ վօմɾʂҽӀƒ",
                "ᗩSᖽᐸ ᖻᓍᑘᖇSᘿᒪᖴ",
                "𝔸𝕤𝕜 𝕪𝕠𝕦𝕣𝕤𝕖𝕝𝕗"
            ]

            let rand_ask_yourself= ask_yourself_fonts[Math.floor(Math.random() * Math.floor(ask_yourself_fonts.length))]
            let full_status= rand_ask_yourself+" -  " + res

            T.post('statuses/update', { status: full_status }, function(err, data, response) {
                if(data.errors && data.errors[0] && data.errors[0].code == 187) {
                    console.log("\n\t")
                    console.log("\t",res)
                    console.log("\nDuplicate status, searching again...")
                    return post_ask_yourself()
                }
                console.log(data)
                if(err) reject(err)
                resolve(data)
            })
        })
        .catch(err => {
            reject(err)
        })

    })
}


function ask_yourself_after_every_minutes(minutes) {
    
    if(!(minutes>0)) return console.log("Invalid minutes for ask_yourself...")
    if(ask_yourself_interval) {
        clearInterval(ask_yourself_interval)
    }

    let time_in_ms= minutes*60*1000

    ask_yourself_interval= setInterval(post_ask_yourself, time_in_ms)

    console.log("posting ask yourself in every "+minutes+" minutes");
}

function clear_ask_yourself_interval() {
    return new Promise((resolve, reject) => {
        if(!ask_yourself_interval) reject("No ask yourself intervel is set")
        clearInterval(ask_yourself_interval)
        ask_yourself_interval= null
        resolve("cleared ask yourself interval")
    })
}














function post_quote() {
 
    return new Promise((resolve, reject) => {
        
        pdf_drive.get_quote()
        .then(res => {
            
            full_status= res.quote + "  -  "+res.person

            T.post('statuses/update', { status: full_status }, function(err, data, response) {
                if(data.errors && data.errors[0] && data.errors[0].code == 187) {
                    console.log("\n\t")
                    console.log("\t",res)
                    console.log("\nDuplicate quote, searching again...")
                    return post_quote()
                }
                console.log(data)
                if(err) reject(err)
                resolve(data)
            })
        })
        .catch(err => {
            reject(err)
        })

    })
}


function ask_yourself_after_every_minutes(minutes) {
    
    if(!(minutes>0)) return console.log("Invalid minutes for ask_yourself...")
    if(post_quote_interval) {
        clearInterval(post_quote_interval)
    }

    let time_in_ms= minutes*60*1000

    post_quote_interval= setInterval(post_quote, time_in_ms)

    console.log("posting quote in every "+minutes+" minutes");
}







module.exports = {
    post_ask_yourself,
    ask_yourself_after_every_minutes,
    clear_ask_yourself_interval,
    post_quote,

}