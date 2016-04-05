import { Model } from 'backbone';

class Bet extends Model{
    constructor(attributes, options){
        super(attributes, options);

        this.url = '/bets';
    }
    
    defaults(){
        return {
            email: '',
            name:'',
            date: '',
            gender: ''
        }
    }

    // TODO Url()

    // TODO Parse()

}

export default Bet;