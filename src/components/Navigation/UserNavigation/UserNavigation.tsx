import React, { useEffect, useState, FunctionComponent, useRef } from 'react';

// TODO: Remove lodash
import { throttle } from 'lodash';

import { Backdrop } from 'components/UI/Backdrop/Backdrop';

import TopNavigation from './TopNavigation/TopNavigation';
import MobileNavigation from './MobileNavigation/MobileNavigation';

const MAX_PIXEL_FOR_MOBILE = 850;
const THROTTLE_TIME = 200;

const UserNavigation: FunctionComponent = () => {
	const [mobileNavOpened, setMobileNavOpened] = useState<boolean>(false);
	const mobileOpenedRef = useRef<boolean>(false);

	const toggleMobileOnResize = () => {
		const { innerWidth } = window;

		if (innerWidth > MAX_PIXEL_FOR_MOBILE && mobileOpenedRef.current) {
			toggleMobileNav();
		}
  }

	const toggleMobileOnResizeThrottled = throttle(toggleMobileOnResize, THROTTLE_TIME);

	useEffect(() => {
		window.addEventListener('resize', toggleMobileOnResizeThrottled);

		return () => {
			window.removeEventListener('resize', toggleMobileOnResizeThrottled);
		}
	}, [toggleMobileOnResizeThrottled]);

	const toggleMobileNav = () => {
		setMobileNavOpened((prevMobileNavOpened: boolean) => {
			mobileOpenedRef.current = !prevMobileNavOpened;
			return !prevMobileNavOpened;
		});
	}

	return (
		<>
			<nav>
				<TopNavigation onToggleMobile={toggleMobileNav} />
				<MobileNavigation clicked={toggleMobileNav} opened={mobileNavOpened} />
			</nav>
			<Backdrop show={mobileNavOpened} onClick={toggleMobileNav} />
		</>
	);
} 

export default UserNavigation;