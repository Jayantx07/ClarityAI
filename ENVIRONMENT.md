Environment Variables (Do Not Commit Secrets)

Frontend (Next.js):

- NEXT_PUBLIC_API_BASE_URL = http://localhost:8080
- NEXT_PUBLIC_FIREBASE_API_KEY = ...        # TODO: Firebase web config
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = ...    # TODO: Firebase web config
- NEXT_PUBLIC_FIREBASE_PROJECT_ID = ...     # TODO: Firebase web config
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = ... # TODO: Firebase web config
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = ...
- NEXT_PUBLIC_FIREBASE_APP_ID = ...
- NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = ... (optional)

Backend (Express):

- PORT = 8080
- CORS_ORIGIN = http://localhost:3000
- GEMINI_API_KEY = ...           # TODO: Required if using Gemini API
- HUGGINGFACE_API_KEY = ...      # TODO: Alternative to Gemini
- VERTEX_PROJECT_ID = ...        # TODO: Vertex AI sentiment
- VERTEX_LOCATION = ...          # e.g., us-central1
- VERTEX_CREDENTIALS_JSON = ...  # TODO: Base64 of service account JSON or other method
- DATABASE_URL = ...             # TODO: MongoDB or Postgres connection string

Notes:

- Prefer setting env variables in your shell or CI/CD secrets instead of .env files for this project.
- Add keys only when corresponding features are enabled in code.



