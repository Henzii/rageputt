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
        statsit.putteja[etaisyys] += 5
        statsit.puttejaTotal += 5

        statsit.puttejaSisaan[etaisyys] += tulokset[i]
        statsit.puttejaTotalSisaan += tulokset[i]
        etaisyys = tulokset[i]
    }
    console.log(statsit)
    return statsit
}

export const timestamp2String = (ts) => {
    console.log('Aika: ', ts)
    let aika = new Date(0)
    aika.setUTCMilliseconds(ts)
    console.log(aika)
    return aika.getDate() + "." + (aika.getMonth()+1) + "." + aika.getFullYear() + " " + (aika.getHours()+aika.getTimezoneOffset()/60) + ":" + aika.getMinutes()
}