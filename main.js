var database = firebase.database();
var userArray = readDataUser();
var devArray = readDataDeveloper();
var hotelArray = readDataHotel();
var registerAndLogInArray = new Array();
isDone = false;

// update data
// firebase.database().ref('students/'+"07829cdb-41df-4cd6-b1f3-c739a5a1aa72").update(createStudent("giorgi", "okruadze", 23, "okruadze_g@itstep.org"));


// delete data 
// firebase.database().ref('students/'+"25065d38-73f9-40c9-a958-259be8778922").remove();

const addHotelBtn = document.querySelector("#addBtn");
const indexUserNamePlace = document.querySelector(".user");
const indexUserName = document.querySelector(".username");
const regAndLogInPlace = document.querySelector(".reg-and-log-in");
const carouselInner = document.querySelector(".carousel-inner");
const popularPlaces = document.querySelector(".for-you-hotels");
const newsPlace = document.querySelector(".most-hotels-content");
const body = document.querySelector("body");
const spinner = document.querySelector(".spinner");

function registerPageFunction() {
    window.location.href = "./register.html";
}

function loginPageFuncion() {
    window.location.href = "./login.html";
}

function addBtnFunction() {
    window.location.href = "./add-hotel.html";
}

window.addEventListener('load', function () {
    if (window.location.href.split("/").pop() == "index.html") {
        if (localStorage['user'] != undefined) {
            if (localStorage['status'] == "Developer") {
                window.location.href = "./cmr.html"
            } else if (localStorage['status'] == "User") {
                spinner.classList.add('d-flex');
                spinner.classList.remove('d-none');
                setTimeout(() => {
                    userArray.forEach(o => {
                        if (o.data.username == localStorage['user']) {
                            localStorage['userUpdateId'] = o.id;
                        }
                    });
                    spinner.classList.remove('d-flex');
                    spinner.classList.add('d-none');
                }, 3000)
                indexUserName.innerText += localStorage['user'];
                regAndLogInPlace.style.display = "none";
                addHotelBtn.style.display = "block";
                setTimeout(() => {
                    for (var i = 0; i < 3; i++) {
                        insertInCarousel(hotelArray, i == 0);
                    }
                }, 2000);
                const xhr = new XMLHttpRequest();
                xhr.open("GET", "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/TrendingNewsAPI?pageNumber=1&pageSize=3&withThumbnails=false&location=uk");
                xhr.setRequestHeader("x-rapidapi-key", "ea2b3a27c3mshf1456a97d1cd245p106440jsnd530ed43a8d1");
                xhr.setRequestHeader("x-rapidapi-host", "contextualwebsearch-websearch-v1.p.rapidapi.com");
                xhr.onloadend = function () {
                    var response = JSON.parse(this.responseText);
                    response.value.forEach(o => {
                        insertInNews(o);
                    });
                };
                xhr.send();
            }

        } else {
            spinner.classList.add('d-flex');
            spinner.classList.remove('d-none');
            setTimeout(() => {
                spinner.classList.remove('d-flex');
                spinner.classList.add('d-none');
            }, 3000)
            indexUserNamePlace.style.visibility = "hidden";
            regAndLogInPlace.style.display = "block";
            addHotelBtn.style.display = "none";
            setTimeout(() => {
                for (var i = 0; i < 3; i++) {
                    insertInCarousel(hotelArray, i == 0);
                }
            }, 2000);
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/TrendingNewsAPI?pageNumber=1&pageSize=3&withThumbnails=false&location=uk");
            xhr.setRequestHeader("x-rapidapi-key", "ea2b3a27c3mshf1456a97d1cd245p106440jsnd530ed43a8d1");
            xhr.setRequestHeader("x-rapidapi-host", "contextualwebsearch-websearch-v1.p.rapidapi.com");
            xhr.onloadend = function () {
                var response = JSON.parse(this.responseText);
                response.value.forEach(o => {
                    insertInNews(o);
                });
            };
            xhr.send();
        }
    } else if (window.location.href.split("/").pop() == "register.html") {
        registerPageLogic();
    } else if (window.location.href.split("/").pop() == "login.html") {
        logInPageLogic();
    } else if (window.location.href.split("/").pop() == "cmr.html") {
        const spinner = document.querySelector(".spinner");
        spinner.classList.add('d-flex');
        spinner.classList.remove('d-none');
        cmrPageLogic();
        setTimeout(() => {
            spinner.classList.remove('d-flex');
            spinner.classList.add('d-none');
        }, 3000)
    } else if (window.location.href.split("/").pop() == "edit-user.html") {
        spinner.classList.add('d-flex');
        spinner.classList.remove('d-none');
        userEditPageLogic();
        setTimeout(() => {
            spinner.classList.remove('d-flex');
            spinner.classList.add('d-none');
        }, 3000)
    } else if (window.location.href.split("/").pop() == "add-user.html") {
        addUserPageLogic();
    } else if (window.location.href.split("/").pop() == "explore.html") {
        const addHotelBtn = document.querySelector("#addBtn");
        const indexUserNamePlace = document.querySelector(".user");
        const indexUserName = document.querySelector(".username");
        const regAndLogInPlace = document.querySelector(".reg-and-log-in");
        const spinner = document.querySelector(".spinner");
        const input = document.querySelector(".form-control");
        const exploreBtn = document.querySelector(".btn-warning");
        var searchedHotelArray = [];
        hotelArea = document.querySelector(".hotel-area");
        setTimeout(function () {
            for (var i = 0; i < hotelArray.length; i++) {
                insertInHotelArea(hotelArray[i].data.imageURL, hotelArray[i].data.hotelname, hotelArray[i].data.region, hotelArray[i].data.bedquantity, hotelArray[i].data.price, hotelArray[i].data.ownername, hotelArray[i].data.stars, hotelArray[i].id);
            }
            const card = document.querySelectorAll(".card");
            card.forEach(o => {
                o.addEventListener("click", function () {
                    localStorage['hotelId'] = o.id;
                    window.location.href = "./hotel-page.html";
                });
            });
        }, 3000);

        if (localStorage['user'] != undefined) {
            spinner.classList.add('d-flex');
            spinner.classList.remove('d-none');
            setTimeout(() => {
                userArray.forEach(o => {
                    if (o.data.username == localStorage['user']) {
                        localStorage['userUpdateId'] = o.id;
                    }
                });
                spinner.classList.remove('d-flex');
                spinner.classList.add('d-none');
            }, 3000)
            indexUserName.innerText += localStorage['user'];
            regAndLogInPlace.style.display = "none";
            addHotelBtn.style.display = "block";
            exploreBtn.addEventListener("click", function () {
                spinner.classList.add('d-flex');
                spinner.classList.remove('d-none');
                setTimeout(() => {
                    spinner.classList.remove('d-flex');
                    spinner.classList.add('d-none');
                    var searched = input.value;
                    for (var k = 0; k < hotelArray.length; k++) {
                        if (hotelArray[k].data.hotelname == searched || hotelArray[k].data.region == searched) {
                            searchedHotelArray.push(hotelArray[k]);
                            hotelArea.innerHTML = " ";
                        } else {
                            if (searchedHotelArray.length == 0) {
                                hotelArea.innerHTML = " ";
                                hotelArea.innerHTML = `<h1 class="no-hotels" style="margin-bottom: 300px; margin-top: 100px;">სამწუხაროდ სასტუმრო ვერ მოიძებნა</h1>`
                            }
                        }

                    }
                    for (var j = 0; j < searchedHotelArray.length; j++) {
                        insertInHotelArea(searchedHotelArray[j].data.imageURL, searchedHotelArray[j].data.hotelname, searchedHotelArray[j].data.region, searchedHotelArray[j].data.bedquantity, searchedHotelArray[j].data.price, searchedHotelArray[j].data.ownername, searchedHotelArray[j].data.stars, searchedHotelArray[j].id);
                    }
                    const card = document.querySelectorAll(".card");
                    card.forEach(elem => {
                        elem.addEventListener("click", function () {
                            localStorage['hotelId'] = elem.id;
                            window.location.href = "./hotel-page.html";
                        });
                    });
                    searchedHotelArray.length = 0;
                }, 3000);
            });
        } else {
            exploreBtn.disabled = "disabled"
            input.disabled = "disabled";
            input.placeholder = "გთხოვთ დარეგისტრირდით ან გაიარეთ ავტორიზაცია";
            spinner.classList.add('d-flex');
            spinner.classList.remove('d-none');
            setTimeout(() => {
                spinner.classList.remove('d-flex');
                spinner.classList.add('d-none');
            }, 3000)
            indexUserNamePlace.style.visibility = "hidden";
            regAndLogInPlace.style.display = "block";
            addHotelBtn.style.display = "none";
        }
    } else if (window.location.href.split("/").pop() == "hotel-page.html") {
        const addHotelBtn = document.querySelector("#addBtn");
        const indexUserNamePlace = document.querySelector(".user");
        const indexUserName = document.querySelector(".username");
        const regAndLogInPlace = document.querySelector(".reg-and-log-in");
        const spinner = document.querySelector(".spinner");
        if (localStorage['user'] != undefined) {
            spinner.classList.add('d-flex');
            spinner.classList.remove('d-none');
            setTimeout(() => {
                spinner.classList.remove('d-flex');
                spinner.classList.add('d-none');
            }, 3000)
            hotelPageLogic();
            indexUserName.innerText += localStorage['user'];
            regAndLogInPlace.style.display = "none";
            addHotelBtn.style.display = "block";
        } else {
            spinner.classList.add('d-flex');
            spinner.classList.remove('d-none');
            setTimeout(() => {
                spinner.classList.remove('d-flex');
                spinner.classList.add('d-none');
            }, 3000);
            hotelPageLogic();
            indexUserNamePlace.style.visibility = "hidden";
            regAndLogInPlace.style.display = "block";
            addHotelBtn.style.display = "none";
        }
    } else if (window.location.href.split("/").pop() == "gadaxda.html") {
        const title = document.querySelector("h1");
        if (localStorage['price'] < 0) {
            localStorage['price'] = -Number(localStorage['price']);
        }
        title.innerText += " " + localStorage['price'] + " " + "ლარი";
    } else if (window.location.href.split("/").pop() == "edit-hotel.html") {

    }
});

