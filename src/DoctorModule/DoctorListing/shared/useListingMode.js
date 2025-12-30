/**
 * useListingMode Hook
 * 
 * Custom hook to unify create/edit context for listing creation/editing flow:
 * - Determines if user is creating a new listing or editing existing one
 * - Provides unified listing ID and doctor ID
 * - Syncs localStorage keys for consistent state management
 * 
 * @returns {Object} - { mode, listingId, doctorId, setUnifiedListingId }
 * @returns {string} mode - 'edit' if editing_listing_id is set, otherwise 'create'
 * @returns {number} listingId - Numeric listing ID (prefers editing_listing_id over listing_id)
 * @returns {number} doctorId - Numeric doctor ID from localStorage
 * @returns {Function} setUnifiedListingId - Copies editing_listing_id into listing_id for unified steps
 * 
 * @example
 * const { mode, listingId, doctorId, setUnifiedListingId } = useListingMode();
 * // mode: 'edit' or 'create'
 * // listingId: 123 or 0
 * // doctorId: 456
 * // setUnifiedListingId(): void
 */
export const useListingMode = () => {
  // Read localStorage values safely (SSR compatibility)
  const editingId = (typeof window !== 'undefined') ? window.localStorage.getItem('editing_listing_id') : null;
  const rawListingId = (typeof window !== 'undefined') ? window.localStorage.getItem('listing_id') : null;
  const doctorIdStr = (typeof window !== 'undefined') ? window.localStorage.getItem('doctor_suid') : null;

  // Convert to numbers, defaulting to 0 if not found
  // Prefer editing_listing_id over listing_id for consistency
  const listingId = Number(editingId || rawListingId || 0);
  const doctorId = Number(doctorIdStr || 0);
  
  // Determine mode: 'edit' if editing_listing_id exists, otherwise 'create'
  const mode = editingId ? 'edit' : 'create';

  /**
   * Set unified listing ID
   * Copies editing_listing_id into listing_id to ensure consistency
   * This helps when some components check listing_id instead of editing_listing_id
   */
  const setUnifiedListingId = () => {
    if (editingId && typeof window !== 'undefined') {
      window.localStorage.setItem('listing_id', editingId);
    }
  };

  return { mode, listingId, doctorId, setUnifiedListingId };
};

