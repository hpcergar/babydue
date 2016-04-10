import {Collection} from 'backbone';
import Backbone from 'Security/BackboneBet';
import Bet from 'Model/Bet';


class BetCollection extends Collection{

    constructor(models, options){
        super(models, options);

        this.url = '/bets';

        this.model = Bet;
    }

    /**
     * Get bet by given email
     * 
     * @param email
     * @returns Bet
     */
    findBetByEmail(email){
        return this.findWhere({email: email});
    }
    
    findBetByGender(gender){
        return this.findWhere({gender: gender});
    }

}


export default BetCollection;