function editHotelFunction() {
    const starsInp = document.querySelector("#starsInp");
    const hotelNameInp = document.querySelector("#hName");
    const hotelBedQuantity = document.querySelector("#quantity");
    const hotelPrice = document.querySelector("#price");
    const regionInp = document.querySelector("#region");
    const hotelImage = document.querySelector("#hotelImg");
    const coverImage = document.querySelector("#coverImg");
    const roomImage1 = document.querySelector("#roomImg1");
    const roomImage2 = document.querySelector("#roomImg2");
    const roomImage3 = document.querySelector("#roomImg3");
    const roomImage4 = document.querySelector("#roomImg4");
    const descriptionInput = document.querySelector("#description");
    var stars = starsInp.value;
    var hotelName = hotelNameInp.value;
    var bedquantity = hotelBedQuantity.value;
    var price = hotelPrice.value;
    var region = regionInp.value;
    var hImage = hotelImage.value;
    var cImage = coverImage.value;
    var roomImg1 = roomImage1.value;
    var roomImg2 = roomImage2.value;
    var roomImg3 = roomImage3.value;
    var roomImg4 = roomImage4.value;
    var description = descriptionInput.value;
    firebase.database().ref('Hotel/' + localStorage['hotelId']).update(createHotel(stars, hImage, cImage, hotelName, description, price, region, roomImg1, roomImg2, roomImg3, roomImg4, localStorage['user']));
}

