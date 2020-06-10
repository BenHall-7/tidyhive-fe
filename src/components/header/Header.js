import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../sidebar/Sidebar.js';
import { useLocation } from 'react-router-dom';
import actions from '../../actions/index.js';

import { Header as UiHeader, Icon, Button, Modal, Input } from 'semantic-ui-react';

const Header = (props) => {
	const [pinInput, setPinInput] = useState('');
	const [pinModal, setPinModal] = useState(false);
	// location is an object that contains the current url path on the 'pathname' property
	const location = useLocation();
	const [sidebarOpened, setSidebarOpened] = useState(false);
	const currentUser = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (currentUser.childActive === true) {
			setSidebarOpened(false);
		}
	}, [currentUser]);

	// handles what happens when a user clicks on the settings icon or the lock icon when it is a child
	const handleClick = () => {
		if (currentUser.childActive === true) {
			setPinModal(true);
		} else {
			setSidebarOpened(!sidebarOpened);
		}
	};

	const handleChange = (e) => {
		e.persist();
		setPinInput(e.target.value);
	};

	const modalButtonClick = () => {
		// dispatch action for checking pin and changing the child boolean in state to false
		dispatch(actions.user.setChildActive(false));
		console.log(pinInput);
		setPinInput('');
		setPinModal(false);
	};

	return (
		<>
			<div className='flex items-center justify-center w-full p-8 center'>
				<h2 className='text-5xl font-bold text-black center'>
					{location.pathname === '/dashboard' && 'Dashboard'}
					{location.pathname === '/household' && 'Household'}
					{location.pathname === '/account' && 'Account'}
				</h2>
			</div>
			<Modal open={pinModal}>
				<Modal.Header>Admin Access</Modal.Header>
				<Modal.Description>You must enter the household pin to get access to user settings.</Modal.Description>
				<Modal.Content>
					<Input
						type='text'
						placeholder='Enter household pin'
						name='pin'
						value={pinInput}
						onChange={handleChange}
					/>
					<Button onClick={modalButtonClick} primary content='Submit' />
				</Modal.Content>
			</Modal>
		</>
	);
};

export default Header;
