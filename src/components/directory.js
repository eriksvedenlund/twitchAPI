import React from 'react';
import axios from 'axios';
import { Preloader, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import Header from './header';

export default class Directory extends React.Component {
	constructor(){
		super();

		this.state = {
			topGames: [],
			isLoading: true
		}

	}

	componentDidMount = () => {
		const url = 'https://api.twitch.tv/kraken/games/top/'
		axios.get(url, {
			headers: {
	   			'Client-ID': 'aaf1nw0m0glpzetrm6ddc0vto6ll7f'
	 			}
	 		})
			.then(res => {
				this.setState({
					topGames: res.data.top,
					isLoading: false
				});
			})
		.catch(err => console.error(err))
	}

	renderGames = () => {
		return (
			this.state.topGames.map((item, index) => {
				return(
					<div key={index} className="gameBox">
						<Link to={{ pathname: `/game/${item.game.name}`}}>
							<img src={item.game.box.large} />
						</Link>
						<Link to={{ pathname: `/game/${item.game.name}`}}><p>{item.game.name}</p></Link>
						<div><p><Icon left>visibility</Icon>{item.viewers}</p></div>
					</div>
				);
			})
		);
	}

	render() {
		if(this.state.isLoading === true){
			return(
				<div className="loaderContainer"><Preloader size='big' /></div>
			);
		} else {
			return(
				<div style={{backgroundColor: '#ededed'}}>
					<Header loggedIn={this.props.loggedIn} currentUser={this.props.currentUser}/>
					<h3 style={{textAlign: 'center', margin: '12px 0'}}>Top Games</h3>
					<div className="directoryContainer">
						{this.renderGames()}
					</div>
				</div>
			);
		}
	}
}