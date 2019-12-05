
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
                console.log(doc.id, " => ", doc.data());
                if (doc.data().name && doc.data().company) {
                    console.log(doc.data().name);
                    console.log(c++);
                    if (doc.data().name.toLowerCase().includes(name.toLowerCase()) && doc.data().company.includes(company))
                        list.push({
                            name: doc.data().name,
                            company: doc.data().company,
                            photo: doc.data().photo
                        })
                }
            });
            console.log(list);
            
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
})