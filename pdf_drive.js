
const fetch = require('node-fetch');


function ask_yourself() {
    return new Promise((resolve, reject) => {
        fetch("https://www.pdfdrive.com/home/askYourself")
        .then(res => res.text())
        .then(res => {
            let p_2= res.split("</strong>")
            if(p_2.length != 2) {
                reject("got "+res+" as responce.. cant split")
            }
            let p_3= p_2[1].split("<a href")
            if(p_3.length < 2 ) {
                reject("got "+res+" as responce.. cant split")
            }
            let quote= p_3[0]
            resolve(quote)
        })
        .catch(e => {
            reject(e)
        })
    })
}



function get_quote() {
    return new Promise((resolve, reject) => {
        fetch("https://www.pdfdrive.com")
        .then(res => res.text())
        .then(res => {
            let p_2= res.split(`class="quotes">`)
            if(p_2.length != 2) {
                reject("got "+res+" as responce.. cant split")
            }
            let p_3= p_2[1].split("―")
            if(p_3.length < 2 ) {
                reject("got "+res+" as responce.. cant split")
            }
            let quote= p_3[0]
            let m_2= p_3[1].split("<strong>")
            if(m_2.length < 2 ) {
                reject("got "+res+" as responce.. cant split")
            }
            let m_3= m_2[1].split("</strong>")
            if(m_3.length < 2 ) {
                reject("got "+res+" as responce.. cant split")
            }
            let person= m_3[0]
            resolve({
                quote,  
                person
            })
        })
        .catch(e => {
            reject(e)
        })
    })
}


module.exports = {
    ask_yourself,
    get_quote,

}