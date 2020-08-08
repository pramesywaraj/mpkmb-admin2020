import { useState } from 'react';

export default function useInput(initialValue) {
	const [state, setInputState] = useState(initialValue);

	const resetValue = () => {
		setInputState(initialValue);
	};

	const changeValue = (e) => {
		const { name, value } = e.target;
		setInputState({
			...state,
			[name]: value,
		});
	};

	return [state, changeValue, resetValue];
}
