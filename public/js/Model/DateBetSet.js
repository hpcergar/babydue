import {Model} from 'backbone';
import BetCollection from 'Model/BetCollection';

class DateBetSet extends Model{
    defaults(){
        return {
            // Bets by single date
            date: '',
            
            // Every bet in this date
            betCollection: new BetCollection()
        };
    }

    /**
     * 
     * 
     * @param email
     * @returns {*|Bet}
     */
    findBetByEmail(email){
        return this.get('betCollection').findBetByEmail(email);
    }
}

export default DateBetSet;