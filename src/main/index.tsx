import React from 'react';
import ReactDOM from 'react-dom/client';
import '../presentation/style/index.css';
import { router } from '../presentation/AppRouter';
import { RouterProvider } from 'react-router-dom';
import { Template } from '../presentation/template';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Template>
			<RouterProvider router={router} />
		</Template>
	</React.StrictMode>,
);
