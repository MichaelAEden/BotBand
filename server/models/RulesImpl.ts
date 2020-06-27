import {Rule} from './Rule'
import {Melody} from './Melody'

class LeapRule extends Rule {

    apply(index: Number, changeSet: Set<String>, melody: Melody): Array<String> {
        return new Array<String>();
    }

}