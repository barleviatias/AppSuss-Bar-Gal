const { NavLink } = ReactRouterDOM;
export function Home() {
	return (
		<section className="hero-section flex container">
			<img className="hero" src="./assets/img/hero.png" alt="" />
			<div className="content flex">
				<h1>All in one!</h1>
				<p>
					hey we are ChipApp and we are platform to oragnize and manage your life .
					with clean ui and top of the line email system.
					we also provide a hell of a note app that you can keep your 
					importent tasks and improve you productivty
					<br/> <br/>p.s we are small company with 2 employes only please be kind as you check our app 
				</p>
				<div className="flex">
				<NavLink to="/mail"><button className="btn-home">Take me to the Email<span className="material-icons">
email
</span></button></NavLink>
				<NavLink to="/keep"><button>Take me to the Notes<span className="material-icons">
note
</span></button></NavLink>
				</div>
			</div>
		</section>
	);
}
