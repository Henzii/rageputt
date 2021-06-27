import { Popper } from "@material-ui/core"

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
export const statistiikat = (tulokset) => {
    let statsit = {
        putteja: [0,0,0,0,0,0],
        puttejaSisaan: [0,0,0,0,0,0],
        puttejaTotal: 0,
        puttejaTotalSisaan: 0
    }
    let etaisyys = 5
    for (var i=0; i< tulokset.length; i++) {
        if (tulokset[i] === null) continue
        statsit.putteja[etaisyys] += 5
        statsit.puttejaTotal += 5

        statsit.puttejaSisaan[etaisyys] += tulokset[i]
        statsit.puttejaTotalSisaan += tulokset[i]
        etaisyys = tulokset[i]
    }
    return statsit
}
export const mergeStatsit = (eka, toka) => {
    let palautus = {
        putteja: [0,0,0,0,0,0],
        puttejaSisaan: [0,0,0,0,0,0],
        puttejaTotal: 0,
        puttejaTotalSisaan: 0
    }
    if (toka === null) toka = palautus
    for( var i=0;i<6; i++) {
        palautus.putteja[i] = eka.putteja[i] + toka.putteja[i]
        palautus.puttejaSisaan[i] = eka.puttejaSisaan[i] + toka.puttejaSisaan[i]
    }
    palautus.puttejaTotal = eka.puttejaTotal + toka.puttejaTotal
    palautus.puttejaTotalSisaan = eka.puttejaTotalSisaan + toka.puttejaTotalSisaan

    return palautus
}
export const tulokset2ChartData = (tulokset) => {
    const palautus = [
        { dist: '5m', putteja: 0, puttejaSisaan: 0, prossa: 0 },
        { dist: '6m', putteja: 0, puttejaSisaan: 0, prossa: 0 },
        { dist: '7m', putteja: 0, puttejaSisaan: 0, prossa: 0 },
        { dist: '8m', putteja: 0, puttejaSisaan: 0, prossa: 0},
        { dist: '9m', putteja: 0, puttejaSisaan: 0, prossa: 0},
        { dist: '10m', putteja: 0, puttejaSisaan: 0, prossa: 0 }
    ]
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
    console.log('Aika: ', ts)
    let aika = new Date(0)
    aika.setUTCMilliseconds(ts)
    console.log(aika)
    return aika.getDate() + "." + (aika.getMonth()+1) + "." + aika.getFullYear() + " " + (aika.getHours()+aika.getTimezoneOffset()/60) + ":" + aika.getMinutes()
}