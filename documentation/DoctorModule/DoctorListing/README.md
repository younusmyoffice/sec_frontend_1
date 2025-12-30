Doctor Listing — Create/Edit Flow

Overview
- Doctors can create a “listing package” with:
  - Listing details (name, availability, about)
  - Plan details (message/video plans with fee + duration)
  - Symptom questionnaire
  - Terms & Conditions
- Listings can be Activated/Deactivated and Deleted.

Routes (UI)
- Base: `/doctordashboard/doctorListing`
- Steps:
  - Listing Details: `/doctordashboard/doctorListing/listingdetails`
  - Add Plans: `/doctordashboard/doctorListing/addplans`
  - Add Questioner: `/doctordashboard/doctorListing/addquestioner`
  - Terms & Conditions: `/doctordashboard/doctorListing/termandcondition`
- Listing tabs:
  - Active: `/doctordashboard/doctorListing/doctoractiveListing`
  - Draft: `/doctordashboard/doctorListing/doctorsavedInDraft`

Edit Mode
- When editing a listing, we set `localStorage.editing_listing_id` and reuse the same step routes.
- Step guards ensure a `listing_id` exists before Plans/Questioner/Terms.
- On completion, `editing_listing_id` is cleared.

Backend Endpoints
- Listing create/update entry point: `POST /sec/createUpdatedoctorlisting/{status}`
  - status: `listing`, `planCreate`, `planAll`, `planUpdate`, `planDelete`, `questionCreate`, `questionUpdate`, `questionDelete`, `terms`, etc.
- Plans
  - Create (array): `POST /sec/createUpdatedoctorlisting/planCreate`
  - Read all: `POST /sec/createUpdatedoctorlisting/planAll`
  - Update: `POST /sec/createUpdatedoctorlisting/planUpdate`
  - Delete: `POST /sec/createUpdatedoctorlisting/planDelete`
  - By ID: `GET /sec/createUpdatedoctorlisting/planById/{plan_id}`
- Questions
  - Create (bulk): `POST /sec/createUpdatedoctorlisting/questionCreate`
  - Update: `POST /sec/createUpdatedoctorlisting/questionUpdate`
- By listing/doctor: `GET /sec/getdoctorlisting/questionAll/{doctor_list_id}/{doctor_id}`
  - By ID: `GET /sec/createUpdatedoctorlisting/questionById/{questionId}`
- Terms
  - Create/Update: `POST /sec/createUpdatedoctorlisting/terms`
- Status + Delete
  - Active list: `GET /sec/doctor/DocListingPlanActive/{doctor_id}`
  - Draft list: `GET /sec/doctor/DocListingPlanDeactive/{doctor_id}`
  - Activate/Deactivate: `POST /sec/doctor/docListingActiveDeactive`
  - Delete listing: `POST /sec/doctor/deleteDocListingPlan`

Conventions
- IDs sent to backend are numeric (frontend coerces to `Number(...)`).
- Plans require both `plan_fee` (> 0) and `plan_duration`; Save is disabled if missing.
- Terms Submit is disabled until description is provided.

State Keys
- `localStorage.listing_id` — current listing under creation/edit
- `localStorage.editing_listing_id` — indicates edit mode; propagated to `listing_id` during steps
- `localStorage.doctor_suid` — current doctor user id

Edit Wrappers & Mode Hook
- Thin wrappers under `EditListing/*` now redirect to the unified steps and ensure edit context is applied:
  - They copy `editing_listing_id` → `listing_id` and set `activeComponent`/`path`, then redirect with `navigate(..., { replace: true })`.
- The shared hook `shared/useListingMode.js` centralizes mode detection and IDs:
  - `mode`: 'edit' if `editing_listing_id` exists, else 'create'
  - `listingId`: numeric id (prefers edit id)
  - `doctorId`: numeric id
  - `setUnifiedListingId()`: copies `editing_listing_id` into `listing_id`
  - Steps import and use it to guard navigation and send correct payload IDs.

API Reference (Questionnaire)
- Create: `POST /sec/createUpdatedoctorlisting/questionCreate`
- Get all by listing/doctor: `GET /sec/getdoctorlisting/questionAll/{doctor_list_id}/{doctor_id}`
- Get by id: `GET /sec/createUpdatedoctorlisting/questionById/{questionId}`
- Update: `POST /sec/createUpdatedoctorlisting/questionUpdate`
