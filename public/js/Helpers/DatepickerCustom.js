import $ from 'jquery';
import jquery from 'jquery';
import 'jquery-ui';

jquery.datepicker._updateDatepicker_original = jquery.datepicker._updateDatepicker;
jquery.datepicker._updateDatepicker = function(inst) {
    jquery.datepicker._updateDatepicker_original(inst);
    var afterShow = this._get(inst, 'afterShow');
    if (afterShow)
        afterShow.apply((inst.input ? inst.input[0] : null));  // trigger custom callback
};


//Monkey patching how they pick day
jquery.datepicker._selectDay = function(id, month, year, td) {
    var inst,
        target = $(id);

    if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
        return;
    }

    inst = this._getInst(target[0]);

    // Modified
    inst.selectedDay = inst.currentDay = $("a", td).html().replace(/(<([^>]+)>)/ig, "").replace(/(\r\n|\n|\r)/gm, "");
    
    inst.selectedMonth = inst.currentMonth = month;
    inst.selectedYear = inst.currentYear = year;
    this._selectDate(id, this._formatDate(inst,
        inst.currentDay, inst.currentMonth, inst.currentYear));
};

window.$ = $;
window.jquery = jquery;

module.exports = jquery.datepicker;
