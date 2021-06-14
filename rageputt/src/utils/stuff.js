export const laskePisteet = (tulokset) => {

    let pisteet = 0
    let dist = 10

    for (var i = 0; i < tulokset.length; i++ ) {
        if (!tulokset[i]) return pisteet
        pisteet += tulokset[i]*dist
        dist = 5+tulokset[i]
    }
    return pisteet
}

export const timestamp2String = (ts) => {
    console.log('Aika: ', ts)
    let aika = new Date(0)
    aika.setUTCMilliseconds(ts)
    console.log(aika)
    return aika.getDate() + "." + (aika.getMonth()+1) + "." + aika.getFullYear() + " " + (aika.getHours()+aika.getTimezoneOffset()/60) + ":" + aika.getMinutes()
}