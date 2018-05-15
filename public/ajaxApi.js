import { ENGINE_METHOD_CIPHERS } from "constants";

class daysApi{
    constructor () {
    }
    fetch(){
        return $.ajax({
            method: "GET",
            url: "/days"
        }).catch(function(data){
            console.log(data)
        })
    }

    uploadPhoto(form){

        return $(form).ajaxSubmit({
            data: {title: form.title},
            contentType: 'application/json',
            
            success: function(response){
              console.log('image uploaded and form submitted');     
            },
            error:function(res, err){
                console.error(err);
            }
        });
          return false;
    }

    }

class wordApi{
    constructor(){

    }
    fetch(){
        return $.ajax({
            method: "GET",
            url: "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
        }).catch(function(data){
            console.log(data)
        })
    }
}


    




