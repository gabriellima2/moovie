import { useState } from 'react'

export function useBoolean(initialValue?: boolean) {
	const [state, setState] = useState(initialValue || false)

	function setValue(value: boolean) {
		setState(value)
	}
	function setTrue() {
		setState(true)
	}
	function setFalse() {
		setState(false)
	}
	function toggle() {
		setState((prevState) => !prevState)
	}

	return {
		value: state,
		setValue,
		setFalse,
		setTrue,
		toggle,
	}
}
