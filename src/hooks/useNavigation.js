import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";
import { ROUTES, STORAGE_KEYS } from "../constants/routes";

// Custom navigation hook - Best Practice: Centralized navigation logic
export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigate with error handling
  const navigateTo = useCallback((route, options = {}) => {
    try {
      if (!route) {
        console.error("Navigation error: Route is required");
        return false;
      }

      // Validate route exists in our constants
      const validRoutes = Object.values(ROUTES);
      if (!validRoutes.includes(route)) {
        console.warn(`Navigation warning: Route '${route}' not found in ROUTES constants`);
      }

      navigate(route, {
        replace: false, // Default to push navigation
        state: null,
        ...options,
      });
      return true;
    } catch (error) {
      console.error("Navigation error:", error);
      return false;
    }
  }, [navigate]);

  // Navigate and replace current history entry
  const navigateReplace = useCallback((route, options = {}) => {
    return navigateTo(route, { ...options, replace: true });
  }, [navigateTo]);

  // Navigate back
  const navigateBack = useCallback((steps = 1) => {
    try {
      navigate(-steps);
      return true;
    } catch (error) {
      console.error("Navigation back error:", error);
      return false;
    }
  }, [navigate]);

  // Get current route
  const getCurrentRoute = useCallback(() => {
    return location.pathname;
  }, [location.pathname]);

  // Check if current route matches
  const isCurrentRoute = useCallback((route) => {
    return location.pathname === route;
  }, [location.pathname]);

  // Navigate with state preservation
  const navigateWithState = useCallback((route, state = {}) => {
    return navigateTo(route, { state });
  }, [navigateTo]);

  // Navigate with query parameters
  const navigateWithQuery = useCallback((route, queryParams = {}) => {
    const searchParams = new URLSearchParams(queryParams);
    const queryString = searchParams.toString();
    const fullRoute = queryString ? `${route}?${queryString}` : route;
    return navigateTo(fullRoute);
  }, [navigateTo]);

  // Navigate and store in localStorage for persistence
  const navigateAndStore = useCallback((route, storageKey = STORAGE_KEYS.PATH) => {
    try {
      localStorage.setItem(storageKey, route);
      return navigateTo(route);
    } catch (error) {
      console.error("Navigation and storage error:", error);
      return false;
    }
  }, [navigateTo]);

  // Get stored route from localStorage
  const getStoredRoute = useCallback((storageKey = STORAGE_KEYS.PATH) => {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      console.error("Error getting stored route:", error);
      return null;
    }
  }, []);

  return {
    navigateTo,
    navigateReplace,
    navigateBack,
    getCurrentRoute,
    isCurrentRoute,
    navigateWithState,
    navigateWithQuery,
    navigateAndStore,
    getStoredRoute,
    currentRoute: location.pathname,
    location,
  };
};
