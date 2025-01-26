function localStorageSetItem(key, value) {
  if (typeof key !== 'string') {
    console.error('Error: Key must be a string.');
    return
  }
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (err) {
    console.log('Error setting item in localStorage', err);
  }
}

function localStorageGetItem(key) {
  try {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (err) {
    console.error("Error getting item in localStorage", err);
    return null;
  }
}

function localStorageRemoveItem(key) {
  localStorage.removeItem(key);
}

function localStorageClear() {
  localStorage.clear();
}

export { localStorageSetItem, localStorageGetItem, localStorageRemoveItem, localStorageClear };