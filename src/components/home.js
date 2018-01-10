import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './header';

export default class Home extends React.Component {
	constructor(){
		super();

		this.state = {
			topGames: []
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
					topGames: res.data.top
				});
			})
		.catch(err => console.error(err))
	}

	renderGames = () => {
		return (
			this.state.topGames.map((item, index) => {
				return(
					<div key={index}>
						<p>{item.viewers}</p>
						<Link to={{ pathname: '/game', state: { query: item.game.name} }}>{item.game.name}</Link>
					</div>
				);
			})
		);
	}

	render() {
		return(
			<div>
				<Header />
				<h1>home</h1>
				{this.renderGames()}
			</div>
		);
	}
}