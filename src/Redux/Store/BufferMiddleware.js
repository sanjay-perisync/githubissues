import { Unauthorized } from "src/slices/auth/alertSlice";

const buffer = []; // Store dispatched actions
let isUnauthorized = false; // Flag to stop actions after first 401

const bufferMiddleware = (store) => (next) => (action) => {
  if (isUnauthorized) {
    return; // Stop further actions from being dispatched
  }

  buffer.push(action);

  const isAuthError =
    action.payload?.err?.response?.status === 401 ||
    action.payload?.res?.data?.code === 401 ||
    action.payload?.response?.status === 401 ||
    action.msg?.response?.status === 401 ||
    action?.payload?.response?.status === 403;

  if (isAuthError) {
    store.dispatch(Unauthorized()); // Dispatch Unauthorized action
    isUnauthorized = true; // Immediately block further actions
    return; // Prevent further actions from being processed
  }

  // Keep buffer size under 20
  if (buffer.length > 20) {
    buffer.splice(0, buffer.length - 20);
  }

  return next(action);
};

export default bufferMiddleware;
