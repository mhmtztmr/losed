let storage;
if (typeof localStorage === 'undefined' || localStorage === null) {
  storage = {
    getItem() {
      return false;
    },
  };
} else {
  storage = localStorage;
}

export default storage;