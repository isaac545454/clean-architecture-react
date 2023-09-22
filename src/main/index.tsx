import { router } from '../presentation/AppRouter';
import { Template } from '../presentation/template';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Template>
			<RouterProvider router={router} />
		</Template>
	</React.StrictMode>,
);
