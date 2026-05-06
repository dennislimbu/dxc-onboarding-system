export const getAvatar = (userId) => {
  return localStorage.getItem(`avatar-${userId}`);
};

export const saveAvatar = (userId, imageData) => {
  localStorage.setItem(`avatar-${userId}`, imageData);

  window.dispatchEvent(
    new CustomEvent("avatarUpdated", {
      detail: { userId },
    })
  );
};