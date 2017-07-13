import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

class LinksListFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showVisible: true
        };
    }
    
    componentWillMount() {
        this.tracker = Tracker.autorun(() => {
            this.setState({
                showVisible: Session.get('showVisible')
            });
        });
    }
    
    componentWillUnmount() {
        this.tracker.stop();
    }
    
    render() {
        return(
            <div>
                <label>
                    <input type='checkbox' checked={!this.state.showVisible} onChange={(e) => {
                        Session.set('showVisible', !e.target.checked);
                    }}/>
                    show hidden links
                </label>
            </div>
        );
    }
}

export default LinksListFilters;

// export default () => {
//     return(
//         <div>
//             <label>
//                 {/* Below allows the text and checkbox to be clickable */}
//                 <input type='checkbox' onChange={(e) => {
//                     Session.set('showVisible', !e.target.checked);
//                 }}/>
//                 show hidden links
//             </label>
//         </div>
//     );
// };