import { toast } from "react-toastify";

export function saveToStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
export function getFromStorage(key, defaultKey) {
  if (localStorage.getItem(key) === null) return defaultKey;
  return JSON.parse(localStorage.getItem(key));
}

export function removeFromStorage(key) {
  return localStorage.removeItem(key)
}

export function clearStorage() {
  return localStorage.clear()
}

export const validateEmail = (email) => {
  const regEmail =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return regEmail.test(email);
};

export const toastNoti = (text, type) => {
  switch (type) {
    case "error":
      return toast.error(text, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    case "success":
      return toast.success(text, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    default:
      return toast(text, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  }
};

export const isEmptyObject = (myEmptyObj) => {
  return (
    Object.keys(myEmptyObj).length === 0 && myEmptyObj.constructor === Object
  );
};

export const validateForm = (state, type) => {
  if (Object.values(state).includes("")) {
    toastNoti("All fields are required!", "error");
    return false;
  }

  if (!validateEmail(state.email)) {
    toastNoti("Invalid email!", "error");
    return false;
  }

  if (state.password.length < 6) {
    toastNoti("Your password must be at least 6 characters ", "error");
    return false;
  }
  return true;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
    .format(price)
    .replace("₫", "VND");
};

export const validateCheckOut = (data) => {
  if (data.payment === 'default') {
    toastNoti("You must select payment type!", "error");
    return false;
  }
  if (Object.values(data.formData).includes("")) {
    toastNoti("All fields are required!", "error");
    return false;
  }

  if (!validateEmail(data.formData.email)) {
    toastNoti("Invalid email!", "error");
    return false;
  }

  return true
}