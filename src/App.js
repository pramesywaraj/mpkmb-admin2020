import React from 'react';
import RenderRoutes, { ROUTES } from './routes';

function App() {
	return (
		<div className="App">
			<RenderRoutes routes={ROUTES} />
		</div>
	);
}

export default App;
