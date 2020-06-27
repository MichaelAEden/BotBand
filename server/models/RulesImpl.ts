import {Rule} from './Rule'
import {Melody} from './Melody'

export class LeapRule extends Rule {

    apply(index: Number, changeSet: Array<String>, melody: Melody): Array<String> {
        
        if (index < 2) {
            return changeSet;
        } else {

            // Make sure it's not 2 leaps (delta is same)
            // Make sure the previous thing is not a recovery (delta is different)

        }

        return new Array<String>();
    }

}