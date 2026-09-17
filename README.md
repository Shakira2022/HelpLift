Change the .env.example to .env to be able to access the database in the Backend Folder

Missing/Broken: routes/giverRoutes.js (mounted at /api/givers) has no authentication on any route (POST/GET/PUT/DELETE), letting anyone view all givers' contact info or create/edit/delete giver records without logging in-- needs to be removed or secured before merge.
