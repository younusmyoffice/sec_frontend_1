// Small helper to unify create/edit context for listing steps
// - mode: 'edit' if editing_listing_id is set, otherwise 'create'
// - listingId: numeric listing id (prefers editing_listing_id)
// - doctorId: numeric doctor id from localStorage
// - setUnifiedListingId(): copies editing_listing_id into listing_id for unified steps

export const useListingMode = () => {
  const editingId = (typeof window !== 'undefined') ? window.localStorage.getItem('editing_listing_id') : null;
  const rawListingId = (typeof window !== 'undefined') ? window.localStorage.getItem('listing_id') : null;
  const doctorIdStr = (typeof window !== 'undefined') ? window.localStorage.getItem('doctor_suid') : null;

  const listingId = Number(editingId || rawListingId || 0);
  const doctorId = Number(doctorIdStr || 0);
  const mode = editingId ? 'edit' : 'create';

  const setUnifiedListingId = () => {
    if (editingId) {
      window.localStorage.setItem('listing_id', editingId);
    }
  };

  return { mode, listingId, doctorId, setUnifiedListingId };
};

