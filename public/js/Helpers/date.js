class DateHelper{
    
    static parseStringDate(year, month, day){
        return year
            + '-'
            + DateHelper.strPad(parseInt(month) + 1)
            + '-'
            + DateHelper.strPad(day);
    }
    
    static parseIsoDate(date){
        return date.getFullYear()
            + '-'
            + DateHelper.strPad(date.getMonth() + 1)
            + '-'
            + DateHelper.strPad(date.getDate());
    }

    /**
     * Add one padding 0 if n is less than 2 chars
     * @param n
     * @returns {string}
     */
    static strPad(n){
        n = n.toString();
        return (+n<10) ? '0' + n : n;
    }
}

export default DateHelper;