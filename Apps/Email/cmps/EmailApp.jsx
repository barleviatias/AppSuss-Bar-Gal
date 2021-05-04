import { emailService } from '../../../services/email-service.js';
export class EmailApp extends React.Component {
	state = {};
	componentDidMount() {
        console.log("mounting");
		emailService.query();
	}
    render(){
        return <h1>email APP</h1>
    }
}