function hotelCreateFunction() {
    var narr = new Array();
    const starsInp = document.querySelector("#starsInp");
    const hotelNameInp = document.querySelector("#hName");
    const hotelBedQuantity = document.querySelector("#quantity");
    const hotelPrice = document.querySelector("#price");
    const regionInp = document.querySelector("#region");
    const hotelImage = document.querySelector("#hotelImg");
    const coverImage = document.querySelector("#coverImg");
    const roomImage1 = document.querySelector("#roomImg1");
    const roomImage2 = document.querySelector("#roomImg2");
    const roomImage3 = document.querySelector("#roomImg3");
    const roomImage4 = document.querySelector("#roomImg4");
    const descriptionInput = document.querySelector("#description");
    var stars = starsInp.value;
    var hotelName = hotelNameInp.value;
    var bedquantity = hotelBedQuantity.value;
    var price = hotelPrice.value;
    var region = regionInp.value;
    var hImage = hotelImage.value;
    var cImage = coverImage.value;
    var roomImg1 = roomImage1.value;
    var roomImg2 = roomImage2.value;
    var roomImg3 = roomImage3.value;
    var roomImg4 = roomImage4.value;
    var description = descriptionInput.value;
    for (var i = 0; i < hotelArray.length; i++) {
        if (hotelArray[i].data.hotelname == hotelName) {
            narr.push(hotelArray[i]);
        }
    }
    if (narr.length > 0) {
        swal("მოხდა შეცდომა!", "უკვე არსებობს სასტუმრო ამ სახელით!", "error");
    } else {
        createHotelData(stars, hImage, cImage, hotelName, description, price, region, roomImg1, roomImg2, roomImg3, roomImg4, bedquantity, localStorage['user']);
        hotelArray = readDataHotel();
    }
    window.location.href = "./index.html";
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Data Creators
function createHotelData(stars, hotelimage, hotelcoverimage, hotelname, hoteldescription, hotelprice, hotelregion, hotelroom1, hotelroom2, hotelroom3, hotelroom4, bedquantity, username) {
    firebase.database().ref(`Hotel/` + uuidv4()).set(createHotel(stars, hotelimage, hotelcoverimage, hotelname, hoteldescription, hotelprice, hotelregion, hotelroom1, hotelroom2, hotelroom3, hotelroom4, bedquantity, username));
}

function createData(userOrDev, username, name, surname, email, pass) {
    firebase.database().ref(`${userOrDev}/` + uuidv4()).set(createUser(username, name, surname, email, pass));
}



// Object Creators
function createHotel(stars, image, coverimage, hotelname, hoteldescription, price, region, roomimage1, roomimage2, roomimage3, roomimage4, bedquantity, username) {
    return {
        stars: stars,
        imageURL: image,
        coverimageURL: coverimage,
        hotelname: hotelname,
        description: hoteldescription,
        price: price,
        region: region,
        roomimage1URL: roomimage1,
        roomimage2URL: roomimage2,
        roomimage3URL: roomimage3,
        roomimage4URL: roomimage4,
        bedquantity: bedquantity,
        ownername: username
    };
}

function createUser(username, name, surname, email, pass) {
    return {
        username: username,
        name: name,
        surname: surname,
        email: email,
        password: pass
    };
}



// Data Readers
function generateFirebaseItem(key, value) {
    return {
        id: key,
        data: value
    }
}

function readDataHotel() {
    var studentsArray = new Array();
    var ref = firebase.database().ref("Hotel").on('value', function (response) {
        response.forEach(function (item) {
            studentsArray.push(generateFirebaseItem(item.key, item.val()));
        });
    })
    return studentsArray;
}

function readDataDeveloper() {
    var studentsArray = new Array();
    var ref = firebase.database().ref("Developer").on('value', function (response) {
        response.forEach(function (item) {
            studentsArray.push(generateFirebaseItem(item.key, item.val()));
        });
    });
    return studentsArray;
}

function readDataUser() {
    var studentsArray = new Array();
    var ref = firebase.database().ref("User").on('value', function (response) {
        response.forEach(function (item) {
            studentsArray.push(generateFirebaseItem(item.key, item.val()));
        });
    });
    return studentsArray;
}

// Page Logics
function hotelPageLogic() {
    const coverImagePlace = document.querySelector("#cover-image");
    const mainImagePlace = document.querySelector("#hotel-image");
    const namePlace = document.querySelector("#name");
    const starArea = document.querySelector("#star-area");
    const regionPlace = document.querySelector("#region");
    const bedQuantityPlace = document.querySelector("#bedQuantity");
    const pricePlace = document.querySelector("#price");
    const ownerNamePlace = document.querySelector("#ownername");
    const descriptionPlace = document.querySelector("#desription");
    const hotelPageCarouselInner = document.querySelector(".carousel-inner");
    setTimeout(function () {
        hotelArray.forEach(o => {
            if (o.id == localStorage['hotelId']) {
                coverImagePlace.src = o.data.coverimageURL;
                mainImagePlace.src = o.data.imageURL;
                namePlace.innerHTML += " " + o.data.hotelname;
                var starsCount = `<h5 class="card-title">`;
                for (var i = 0; i < Number(o.data.stars); i++) {
                    starsCount += `<i class="fas fa-star" style="color: #ffc107; margin-right: 5px"></i>`;
                    if (Number(o.data.stars) - i == 1) {
                        starsCount += `</h5>`;
                        starArea.innerHTML = starsCount;
                    }
                }
                regionPlace.innerHTML += " " + o.data.region;
                bedQuantityPlace.innerHTML += " " + o.data.bedquantity;
                pricePlace.innerHTML += " " + o.data.price;
                localStorage['hotelPrice'] = o.data.price
                ownerNamePlace.innerHTML += " " + o.data.ownername;
                descriptionPlace.innerHTML += " " + o.data.description;
                insertHotelRoom1(o.data, hotelPageCarouselInner);
                insertHotelRoom2(o.data, hotelPageCarouselInner);
                insertHotelRoom3(o.data, hotelPageCarouselInner);
                insertHotelRoom4(o.data, hotelPageCarouselInner);
            }
        });
    }, 3000);
    const bookBtn = document.querySelector("#bookBtn");
    const bookInfoPlace = document.querySelector(".book-info");
    bookBtn.addEventListener("click", function () {
        bookBtn.innerText = "დადასტურება";
        bookInfoPlace.style.display = "block";
        bookBtn.addEventListener("click", function () {
            const startDateInput = document.querySelector("#startDate");
            const endDateInput = document.querySelector("#endDate");
            if (startDateInput.value.length > 0 && endDateInput.value.length > 0) {
                var startDate = startDateInput.value;
                var endDate = endDateInput.value;
                var months = endDate.split("-")[1] - startDate.split("-")[1];
                var days = endDate.split("-")[2] - startDate.split("-")[2];
                if (months > 0) {
                    if (days >= 0) {
                        days += 30;
                    } else if (days < 0) {
                        var days = days - 30;
                    }
                }
                var price = localStorage['hotelPrice'] * days;
                localStorage['price'] = price;
                window.location.href = "./gadaxda.html";
            } else {
                swal("მოხდა შეცდომა", "გთხოვთ შეიყვანოთ საწყისი და საბოლოო თარიღი", "error");
            }
        });
    });

}


function addUserPageLogic() {
    const regName = document.querySelector("#regName");
    const userName = document.querySelector("#regUname");
    const surName = document.querySelector("#regSname");
    const email = document.querySelector("#regEmail");
    const pass = document.querySelector("#regPass");
    const regBtn = document.querySelector("#regBtn");

    regBtn.addEventListener("click", function () {
        var nameValue = regName.value;
        var userNameValue = userName.value;
        var surNameValue = surName.value;
        var emailValue = email.value;
        var passValue = pass.value;
        if (nameValue.length > 0 && userNameValue.length > 0 && surNameValue.length > 0 && emailValue.length > 0 && passValue.length > 0) {
            if (userArray.length == 0) {
                createData("User", userNameValue, nameValue, surNameValue, emailValue, passValue);
                userArray = readDataUser();
                window.location.href = "./cmr.html";
                registerAndLogInArray.length = 0;
            }
            userArray.forEach(o => {
                if (o.data.username == userNameValue || o.data.email == emailValue) {
                    registerAndLogInArray.push(o.data.username);
                }
                if (registerAndLogInArray.length == 0) {
                    createData("User", userNameValue, nameValue, surNameValue, emailValue, passValue);
                    userArray = readDataUser();
                    window.location.href = "./cmr.html";
                } else if (registerAndLogInArray.length > 0) {
                    swal("მოხდა შეცდომა", "ასეთი ემაილით ან მომხმარებლის სახელით უკვე არსებობს აქაუნთი", "error");
                }
            });

        } else {
            swal("მოხდა შეცდომა!", "გთხოვთ შეავსოთ ყველა შესავსები ველი!", "error");
        }
    });
}


function userEditPageLogic() {
    setTimeout(function () {
        var tempArr = [];
        userArray.forEach(o => {
            if (o.id == localStorage['userUpdateId']) {
                tempArr.push(o);
            }
        })
        const oldInfoPlace = document.querySelector("#oldInfo");
        oldInfoPlace.innerHTML = `<h1 style="color: #0d6efd;">ძველი მომხმარებლის ინფორმაცია</h1>
        <span id="oldUName" style="color: blue;">მომხმარებლის სახელი: <span style="color: black;">${tempArr[0].data.username}</span></span>
        <span id="oldName" style="color: blue;">სახელი: <span style="color: black;">${tempArr[0].data.name}</span></span>
        <span id="oldSName" style="color: blue;">გვარი: <span style="color: black;">${tempArr[0].data.surname}</span></span>
        <span id="oldEmail" style="color: blue;">ემაილი: <span style="color: black;">${tempArr[0].data.email}</span></span>
        <span id="oldPass" style="color: blue;">პაროლი: <span style="color: black;">${tempArr[0].data.password}</span></span>`;
        const userNameInp = document.querySelector("#regUname");
        const nameInp = document.querySelector("#regName");
        const surNameInp = document.querySelector("#regSname");
        const emailInp = document.querySelector("#regEmail");
        const passInp = document.querySelector("#regPass");
        const editBtn = document.querySelector(".btn");
        editBtn.addEventListener("click", function () {
            var newUName = userNameInp.value;
            var newName = nameInp.value;
            var newSName = surNameInp.value;
            var newEmail = emailInp.value;
            var newPassword = passInp.value;
            firebase.database().ref('User/' + localStorage['userUpdateId']).update(createUser(newUName, newName, newSName, newEmail, newPassword));
            window.history.back();
            userArray = readDataUser();
        });
    }, 3000)
}

function registerPageLogic() {
    const regName = document.querySelector("#regName");
    const userName = document.querySelector("#regUname");
    const surName = document.querySelector("#regSname");
    const email = document.querySelector("#regEmail");
    const pass = document.querySelector("#regPass");
    const regBtn = document.querySelector("#regBtn");
    const categoryBtn = document.querySelectorAll("#categoryBtn");
    var arr = new Array();

    categoryBtn.forEach(o => {
        o.addEventListener("click", function () {
            for (var i = 0; i < categoryBtn.length; i++) {
                if (categoryBtn[i].classList.contains("active")) {
                    categoryBtn[i].classList.remove("active");
                    var index = arr.indexOf(categoryBtn[i]);
                    arr.splice(index, 1);
                    o.classList.add("active");
                    arr.push(o.innerText);
                    break;
                } else if (!categoryBtn[i + 1].classList.contains("active")) {
                    o.classList.add("active");
                    arr.push(o.innerText);
                    break;
                } else if (categoryBtn[i + 1].classList.contains("active")) {
                    categoryBtn[i + 1].classList.remove("active");
                    var index = arr.indexOf(categoryBtn[i + 1]);
                    arr.splice(index, 1);
                    o.classList.add("active");
                    arr.push(o.innerText);
                    break;
                }
            }
        });
    });


    regBtn.addEventListener("click", function () {
        var nameValue = regName.value;
        var userNameValue = userName.value;
        var surNameValue = surName.value;
        var emailValue = email.value;
        var passValue = pass.value;
        if (nameValue.length > 0 && userNameValue.length > 0 && surNameValue.length > 0 && emailValue.length > 0 && passValue.length > 0) {
            if (arr[0] === "Developer") {

                devArray.forEach(o => {
                    if (o.data.username == userNameValue || o.data.email == emailValue) {
                        registerAndLogInArray.push(o.data.username);
                    }
                    if (registerAndLogInArray.length == 0) {
                        createData("Developer", userNameValue, nameValue, surNameValue, emailValue, passValue);
                        devArray = readDataDeveloper();
                        user = o.data.username;
                        localStorage['user'] = user;
                        localStorage['status'] = arr[0];
                        window.location.href = "./cmr.html";
                        registerAndLogInArray.length = 0;
                    } else if (registerAndLogInArray.length > 0) {
                        swal("მოხდა შეცდომა!", "ასეთი ემაილით ან მომხმარებლის სახელით აქაუნთი უკვე არსებობს", "error");
                    }
                });

            } else if (arr.length == 0) {
                swal("მოხდა შეცდომა!", "გთხოვთ აირჩიეთ User ან Developer", "error");
            } else if (arr[0] === "User") {
                if (userArray.length == 0) {
                    createData("User", userNameValue, nameValue, surNameValue, emailValue, passValue);
                    userArray = readDataUser();
                    user = userNameValue;
                    localStorage['user'] = user;
                    localStorage['status'] = arr[0];
                    window.location.href = "./index.html";
                    indexUserName.innerText += localStorage['user'];
                    regAndLogInPlace.style.display = "none";
                    addHotelBtn.style.display = "block";
                    registerAndLogInArray.length = 0;
                }
                userArray.forEach(o => {
                    if (o.data.username == userNameValue || o.data.email == emailValue) {
                        registerAndLogInArray.push(o.data.username);
                    }
                    if (registerAndLogInArray.length == 0) {
                        createData("User", userNameValue, nameValue, surNameValue, emailValue, passValue);
                        userArray = readDataUser();
                        user = userNameValue;
                        localStorage['user'] = user;
                        localStorage['status'] = arr[0];
                        window.location.href = "./index.html";
                        indexUserName.innerText += localStorage['user'];
                        regAndLogInPlace.style.display = "none";
                        addHotelBtn.style.display = "block";
                        registerAndLogInArray.length = 0;
                    } else if (registerAndLogInArray.length > 0) {
                        swal("მოხდა შეცდომა!", "ასეთი ემაილით ან მომხმარებლის სახელით აქაუნთი უკვე არსებობს", "error");
                    }
                });
            }
        } else {
            swal("მოხდა შეცდომა!", "გთხოვთ შეავსოთ ყველა შესავსები ველი!", "error");
        }
    });
}

function logInPageLogic() {
    const userName = document.querySelector("#regUname");
    const email = document.querySelector("#regEmail");
    const pass = document.querySelector("#regPass");
    const regBtn = document.querySelector("#regBtn");
    const categoryBtn = document.querySelectorAll("#categoryBtn");
    var arr = new Array();

    categoryBtn.forEach(o => {
        o.addEventListener("click", function () {
            for (var i = 0; i < categoryBtn.length; i++) {
                if (categoryBtn[i].classList.contains("active")) {
                    categoryBtn[i].classList.remove("active");
                    var index = arr.indexOf(categoryBtn[i]);
                    arr.splice(index, 1);
                    o.classList.add("active");
                    arr.push(o.innerText);
                    break;
                } else if (!categoryBtn[i + 1].classList.contains("active")) {
                    o.classList.add("active");
                    arr.push(o.innerText);
                    break;
                } else if (categoryBtn[i + 1].classList.contains("active")) {
                    categoryBtn[i + 1].classList.remove("active");
                    var index = arr.indexOf(categoryBtn[i + 1]);
                    arr.splice(index, 1);
                    o.classList.add("active");
                    arr.push(o.innerText);
                    break;
                }
            }
        });
    });

    regBtn.addEventListener("click", function () {
        var userNameValue = userName.value;
        var emailValue = email.value;
        var passValue = pass.value;
        if (userNameValue.length > 0 && emailValue.length > 0 && passValue.length > 0) {
            if (arr[0] === "Developer") {
                devArray.forEach(o => {
                    if (o.data.username == userNameValue || o.data.email == emailValue) {
                        registerAndLogInArray.push(o);
                    }
                });
                if (registerAndLogInArray.length == 0) {
                    swal("მოხდა შეცდომა!", "ასეთი ემაილით ან მომხმარებლის სახელით არ არსებობს აქაუნთი", "error");
                } else if (registerAndLogInArray.length > 0) {
                    for (var i = 0; i < registerAndLogInArray.length; i++) {
                        if (registerAndLogInArray[i].data.username == userNameValue && registerAndLogInArray[i].data.email == emailValue && registerAndLogInArray[i].data.password == passValue) {
                            user = userNameValue;
                            localStorage['user'] = user;
                            localStorage['status'] = arr[0];
                            window.location.href = "./cmr.html";
                            registerAndLogInArray.length = 0;
                        }
                    }
                }
            } else if (arr.length == 0) {
                swal("მოხდა შეცდომა!", "გთხოვთ აირჩიეთ User ან Developer", "error");
            } else if (arr[0] === "User") {
                userArray.forEach(o => {
                    if (o.data.username == userNameValue || o.data.email == emailValue) {
                        registerAndLogInArray.push(o);
                    }

                });
                if (registerAndLogInArray.length == 0) {
                    swal("მოხდა შეცდომა!", "ასეთი ემაილით ან მომხმარებლის სახელით არ არსებობს აქაუნთი", "error");
                } else if (registerAndLogInArray.length > 0) {
                    for (var i = 0; i < registerAndLogInArray.length; i++) {
                        if (registerAndLogInArray[i].data.username == userNameValue && registerAndLogInArray[i].data.email == emailValue && registerAndLogInArray[i].data.password == passValue) {
                            user = userNameValue;
                            localStorage['user'] = user;
                            localStorage['status'] = arr[0];
                            window.location.href = "./index.html";
                            indexUserName.innerText += localStorage['user'];
                            regAndLogInPlace.style.display = "none";
                            addHotelBtn.style.display = "block";
                            registerAndLogInArray.length = 0;
                        }
                    }
                }
            }
        } else {
            swal("მოხდა შეცდომა!", "გთხოვთ შეავსოთ ყველა შესავსები ველი!", "error");
        }

    });
}

function cmrPageLogic() {
    tbody = document.querySelector("tbody");
    const title = document.querySelector(".table-title");
    const button = document.querySelector(".btn-primary");
    button.innerText = "დაამატეთ მომხმარებელი";
    title.innerText = "აკონტროლეთ მომხმარებლები";
    button.addEventListener("click", function () {
        window.location.href = "./add-user.html";
    })
    setTimeout(function () {
        userArray.forEach(o => {
            cmrTableFunction(o.id, o.data.username);
        });
        const updateButton = document.querySelectorAll(".btn-success");
        const deleteButton = document.querySelectorAll(".btn-danger");
        deleteButton.forEach(o => {
            o.addEventListener("click", function () {
                firebase.database().ref("User/" + o.id).remove();
            });
        });
        updateButton.forEach(o => {
            o.addEventListener("click", function () {
                localStorage['userUpdateId'] = o.id;
                window.location.href = "./edit-user.html";
            });
        });
    }, 3000);
}

// Insert In Html Functions
function insertInHotelArea(hotelimage, hotelname, region, bedquantity, price, ownername, stars, id) {
    var starsCount = `<h5 class="card-title">`
    for (var i = 0; i < Number(stars); i++) {
        starsCount += `<i class="fas fa-star" style="color: #ffc107; margin-right: 5px"></i>`
        if (Number(stars) - i == 1) {
            starsCount += `</h5>`
        }
    }

    var card = `<div class="card mb-5" id="${id}">
    <div class="row g-0">
      <div class="col-md-5">
        <img src="${hotelimage}" alt="...">
      </div>
      <div class="col-md-7">
        <div class="card-body">
          ${starsCount}
          <p class="card-text">სახელი: ${hotelname}</p>
          <p class="card-text">რეგიონი: ${region}</p>
          <p class="card-text">საწოლების რაოდენობა: ${bedquantity}</p>
          <p class="card-text">ფასი: ${price}</p>
          <p class="card-text"><small class="text-muted">მფლობელის სახელი: ${ownername}</small></p>
        </div>
      </div>
    </div>
  </div>`

    hotelArea.innerHTML += card;
    isDone = true;
}

function insertInCarousel(array, isActive) {
    var randNum = Math.floor(Math.random() * array.length)
    var carouselItem = `<div class="carousel-item ${isActive ? "active" : ""}">
    <img src="${array[randNum].data.coverimageURL}" class="d-block w-100" alt="...">
    <div class="carousel-caption d-none d-md-block">
        <h5>${array[randNum].data.hotelname}</h5>
        <p>${array[randNum].data.description.replace(array[randNum].data.description.slice(100), "...")}</p>
    </div>`


    carouselInner.innerHTML += carouselItem;
}

function insertInNews(object) {
    var newsCard = `<div class="card" style="width: 18rem;">
    <img src="${object.image.url}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${object.title}</h5> 
      <p class="card-text">${object.body.replace(object.body.slice(200), "...")}</p>
    </div>
  </div>`

    newsPlace.innerHTML += newsCard;
}

function cmrTableFunction(objectId, objectName) {
    var tr = `
          <tr>
            <th scope="row">${objectId}</th>
            <td>${objectName}</td>
            <td>
                <button class="btn btn-success" id="${objectId}">შეცვლა</button>
                <button class="btn btn-danger" id="${objectId}">წაშლა</button>
            </td>
          </tr>
        `

    tbody.innerHTML += tr;

}

function insertHotelRoom1(object, place) {
    var carouselItem = `<div class="carousel-item active">
    <img src="${object.roomimage1URL}" class="d-block w-100" alt="...">
  </div>`

    place.innerHTML += carouselItem;
}

function insertHotelRoom2(object, place) {
    var carouselItem = `<div class="carousel-item ">
    <img src="${object.roomimage2URL}" class="d-block w-100" alt="...">
  </div>`

    place.innerHTML += carouselItem;
}

function insertHotelRoom3(object, place) {
    var carouselItem = `<div class="carousel-item ">
    <img src="${object.roomimage3URL}" class="d-block w-100" alt="...">
  </div>`

    place.innerHTML += carouselItem;
}

function insertHotelRoom4(object, place) {
    var carouselItem = `<div class="carousel-item ">
    <img src="${object.roomimage4URL}" class="d-block w-100" alt="...">
  </div>`

    place.innerHTML += carouselItem;
}

// ------------------------------------------------------------------

function cmrUsersFunction() {
    const spinner = document.querySelector(".spinner");
    spinner.classList.add('d-flex');
    spinner.classList.remove('d-none');
    if (tbody.innerText.length > 0) {
        tbody.innerText = " ";
    }
    cmrPageLogic();
    setTimeout(() => {
        spinner.classList.remove('d-flex');
        spinner.classList.add('d-none');
    }, 3000)
}

function cmrHotelsFunction() {
    const spinner = document.querySelector(".spinner");
    spinner.classList.add('d-flex');
    spinner.classList.remove('d-none');

    if (tbody.innerText.length > 0) {
        tbody.innerText = " ";
    }
    const button = document.querySelector(".btn-primary");
    button.innerText = "დაამატეთ სასტუმრო";
    button.addEventListener("click", function () {
        window.location.href = "./add-hotel.html";
    });
    const title = document.querySelector(".table-title");
    title.innerText = "აკონტროლეთ სასტუმროები";
    setTimeout(function () {
        hotelArray.forEach(o => {
            cmrTableFunction(o.id, o.data.hotelname);
        });
        spinner.classList.remove('d-flex');
        spinner.classList.add('d-none');
        const updateButton = document.querySelectorAll(".btn-success");
        const deleteButton = document.querySelectorAll(".btn-danger");
        deleteButton.forEach(o => {
            o.addEventListener("click", function () {
                firebase.database().ref("Hotel/" + o.id).remove();
            });
        });
        updateButton.forEach(o => {
            o.addEventListener("click", function () {
                localStorage['hotelId'] = o.id;
                window.location.href = "./edit-hotel.html";
            });
        });

    }, 3000);
}

function signOut() {
    localStorage.clear();
    window.location.reload();
}


function goToUserEditPage() {
    window.location.href = "./edit-user.html"
}

function goToHotelPage() {
    console.log(this.id);
}