import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import AddNew from '../components/AddNew';
import Dasboard from '../components/Dasboard';
import Phone from '../components/Phone';
import Upload from '../components/Upload';
import View from '../components/ViewWrapper';
import CompanyDetails from '../components/CompanyDetails';
import CompanyEdit from '../components/CompanyEdit';
import CompanyNotBranded from '../components/CompanyNotBranded';
import CompanyBranded from '../components/CompanyBranded';
import Login from '../components/Login';
import Register from '../components/Register';
import PhoneDetails from '../components/PhoneDetails';
import Changes from '../components/Changes';
import PureCallerId from '../components/PureCallerId';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/dashboard',
				element: <Dasboard />
			},
			{
				path: '/add-new',
				element: <AddNew />
			},
			{
				path: '/view',
				element: <View />,
				children: [
					{
						path: '/view/:id',
						element: <CompanyDetails />,
						children: [
							{
								path: '/view/:id/edit',
								element: <CompanyEdit />
							},
							{
								path: '/view/:id/not-branded',
								element: <CompanyNotBranded />
							},
							{
								path: '/view/:id/branded',
								element: <CompanyBranded />
							}
						]
					}
				]
			},
			{
				path: '/phone',
				element: <Phone />,
				children: [
					{
						path: '/phone/:id',
						element: <PhoneDetails />
					}
				]
			},
			{
				path: '/Upload',
				element: <Upload />
			},
			{
				path: '/logout',
				element: <Phone />
			},
			{
				path: '/changes',
				element: <Changes />
			},
			{
				path: '/pure-caller-id',
				element: <PureCallerId />
			},
		]
	},
	{
		path: '/register',
		element: <Register />
	},
	{
		path: '/login',
		element: <Login />
	}
]);
