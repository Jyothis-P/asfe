
var firebaseConfig = {
    apiKey: "AIzaSyC2HejOZEs_nGRsIdwYhq2miXOrtkEaR3k",
    authDomain: "asfe-a1906.firebaseapp.com",
    databaseURL: "https://asfe-a1906.firebaseio.com",
    projectId: "asfe-a1906",
    storageBucket: "asfe-a1906.appspot.com",
    messagingSenderId: "36343720523",
    appId: "1:36343720523:web:a897faadd8762a260dbbce"
};
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var storage = firebase.storage();
var storageRef = storage.ref();

$('.file-select').on('change', handleFileUploadChange);
$('.file-submit').on('click', handleFileUploadSubmit);

let selectedFile;
function handleFileUploadChange(e) {
    selectedFile = e.target.files[0];
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var photoPath = makeid(15);
var picUploaded = false;

function handleFileUploadSubmit(e) {
    document.getElementById("loader").style.visibility = "visible";
    let extension = '.' + selectedFile.name.split('.')[1]
    photoPath += extension;
    console.log(photoPath);
    const uploadTask = storageRef.child(`images/` + photoPath).put(selectedFile); //create a child directory called images, and place the file inside this directory
    uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
    }, (error) => {
        // Handle unsuccessful uploads
        document.getElementById("loader").style.visibility = "hidden";
        alert('Error uploading file.')
        console.log(error);
    }, () => {
        // Do something once upload is complete
        console.log('success');
        picUploaded = true;
        storageRef.child(`images/` + photoPath).getDownloadURL().then(function (url) {
            document.getElementById("loader").style.visibility = "hidden";
            var test = url;
            document.querySelector('img').src = test;

        }).catch(function (error) {

        });
    });
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$('#submit').on('click', function () {
    document.getElementById("submit-loader").style.visibility = "visible";
    let name = $('#name').val();
    let phone = $('#phone').val();
    let email = $('#email').val();
    let batch = $('#batch').val();
    let course = $('#course').val();
    let company = $('#company').val();
    let location = $('#location').val();
    let desig = $('#desig').val();
    let higher = $('#higher').val();
    let achievments = $('#achievments').val();
    let address = $('#address').val();

    let error = false;

    if (name == "" || phone == "" || email == "" || batch == "" || course == "" || company == "" || location == "" || desig == "" || address == "") {
        error = true;
        alert('Fill all the required fields.')
    }

    if (!validateEmail(email)) {
        error = true;
        alert('Invalid Email');
    }

    if (!picUploaded) {
        error = true;
        alert('Please upload a picture.')
    }

    if (error) {
        document.getElementById("submit-loader").style.visibility = "hidden";
        return;
    }

    db.collection("alumini").add({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        batch: batch.trim(),
        course: course.trim(),
        company: company.trim(),
        location: location.trim(),
        desig: desig.trim(),
        higher: higher.trim(),
        achievments: achievments.trim(),
        address: address.trim(),
        photo: photoPath
    })
        .then(function (docRef) {
            document.getElementById("submit-loader").style.visibility = "hidden";
            console.log("Document written with ID: ", docRef.id);
            window.location.href = 'list.html';
        })
        .catch(function (error) {
            document.getElementById("submit-loader").style.visibility = "hidden";
            console.error("Error adding document: ", error);
            alert("Error submitting data");
        });

});


(function ($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });

        var myCalendar = $('.js-datepicker');
        var isClick = 0;

        $(window).on('click', function () {
            isClick = 0;
        });

        $(myCalendar).on('apply.daterangepicker', function (ev, picker) {
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));

        });

        $('.js-btn-calendar').on('click', function (e) {
            e.stopPropagation();

            if (isClick === 1) isClick = 0;
            else if (isClick === 0) isClick = 1;

            if (isClick === 1) {
                myCalendar.focus();
            }
        });

        $(myCalendar).on('click', function (e) {
            e.stopPropagation();
            isClick = 1;
        });

        $('.daterangepicker').on('click', function (e) {
            e.stopPropagation();
        });


    } catch (er) { console.log(er); }
    /*[ Select 2 Config ]
        ===========================================================*/

    try {
        var selectSimple = $('.js-select-simple');

        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });

    } catch (err) {
        console.log(err);
    }


})(jQuery);