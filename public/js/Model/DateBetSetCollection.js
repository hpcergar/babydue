import {Collection} from 'backbone';
import DateBetSet from 'Model/DateBetSet';


class DateBetSetCollection extends Collection{

    constructor(models, options){
        super(models, options);

        this.url = '/bets';

        this.model = DateBetSet;
    }


    /**
     * Find a Bet by a given email
     * 
     * @param email
     * @returns {null|Bet}
     */
    findBetByEmail(email){
        var found = null;
        
        // Capture first and store in found bet model
        this.findWhere(function(dateBetSet){
            var bet = dateBetSet.findBetByEmail(email);
            if(bet != undefined){
                found = bet;
            }
            return bet != undefined;
        });
        
        return found;
    }

    /**
     * Return DataBetSet found for a date
     * Alias for findWhere
     *
     * @param date
     * @returns DateBetSet
     */
    findByDate(date){
        return this.findWhere({date:date});
    }

    // Parse from server
    parse(response){

        for(var key in response){
            if(response.hasOwnProperty(key)){
                this.push({date: key});

                // Loop over bets
                for(var gender in response[key]){
                    if(response[key].hasOwnProperty(gender)){
                        // Add model Bet
                        this.last().get('betCollection').push({date: key, email: response[key][gender], gender: gender});
                    }
                }
            }
        }

        return {};
    }

}


export default new DateBetSetCollection();
