// validating email
export const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const gmailRegex = /@gmail\.com$/;

  return emailRegex.test(email) && gmailRegex.test(email);
};

// validating string that is digit only
export const containsOnlyDigits = (str) => {
  const digitRegex = /^\d+$/;
  return digitRegex.test(str);
};

// validating string that is alphabet only
export const containsOnlyAlphabets = (str) => {
  const alphabetRegex = /^[a-zA-Z\s]+$/;
  return alphabetRegex.test(str);
};

// validating string for a password
export const isgoodpassword = (res, str) => {
  if (str.length < 6) {
    return res.status(409).json({
      message: "Password needs to be 6 characters at minimun",
    });
  }
  return true;
};

// validating adult
export const isAdult = (res, dob) => {
  const dateObject = new Date(dob);
  if (isNaN(dateObject.getTime())) {
    return res.status(409).json({
      message: "Invalid date string",
    });
  } else {
    const timeDifference = Date.now() - dateObject.getTime();
    // Calculate the number of milliseconds in 18 years
    const eighteenYearsInMillis = 18 * 365 * 24 * 60 * 60 * 1000;
    if (timeDifference <= 0) {
      return res.status(409).json({
        message: "Date can't be in the future",
      });
    }
    if (timeDifference < eighteenYearsInMillis) {
      return res.status(409).json({
        message: "Your age is less than 18, You can't register",
      });
    }
  }
  return true;
};

// validating id
export const isid = (res, uid) => {
  if (uid.length !== 16 || !containsOnlyDigits(uid)) {
    return res.status(409).json({
      message: "Please enter a valid UID with 16 digits",
    });
  }
  return true;
};
