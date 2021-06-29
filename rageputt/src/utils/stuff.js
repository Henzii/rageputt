
export const laskePisteet = (tulokset) => {

    let pisteet = 0
    let dist = 10
    for (var i = 0; i < tulokset.length; i++ ) {
        if (tulokset[i] === null) return pisteet
        pisteet += tulokset[i]*dist
        dist = 5+tulokset[i]
    }
    return pisteet
}

export const tulokset2ChartData = (tulokset = [], palautus = [
        { dist: '5m', putteja: 0, puttejaSisaan: 0, prossa: 0 },
        { dist: '6m', putteja: 0, puttejaSisaan: 0, prossa: 0 },
        { dist: '7m', putteja: 0, puttejaSisaan: 0, prossa: 0 },
        { dist: '8m', putteja: 0, puttejaSisaan: 0, prossa: 0},
        { dist: '9m', putteja: 0, puttejaSisaan: 0, prossa: 0},
        { dist: '10m', putteja: 0, puttejaSisaan: 0, prossa: 0 } ]) => {

    for (let i=0; i < tulokset.length; i++) {
        if (tulokset[i] === null) return
        const etaisyys = (i !== 0) ? tulokset[i-1] : 5

        palautus[etaisyys].putteja += 5
        palautus[etaisyys].puttejaSisaan += tulokset[i]
        palautus[etaisyys].prossa = palautus[etaisyys].puttejaSisaan / palautus[etaisyys].putteja * 100
    }
    return palautus
}
export const timestamp2String = (ts) => {
    let aika = new Date(0)
    aika.setUTCMilliseconds(ts)
    const tunti = aika.getHours()+aika.getTimezoneOffset()/60
    const minsat = aika.getMinutes()
    return aika.getDate() + "." + (aika.getMonth()+1) + "." + aika.getFullYear() + " " + 
        ((tunti < 10) ? '0'+tunti : tunti) + ":" + 
        ( (aika.getMinutes() < 10) ? '0'+minsat : minsat)
}