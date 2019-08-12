$(document).ready(function () {

    var ctx = document.getElementById('myChart');
    var ctx1 = document.getElementById('myChart1');


    $("#analyzeText").click(function () {
        $("#graphWords").empty();
        var lyricsText = $("#userText").val();
        console.log(lyricsText);
        var queryURL = "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/";
        if (lyricsText == "") {
            $("#myModal1").css("display", "block");
        } else {

        $.ajax({
            url: queryURL,
            //dataType: "json",
            headers: {
                "x-rapidapi-host": "twinword-emotion-analysis-v1.p.rapidapi.com",
                "x-rapidapi-key": "019d9911ccmsh87bdd63e27af5c7p1fb859jsn4a1152c06ebe"
            },
            data: {
                "text": lyricsText
            },

            method: "GET"


        }).then(function (response) {
            console.log($("#lyricsDisplay").val());
            console.log(response);
            console.log(response.emotion_scores);
            var anger = (parseFloat((JSON.stringify(response.emotion_scores.anger))).toFixed(2)) * 100;
            var joy = (parseFloat((JSON.stringify(response.emotion_scores.joy))).toFixed(2)) * 100;
            var fear = (parseFloat((JSON.stringify(response.emotion_scores.fear))).toFixed(2)) * 100;
            var surprise = (parseFloat((JSON.stringify(response.emotion_scores.surprise))).toFixed(2)) * 100;
            var disgust = (parseFloat((JSON.stringify(response.emotion_scores.disgust))).toFixed(2)) * 100;
            var sadness = (parseFloat((JSON.stringify(response.emotion_scores.sadness))).toFixed(2)) * 100;
            var data = [anger, joy, fear, surprise, disgust, sadness];
            console.log(anger);


            //CHART
            var myChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['Anger', 'Joy', 'Fear', 'Surprise', 'Disgust', 'Sadness'],
                    datasets: [{
                        label: '% of emotion',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 3,
                        pointBackgroundColor: "red"
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });



            $("#userLyricsAnalysis").html("Anger level: " + anger + "%" + "</br></br>")
            $("#userLyricsAnalysis").append("Joy level: " + joy + "%" + "</br></br>")
            $("#userLyricsAnalysis").append("Fear level: " + fear + "%" + "</br></br>")
            $("#userLyricsAnalysis").append("Surprise level: " + surprise + "%" + "</br> </br>")
            $("#userLyricsAnalysis").append("Disgust level: " + disgust + "%" + "</br></br>")
            $("#userLyricsAnalysis").append("Sadness level: " + sadness + "%" + "</br></br>")

        });
    }
    });





    $("#submit").click(function () {
        var track = $("#track").val().trim();
        var artist = $("#artist").val().trim();
        console.log(track);
        $("#trackInfo").empty();
        $("#emotionsScore").empty();

        if (track == "") {
            $("#myModal1").css("display", "block");
        } else {
            var queryURL = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=" + track + "&q_artist=" + artist + "&page_size=1&page=1&s_track_rating=desc&apikey=4361e89398d1b525228c0f37e4566dc1";


            $.ajax({
                url: queryURL,
                dataType: "json",
                method: "GET"

            }).then(function (response) {
                console.log(response);
                //$("#trackInfo").prepend(trackName);
                if (response.message.body.track_list.length == 0) {
                    $("#myModal2").css("display", "block");
                } else {
                    var trackID = response.message.body.track_list[0].track.track_id;
                    console.log(trackID);



                    var queryURL2 = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + trackID + "&apikey=4361e89398d1b525228c0f37e4566dc1"

                    $.ajax({
                        url: queryURL2,
                        dataType: "json",
                        method: "GET"

                    }).then(function (response) {

                        console.log(response);
                        var lyrics = response.message.body.lyrics.lyrics_body;

                        //lyrics = JSON.stringify(lyrics);

                        //lyrics.replace(/(?:\r\n|\r|\n)/g, '<br />')

                        $("#lyricsDisplay").html(lyrics);
                    });
                }
            });
        }
    });



    $("#analyze").click(function () {
        $("#graphWords2").empty();
        var lyricsText = $("#lyricsDisplay").text();
        console.log(lyricsText);
        var queryURL = "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/";
        if (lyricsText == "") {
            $("#myModal1").css("display", "block");
        } else {

        $.ajax({
            url: queryURL,
            //dataType: "json",
            headers: {
                "x-rapidapi-host": "twinword-emotion-analysis-v1.p.rapidapi.com",
                "x-rapidapi-key": "019d9911ccmsh87bdd63e27af5c7p1fb859jsn4a1152c06ebe"
            },
            data: {
                "text": lyricsText
            },

            method: "GET"


        }).then(function (response) {
            console.log($("#lyricsDisplay").val());
            console.log(response);
            console.log(response.emotion_scores);
            var anger = (parseFloat((JSON.stringify(response.emotion_scores.anger))).toFixed(2)) * 100;
            var joy = (parseFloat((JSON.stringify(response.emotion_scores.joy))).toFixed(2)) * 100;
            var fear = (parseFloat((JSON.stringify(response.emotion_scores.fear))).toFixed(2)) * 100;
            var surprise = (parseFloat((JSON.stringify(response.emotion_scores.surprise))).toFixed(2)) * 100;
            var disgust = (parseFloat((JSON.stringify(response.emotion_scores.disgust))).toFixed(2)) * 100;
            var sadness = (parseFloat((JSON.stringify(response.emotion_scores.sadness))).toFixed(2)) * 100;
            var data = [anger, joy, fear, surprise, disgust, sadness];

            //CHART
            var myChart1 = new Chart(ctx1, {
                type: 'radar',
                data: {
                    labels: ['Anger', 'Joy', 'Fear', 'Surprise', 'Disgust', 'Sadness'],
                    datasets: [{
                        label: '% of emotion',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 3,
                        pointBackgroundColor: "red"
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });


            $("#emotionsScore").html("Anger level: " + Math.floor(anger) + "%" + "</br></br>")
            $("#emotionsScore").append("Joy level: " + Math.floor(joy) + "%" + "</br></br>")
            $("#emotionsScore").append("Fear level: " + Math.floor(fear) + "%" + "</br></br>")
            $("#emotionsScore").append("Surprise level: " + Math.floor(surprise) + "%" + "</br> </br>")
            $("#emotionsScore").append("Disgust level: " + Math.floor(disgust) + "%" + "</br></br>")
            $("#emotionsScore").append("Sadness level: " + Math.floor(sadness) + "%" + "</br></br>")





        });


    }
    });


    function rhymingWordsFinder() {
        var inputtedWord = $("#wordInput").val();
        console.log(inputtedWord)
        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?rel_rhy=" + inputtedWord;
        //$("#wordInput").val("");
        if (inputtedWord == "") {
            $("#myModal1").css("display", "block");
        } else {

            $.ajax({
                url: queryURL,
                method: "GET",
                


            }).then(function (response) {

                if (response.length == 0) {
                        $("#myModal2").css("display", "block");
                    } else {
                

                for (let i = 0; i < 10; i++) {
                    //console.log(response[i].word);
                    $("#rhymingWords").append(response[i].word + " <br>")
                }
            }
            });
        }
    }

    function synonymFinder() {
        var inputtedWord = $("#wordInput").val();
        console.log(inputtedWord)
        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?ml=" + inputtedWord;
        //$("#wordInput").val("");
        if (inputtedWord == "") {
            $("#myModal1").css("display", "block");
        } else {
        $.ajax({
            url: queryURL,
            method: "GET",


        }).then(function (response) {

            if (response.length == 0) {
                $("#myModal2").css("display", "block");
            } else {

            for (let i = 0; i < 10; i++) {
                //console.log(response[i].word);
                $("#synonyms").append(response[i].word + " <br>")
            }
        }
        });
    }
    }

    function adjectivesFinder() {
        var inputtedWord = $("#wordInput").val();
        console.log(inputtedWord)
        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?rel_jjb=" + inputtedWord;
        //$("#wordInput").val("");
        if (inputtedWord == "") {
            $("#myModal1").css("display", "block");
        } else {
        $.ajax({
            url: queryURL,
            method: "GET",


        }).then(function (response) {

            if (response.length == 0) {
                $("#myModal2").css("display", "block");
            } else {

            for (let i = 0; i < 10; i++) {
                //console.log(response[i].word);
                $("#adjectives").append(response[i].word + " <br>")
            }
        }
        });
    }
    }





    $("#synonymsButton").click(function () {
        $("#synonyms").empty();
        synonymFinder();
    });

    $("#rhymingButton").click(function () {

        rhymingWordsFinder()
        $("#rhymingWords").empty();
    });

    $("#adjectivesButton").click(function () {
        $("#adjectives").empty();
        adjectivesFinder();
    });



    //Logic for modal
    var modal = $(".modal");
    var span = document.getElementsByClassName("close");
    // When the user clicks on <span> (x), close the modal
    span[0].onclick = function () {
        $(".modal").css("display", "none");
    };
    span[1].onclick = function () {
        $(".modal").css("display", "none");
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal[0]) {
            $(".modal").css("display", "none");
        } else if (event.target == modal[1]) {
            $(".modal").css("display", "none");
        }
    };


});
