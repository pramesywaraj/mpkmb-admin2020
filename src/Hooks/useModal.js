import { useState } from 'react';

export default function useModal() {
	const [status, setStatus] = useState(false);

	function openModal() {
		setStatus(true);
	}

	function closeModal() {
		setStatus(false);
	}

	return [status, openModal, closeModal];
}
