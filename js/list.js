
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


firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        alert("Please login to continue.")
        window.location.href = 'index.html';
        console.log('no authentication')
    } else {
        console.log('logged in');
    }
});

$('#search').on('click', function () {
    let name = $('#name').val();
    let company = $('#company').val();
    let batch = $('#batch').val();

    var aluminiRef = db.collection("alumini");
    var query = aluminiRef;
    // TODO: add the autofill list and then we can use the query.
    // if (name != "")
    //     query = query.where("name", "==", name);
    // if (company != "")
    //     query = query.where("company", "==", company);
    if (batch != "")
        query = query.where("batch", "==", batch);

    query = query.orderBy("name");

    var list = [];
    var c = 0;
    query.get()
        .then(function (querySnapshot) {
            console.log('kittippoi');
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                if (doc.data().name && doc.data().company) {
                    console.log(doc.data().company, company);
                    if (doc.data().name.toLowerCase().includes(name.toLowerCase()) && doc.data().company.toLowerCase().includes(company.toLowerCase())) {

                        list.push({
                            name: doc.data().name,
                            company: doc.data().company,
                            photo: doc.data().photo
                        })
                        console.log(doc.data().photo);
                        storageRef.child(`images/` + doc.data().photo).getDownloadURL().then(function (url) {
                            document.getElementById("loader").style.visibility = "hidden";
                            var test = url;
                            id = "#" + doc.data().photo.split('.')[0];
                            $(id).attr("src", test);
                            // document.getElementById("doc.data().photo").src = url;
                            console.log('id===>' + id)
                            console.log('url===>' + test)

                        }).catch(function (error) {

                        });
                    }

                }
            });

            //  
            console.log(list);

            container = $("#results")

            row = $("#row_1")
            row.empty();

            list.forEach(person => {
                img_id = person.photo.split('.')[0]
                htmlString = ` <div class="col-md-3">
            <div class="person">
                <div class="im-container"><img class="pic" src="images/logo.jpg" id="` + img_id + `"></div>
                <div class="name"><strong>` + person.name + `</strong></div>
                <div class="name">` + person.company + `</div>
            </div>
        </div> `
                row.append(htmlString)
            });

            // $("#placeholder").remove();


        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
})