export const ENDPOINTS = {
  // Example Users related endpoints
  USERS: {
    GET: "/users",
    GET_BY_ID: (id: string) => `/users/${id}`,
    CREATE: "/users/create",
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
};
