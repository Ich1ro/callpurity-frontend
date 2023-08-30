import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import View from '../pages/ViewWrapper';
import CompanyDetails from '../components/CompanyDetails';
import CompanyEdit from '../components/CompanyEdit';
import CompanyNotBranded from '../components/CompanyNotBranded';
import CompanyBranded from '../components/CompanyBranded';
import PhoneDetails from '../components/PhoneDetails';

import { AddNew, Changes, Dasboard, Login, Phone, PureCallerId, Register, Upload } from '../pages'

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
