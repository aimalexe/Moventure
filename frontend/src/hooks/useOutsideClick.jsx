import { useEffect, useRef } from 'react';

/**
 * Custom hook that triggers a callback when a click occurs outside the specified element.
 *
 * @param {Function} callback - Function to be called when a click outside the element is detected.
 * @returns {Object} `ref` - React ref to be attached to the element you want to monitor for outside clicks.
 */
const useOutsideClick = (callback) => {
    // Create a ref to attach to the DOM element you want to monitor
    const ref = useRef();

    useEffect(() => {
        /**
         * Handles the outside click event by checking if the click was outside the element.
         *
         * @param {Event} event - The DOM event object from the click.
         */
        const handleClickOutside = (event) => {
            // Check if the click occurred outside the ref's element
            if (ref.current && !ref.current.contains(event.target))
                // If it did, call the provided callback function
                callback();
        };

        // Add the event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener when the component unmounts or updates
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback]); // Re-run the effect if the callback changes

    // Return the ref so it can be attached to the element that should be monitored
    return ref;
};

export default useOutsideClick;