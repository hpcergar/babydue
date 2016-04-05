import {Collection} from 'backbone';
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

}


export default BetCollection;
