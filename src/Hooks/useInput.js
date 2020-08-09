import { useState, useEffect } from 'react';

export default function useInput(initialValue) {
	const [state, setInputState] = useState(initialValue);
	const [initialState, setInitState] = useState(initialValue);

	useEffect(() => {
		setInitState(initialValue);
	}, []);

	const resetValue = () => {
		setInputState({
			...initialState,
		});

		console.log(initialState);
		console.log(state);
	};

	const changeValue = (e) => {
		const { name, value } = e.target;

		console.log(e.target);
		setInputState({
			...state,
			[name]: value,
		});
	};

	return [state, changeValue, resetValue];
}
