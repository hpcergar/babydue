import { Model } from 'backbone';

class Bet extends Model{
    constructor(attributes, options){
        super(attributes, options);

        this.url = '/bets?email=' + window.app.conf.EMAIL + '&signature=' + window.app.conf.SIGNATURE;
    }
    
    defaults(){
        return {
            email: '',
            name:'',
            date: '',
            gender: ''
        }
    }

}

export default Bet;