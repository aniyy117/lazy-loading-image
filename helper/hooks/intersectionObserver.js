import { useEffect } from "react";

// Using a WeakMap to associate DOM elements with their respective callbacks
let listenerCallbacks = new WeakMap();

// The Intersection Observer instance
let observer;

// Callback function for handling intersections
function handleIntersections(entries) {
  entries.forEach((entry) => {
    // Checking if there's a callback associated with the target element
    if (listenerCallbacks.has(entry.target)) {
      let cb = listenerCallbacks.get(entry.target);

      // Triggering the callback if the element is intersecting or has an intersection ratio greater than 0
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listenerCallbacks.delete(entry.target);
        cb();
      }
    }
  });
}

// Function to get or create the Intersection Observer
function getIntersectionObserver() {
  if (observer === undefined) {
    // Creating the Intersection Observer with a callback and options
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: "100px",
      threshold: 0.15,
    });
  }
  return observer;
}

// Custom hook for using Intersection Observer
export function useIntersection(elem, callback) {
  useEffect(() => {
    // Getting the DOM element from the ref
    let target = elem.current;
    
    // Getting or creating the Intersection Observer
    let observer = getIntersectionObserver();

    // Associating the target element with its callback in the WeakMap
    listenerCallbacks.set(target, callback);

    // Observing the target element
    observer.observe(target);

    // Cleanup function to unobserve the target element when the component unmounts
    return () => {
      listenerCallbacks.delete(target);
      observer.unobserve(target);
    };
  }, []);
}
