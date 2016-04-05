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

window.$ = $;
window.jquery = jquery;

module.exports = jquery.datepicker;
