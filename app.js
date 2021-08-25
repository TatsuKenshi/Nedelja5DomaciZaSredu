// selekcija

// forma i lista ajtema
const form = document.querySelector(".form");
const userList = document.querySelector(".userList");

// polja, selekti i checkbox-ovi
const firstNameField = document.querySelector("#firstName");
const lastNameField = document.querySelector("#lastName");
const passwordField = document.querySelector("#password");
const confirmPasswordField = document.querySelector("#confirmPassword");
const courses = Array.from(document.getElementsByName("courses"));
const city = document.querySelector("#city");
const gender = Array.from(document.getElementsByName("gender"));
const listAllUsers = document.getElementById("showAll");

// errorMsg paragrafi
const firstNameError = document.querySelector("#firstNameError");
const lastNameError = document.querySelector("#lastNameError");
const passwordError = document.querySelector("#passwordError");
const confirmPasswordError = document.querySelector("#confirmPasswordError");
const coursesError = document.querySelector("#coursesError");

// users niz
let users = [];

// inicijalna vrednost isValidate
isValidate = true;

// validacija: funkcije
// provera za brojeve
function checkStringForNumbers(string) {
  let number = /\d/;
  return number.test(string);
}

// provera za velika slova
function checkStringForUpperCase(string) {
  let upperCase = /[A-Z]/;
  return upperCase.test(string);
}

// funkcija za dodavanje jednog elementa u DOM
function addOneUserToDom(user) {
  let oneUserDiv = document.createElement("div");
  oneUserDiv.classList.add("oneUserDiv");
  oneUserDiv.innerHTML = `
    <h4>User Info</h4>
    <p>First Name: ${user.firstName}</p>
    <p>Last Name: ${user.lastName}</p>
    <p>Selected Courses: ${user.pickedCourses.join(", ")}</p>
    <p>Location: ${user.city}</p>
    <p>Gender: ${user.pickedGender}</p>
    `;
  userList.append(oneUserDiv);
}

// event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  //resetovanje error poruka
  firstNameError.textContent = "";
  lastNameError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
  coursesError.textContent = "";

  // firstName validacija
  if (firstNameField.value == "") {
    firstNameError.textContent = "This field is required.";
    isValidate = false;
  } else if (firstNameField.value.length < 5) {
    firstNameError.textContent =
      "This field has to have at least five characters.";
    isValidate = false;
  } else if (firstNameField.value.length > 15) {
    firstNameError.textContent =
      "This field can't have more than 15 characters.";
    isValidate = false;
  }

  // lastName validacija
  if (lastNameField.value == "") {
    lastNameError.textContent = "This field is required.";
    isValidate = false;
  } else if (lastNameField.value.length < 5) {
    lastNameError.textContent =
      "This field has to have at least five characters.";
    isValidate = false;
  } else if (lastNameField.value.length > 20) {
    lastNameError.textContent =
      "This field can't have more than 20 characters.";
    isValidate = false;
  }

  // password validacija
  if (passwordField.value == "") {
    passwordError.textContent = "This field is required.";
    isValidate = false;
  } else if (passwordField.value.length < 8) {
    passwordError.textContent =
      "The password must be at least eight characters long.";
    isValidate = false;
  } else if (!checkStringForNumbers(passwordField.value)) {
    passwordError.textContent = "The password must include a number.";
    isValidate = false;
  } else if (!checkStringForUpperCase(passwordField.value)) {
    passwordError.textContent =
      "The password must include an uppercase letter.";
    isValidate = false;
  }

  // confirmPassword validacija
  if (confirmPasswordField.value !== passwordField.value) {
    confirmPasswordError.textContent = "Passwords must match.";
    isValidate = false;
  }

  // course selection validacija
  const checked = courses.find((element) => element.checked);
  if (!checked) {
    isValidate = false;
    coursesError.textContent =
      "This is a required section. Select at least one course.";
  }

  // niz izabranih kurseva
  let chosenCourses = [];
  courses.forEach(function (course) {
    if (course.checked) {
      chosenCourses.push(course.value);
    }
  });

  // izabrani gender
  const chosenGender = gender.find((element) => element.checked);

  // finalna validacija i kreiranje objekta za jednog user-a
  if (isValidate) {
    let user = {
      firstName:
        firstNameField.value.trim().charAt(0).toUpperCase() +
        firstNameField.value.slice(1),
      lastName:
        lastNameField.value.trim().charAt(0).toUpperCase() +
        lastNameField.value.slice(1),
      password: passwordField.value.trim(),
      pickedCourses: chosenCourses,
      city: city.value ? city.value : "no city was specified",
      pickedGender: chosenGender ? chosenGender.id : "no gender was specified",
    };

    // vracanje polja za unos na default vrednosti
    firstNameField.value = "";
    lastNameField.value = "";
    passwordField.value = "";
    confirmPasswordField.value = "";
    city.value = "";

    courses.forEach(function (course) {
      course.checked = false;
    });

    gender.forEach(function (option) {
      option.checked = false;
    });

    // ubacivanje user-a u users array
    users.push(user);
    console.log(users);

    // ispisivanje jednog user-a u dom
    addOneUserToDom(user);

    // ispisivanje celog niza u dom
    showAll.addEventListener("click", function (e) {
      userList.innerHTML = "";
      users.forEach((user) => {
        addOneUserToDom(user);
      });
    });
  } else {
    console.log("something went wrong");
    isValidate = true;
  }
});
